import React from 'react'
import spin from '../spin.gif'

export default function Spinner() {
  return (
    <div className='text-center'>
        <img src={spin} alt="spin" />
      </div>
  )
}

