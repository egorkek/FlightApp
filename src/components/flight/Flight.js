import React from 'react'
import classes from './Flight.css'

const Flight = (props)=>{

return(
    <div className={`${classes.Flight} ${props.delayed ? classes.Delayed : null}`}>
        <p>{props.time} {props.delayed ? 'Delayed' : null }</p>
        <h1>{props.city}</h1>
        <p>{props.terminal}</p>
        <p>{props.flightNumber}</p>
    </div>

)

}
export default Flight