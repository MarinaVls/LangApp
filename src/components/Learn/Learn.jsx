import React, {useEffect, useRef} from 'react';
import classes from './Learn.module.css';
import styles from './../../App.module.css'

const Learn = ({library, wordIndex, setWordIndex, progressBarWidth, speak}) => {

    useEffect(() => {
        speak(library[wordIndex].translate)
    }, [wordIndex])
    
    return (
        <>
             <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={progressBarWidth}></div>
            </div>
            <section style={{ textAlign: 'center' }}>
                <span>{library[wordIndex].word}</span>
                <h3>{library[wordIndex].translate}</h3>
            </section> 
            <div className={styles.btnNext} onClick={()=> {
                if(wordIndex === library.length - 1){
                    setWordIndex(0)
                }else {
                     setWordIndex(wordIndex + 1)
                }
            }}></div>
        </>
    )
}

export default Learn