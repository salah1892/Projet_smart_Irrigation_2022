import React, { useState, useEffect } from "react";
import axios from 'axios'
import { nanoid } from 'nanoid'
export default function GetAll() {

    //const [backEndData, setBackEndData] = useState([{}]);
    const [dataBackEnd, setDataBackEnd] = useState([]);
    useEffect(() => {
        try {
            axios.get("http://localhost:5000/getAll").then(function (response) {
                //console.log(JSON.stringify(response.data))
                setDataBackEnd(response.data)
                //console.log(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }, [])
    //console.log(dataBackEnd)
    return (
        <div className="dataFromDB">
            {dataBackEnd.map((data,index) => (
                
                <div key={nanoid()}>
                    <h5 key={nanoid()}>{data._id}</h5>
                    <h6 >Temperature : {(data.sensors.temperature!=null ? data.sensors.temperature: "No Value" )}</h6>
                    <h6 >humidity : { (data.sensors.humidity)!=null ? data.sensors.humidity: "No Value" }</h6>
                    <h6 >moisture : {(data.sensors.moisture)!=null ? data.sensors.moisture: "No Value"}</h6>
                    <h6 >light : {(data.sensors.light)!=null ? data.sensors.light: "No Value"}</h6>
                    <h6 >Heure : {(data.sensors.Heure)!=null ? data.sensors.Heure: "No Value"}</h6>
                    <h6 >Date : {(data.sensors.date)!=null ? data.sensors.date: "No Value"}</h6>
                </div>
            ))}
        </div>
    );
}

