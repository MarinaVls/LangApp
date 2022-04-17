import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './AppGames.module.css'
import styles from './../../../App.module.css'

const WriteIt = ({playWords, wordIndex, setWordIndex, progressBarWidth, correctWords, setCorrectWords, errorWords, setErrorWords, points, speak}) => {

    const input = useRef();
    const[randomWords, setRandomWords ] = useState(playWords.sort(() => Math.random() - 0.5))
    
    const checkWord = (event) => {
        event.preventDefault()
        if(input.current.value === randomWords[wordIndex].translate) {
            speak(randomWords[wordIndex].translate)
            setCorrectWords(correctWords + 1)
            if(wordIndex !== playWords.length -1 ){
                setWordIndex(wordIndex + 1)
            }else {
                alert('Game is over')
            }
            input.current.value =''
        }else {
            setErrorWords(errorWords + 1)
        }
    }

    return (
        <>
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={progressBarWidth}></div>
        </div> 
        <nav className={styles.gameNav}>
            <Link to={'/games' } className={styles.btnBack}/>
            <ul className={styles.results}>
                <li>Errors: {errorWords}</li>
                <li>Correct: {correctWords}</li>
                <li>Points: {points}</li>
            </ul>
        </nav>
        <section>
            <span>write a translation for this word</span>
            <h3>{randomWords[wordIndex].word}</h3>
           <form className={classes.writeWordBlock} onSubmit={checkWord}>
                <input ref={input} type="text" />

                <button className={classes.btnOk}>OK</button>
            </form>
        </section>
        </>
        
    )
}

export default WriteIt