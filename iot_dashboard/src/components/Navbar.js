import React, { useState, useEffect } from "react"
import photo from "../image/cloud.png"
//import DatePicker from 'react-datetime-picker';




export default function Navbar() {

    const [date, setDate] = useState(new Date());

    function refreshClock() {
        setDate(new Date());
    }

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);
    
    return (
        <nav className="nav--one">
            <img src={photo} alt="" className="nav--logo" />
            <h1 className="nav--title">Smart Farm Irrigation System</h1>
            <p className="nav--time">{date.toLocaleDateString()}  {date.toLocaleTimeString()}</p>


        </nav>
    )
}