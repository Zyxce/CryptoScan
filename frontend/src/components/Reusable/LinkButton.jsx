import React from 'react'
import { Link } from 'react-router-dom'
import styleModule from './reusableComponents.module.css'

const LinkButton = ({ to, children, className }) => {
  return (
    <Link to={to} className={`${styleModule.LinkButton} ${className}`}>
      {children}
    </Link>
  )
}
export default LinkButton
