import React,{useEffect, useState}  from 'react';
import { PDFJS } from 'pdfjs-dist/webpack';
import convertPdfToImages from './Readfile';
import HTMLFlipBook from "react-pageflip";
import {base64str} from './base64'



const App = () => {

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



    return (
        
        <div className="App">
            {images && (
            <HTMLFlipBook              
                width={550}
                height={733}
                size="stretch"
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                className="demo-book"
            >
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

