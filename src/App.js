import React,{useEffect, useState}  from 'react';
import { PDFJS } from 'pdfjs-dist/webpack';
import convertPdfToImages from './Readfile';
import HTMLFlipBook from "react-pageflip";
import {base64str} from './base64'



const App = () => {
    const [ready, setReady] = useState(false);
    const [images, setImages] = useState('')
    // decode base64 string, remove space for IE compatibility
    var binary = atob(base64str.replace(/\s/g, ''));
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }

    // create the blob object with content-type "application/pdf"               
    var blob = new Blob( [view], { type: "application/pdf" });
    console.log(blob)
    var url = URL.createObjectURL(blob);

    
    const convertPdf = async() => {
        const arrayImages = await convertPdfToImages(blob)
        setImages(arrayImages)
    }
    console.log(typeof blob)
   blob && convertPdf(blob)

    useEffect(() => {
        setTimeout(() => {
          setReady(true);
        }, 5);
      }, []);


    return (
        
        <div className="App">
            {images && (
            <HTMLFlipBook width={300} height={500}>
                {images.map(image => {
                    return (
                        <div><img src={image} /></div>
                    )
                })}
            </HTMLFlipBook>
            )}
      </div>
    )
}

export default App;
