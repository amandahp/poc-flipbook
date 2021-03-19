import React from 'react'


const Button = (props) => {
  const {onClick, className} = props


  return(
    <button className={className} type="button" onClick={onClick}>
    {props.children}
   </button>
  )
}

export default Button




