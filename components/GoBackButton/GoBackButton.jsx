import React from 'react'
import './GoBackButton.css'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
    const navigate = useNavigate()
    
  return (
    <button className="go-back" onClick={() => navigate(-1)}><IoArrowBack /></button>
  )
}

export default GoBackButton