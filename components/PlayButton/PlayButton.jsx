import React from 'react'
import './PlayButton.css'
import { FaPlay, FaPause } from 'react-icons/fa';
import { FaShuffle } from "react-icons/fa6";


const PlayButton = ({className, onClick, style}) => {
  return (
    <button id="play-btn" className={className} onClick={onClick} style={style}><FaPlay /></button>
  )
}

const PauseButton = ({className, onClick, style}) => {
  return (
    <button id="pause-btn" className={className} onClick={onClick} style={style}><FaPause /></button>
  )
}

const ShuffleButton = ({className, onClick, style}) => {
  return (
    <button id="shuffle-btn" className={className} onClick={onClick} style={style}><FaShuffle /></button>
  )
}

export { PlayButton, PauseButton, ShuffleButton }