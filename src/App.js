import React, {Fragment, useState} from 'react';
import FlipBook from './flipbook';
import { PDFJS } from 'pdfjs-dist/webpack';
import convertPdfToImages from './utils/Readfile';
import {base64str} from './base64';
import './App.css'


const App = () => {
    const [images, setImages] = useState('')
    // decode base64 string, remove space for IE compatibility
    const binary = atob(base64str.replace(/\s/g, ''));
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }
    const convertPdf = async() => {
        const arrayImages = await convertPdfToImages(blob)
        setImages(arrayImages)
    }

    // create the blob object with content-type "application/pdf"               
    const blob = new Blob( [view], { type: "application/pdf" });
    blob && convertPdf(blob)
    const url = URL.createObjectURL(blob);
    

    

    return(
        <Fragment>
            {images && (
                <FlipBook
                    images={images}
                />
            )}
        </Fragment>
    )
    
}

export default App;

