import React, { useEffect, useMemo, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './AppGames.module.css'
import styles from './../../../App.module.css'
import Store from './../../../context';

const CheckIt = ({wordIndex, setWordIndex, progressBarWidth, points, speak}) => {

    const data = useContext(Store)

    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5), [])
    const[currentWords, setCurrentWords] = useState(['random', 'correct', 'random2'], [])
    
    useEffect (() => {
        setCurrentWords([
            randomWords[wordIndex].word,
            randomWords[(wordIndex + 1)%randomWords.length].word,
            randomWords[(wordIndex + 2)%randomWords.length].word,
        ].sort(() => Math.random() - 0.5))
    }, [data.correctWords])
    const checkWord = (word) => {
        if(word === randomWords[wordIndex].word) {
            speak(randomWords[wordIndex].translate)
            data.setCorrectWords(data.correctWords + 1)
            if(wordIndex !== data.playWords.length -1 ){
                setWordIndex(wordIndex + 1)
            }else {
                alert('Game is over')
            }
        }else {
            data.setErrorWords(data.errorWords + 1)
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
                <li>Errors: {data.errorWords}</li>
                <li>Correct: {data.correctWords}</li>
                <li>Points: {points}</li>
            </ul>
        </nav>
        <section>
            <span>write a translation for this word</span>
            <h3>{randomWords[wordIndex].translate}</h3>
            <ul className={classes.btnContainer}>
                {currentWords.map( (word, index) => {
                    return <li className={classes.btnCheck} key={index} onClick={() => checkWord(word) }>{word}</li>
                })}
            </ul>
        </section>
        </>
        
    )
}

export default CheckIt