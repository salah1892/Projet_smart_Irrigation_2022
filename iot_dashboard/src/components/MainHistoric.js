import React, { useState, useEffect } from "react"




export default function Main2() {

    const [color, setColor] = useState("blue")
    const onChangeColor = () => {

        //setColor(prev => prev = "red" ? "green" : (prev = "green" ? "red" : "red"))
        setColor(prev => prev = "blue" ? "yellow" : "blue" )
            
    }
   
    return (

        <div className="main--principal" >

            <h1 className="section1" onClick={() => onChangeColor()} style={{ backgroundColor: color }}>
                section 1
                <p>{color}</p>
            </h1>
            <h1 className="section2">
                section 2
            </h1>
        </div>
    )
}