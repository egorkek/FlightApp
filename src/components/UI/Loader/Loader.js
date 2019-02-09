import React from 'react'
import classes from './Loader.css'

const Loader = (props)=>{

return(
    <div className={classes["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

)

}
export default Loader