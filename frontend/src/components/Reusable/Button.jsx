import React from 'react'
import styleModule from './reusableComponents.module.css'

const Button = ({ onClick, children, className, type, style }) => {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className={`${styleModule.Button} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
