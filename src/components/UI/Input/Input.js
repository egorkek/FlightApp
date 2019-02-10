import React from 'react'
import classes from './Input.css'

const Input = (props)=>{

return(
    <input className={classes.Input} type={props.type ? props.type : 'text'} value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>

)

}
export default Input