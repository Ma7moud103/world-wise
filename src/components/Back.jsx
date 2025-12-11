import React from 'react'
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Back = () => {
    const navigate = useNavigate();
  return (
      <Button onClick={(e) => {
          e.preventDefault();
          navigate(-1)
      }} type={"back"}>&larr; Back</Button> 
  )
}

export default Back