import logo from './logo.svg';
import './App.css';
import './App.module.css';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Library from './components/Library/Library';
import Learn from './components/Learn/Learn';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Games from './components/Games/Games';
import WriteIt from './components/Games/AppGames/WriteIt';
import CheckIt from './components/Games/AppGames/CheckIt';
import Store from './context';
import games from './components/Games/index'


function App() {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || []);
  const [wordIndex, setWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [errorWords, setErrorWords] = useState(0);
  const [cookie, setCookie] = useCookies(['points'])
  const [points, setPoints] = useState(+cookie.points || 0);

  useEffect(()=> {
    if(correctWords) {
      setPoints(points + 1)
      setCookie('points', points + 1 )
    }
  } ,[correctWords])
  
  const [playWords, setPlayWords] = useState(library.slice(-10))
  
  const progressBarWidth =  {
    width: `${(100 / library.slice(-10).length) * (wordIndex+1) }vw`
  }

  const speak = (word) => {
    const speakInstanse = new SpeechSynthesisUtterance(word)
    speakInstanse.voice = speechSynthesis.getVoices()[5]
    speechSynthesis.speak(speakInstanse);
}

  return (
    <BrowserRouter>
    <Store.Provider value={{playWords, correctWords, setCorrectWords, errorWords, setErrorWords }}>
        <Header/>
        <Routes>
          <Route path='/dashboard' element={<Dashboard  points = {points}/>} />
          <Route path='/library' element={<Library library={library} setLibrary={setLibrary}/>} />
          <Route path='/games' element={<Games />} />
          <Route path='/games/game/write-it' element={<WriteIt playWords={playWords} 
          wordIndex = {wordIndex} setWordIndex={setWordIndex}
          correctWords = {correctWords} setCorrectWords = {setCorrectWords}
          errorWords = {errorWords} setErrorWords = {setErrorWords}
          points = {points} speak = {speak}
          progressBarWidth={progressBarWidth} />} />
          <Route path='/games/game/check-it' element={<CheckIt  
          wordIndex = {wordIndex} setWordIndex={setWordIndex}
          points = {points} speak = {speak}
          progressBarWidth = {progressBarWidth} />} />
          <Route path='/learn' element={<Learn speak = {speak} library={library} wordIndex = {wordIndex} setWordIndex={setWordIndex} progressBarWidth={progressBarWidth}/>}/>
        </Routes>
      </Store.Provider>
    </BrowserRouter>
  );
} 

export default App;
