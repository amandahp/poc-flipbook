import React,{useState, useRef}  from 'react';
import { PDFJS } from 'pdfjs-dist/webpack';
import HTMLFlipBook from "react-pageflip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import Button from '../components/button/button'
import '../App.css';
import './index.styles.css'




const FlipBook = ({images}) => {
    const iconArrowLeft = <FontAwesomeIcon icon={faArrowLeft} className='icon-left' />
    const iconArrowRight = <FontAwesomeIcon icon={faArrowRight} className='icon' />

    const [page, setPage] = useState(0);
    const flipBook = useRef();
   

    const prevButtonClick = () => {
        console.log(flipBook)
        flipBook.current.pageFlip.flipPrev();
    }

    const nextButtonClick = () => {
        flipBook.current.pageFlip.flipNext();
    }

    //const pageNow = () => {
      //  return flipBook.current.pageFlip.getCurrentPageIndex();
    //}
    const onPage = (e) => {
        console.log('e',e)
        setPage(e.data)
    }


    
    return (
        <div className="App">
            <div class="grid-container">
                <div class="number-page">
                    <div className="pages-number">
                        <span>{page}</span>&nbsp;/
                        <span>{images.length - 1}</span>
                    </div>
                </div>
                <div class="arrow-2">
                    <Button className="button" type="button" onClick={prevButtonClick}>
                        {iconArrowLeft}
                    </Button>
                </div>
                <div class="flipbook">
                    <div className="div-book">
                        <HTMLFlipBook 
                            onFlip={onPage}            
                            width={650}
                            height={520}
                            size="stretch"
                            maxShadowOpacity={0.7}
                            showCover={true}
                            mobileScrollSupport={true}
                            className="demo-book"
                            autoSize={true}
                            ref={flipBook}
                        >
                            {images.map((image, index) => {
                                return (
                                    <div number={index} className="image-div" key={index+1}><img className="image" src={image} /></div>
                                )
                            })}
                        </HTMLFlipBook>
                    </div>
                </div>
                <div class="arrow">
                    <Button className="button" onClick={nextButtonClick}>
                      {iconArrowRight}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FlipBook;


