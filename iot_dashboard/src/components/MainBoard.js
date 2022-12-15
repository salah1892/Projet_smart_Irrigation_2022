import React, { useState } from "react"
import Humidity from "./BoardItem/Humidity"
import Temperature from "./BoardItem/Temperature"


export default function MainBoard() {

    // const [color, setColor] = useState("#AF7AC5")
    // const onChangeColor = () => {

    //     //setColor(prev => prev = "red" ? "green" : (prev = "green" ? "red" : "red"))
    //     setColor(prev => prev = "#AF7AC5" ? "#A3E4D7" : "#AF7AC5")

    // }
    // useEffect(()=>{
    //     onChangeColor()

    // },[color])

    //------------------------------------------------------------------//
    return (

        // <div className="main--principal" >

        //     <h1 className="section1" onClick={() => onChangeColor()} style={{ backgroundColor: color }}>
        //         section 1
        //         <p>{color}</p>
        //         <Humidity/>
        //     </h1>
        //     <h1 className="section2" style={{ backgroundColor: '#9C640C' }}>
        //         section 2
        //         <Temperature/>
        //     </h1>
        // </div>
        <div className="board--main" >
            <section className="humidity--main"><Humidity /></section>
            <section className="temperature--main"><Temperature /></section>
        </div>
    )
}