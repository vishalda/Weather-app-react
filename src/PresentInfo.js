import React from 'react'
import "./css/owfont-regular.css"
import "./css/PresentInfo.css"
import TempIcon from './Picture/TempIcon.png'
var moment = require('moment')

const PresentInfo = ({reading}) =>{
    let newDate=new Date();
    const weekday = reading.dt *1000;
    newDate.setTime(weekday);

    const imgURL =`owf owf-${reading.weather[0].id} owf-5x`
    return(
        <div className="PresentInfo-div">
            <h1 className="Temp">{Math.round(reading.main.temp)} °C </h1>
            <img src={TempIcon} id="WeatherIcon"/>
            <h3 className="Date">{moment(newDate).format("dddd")}</h3>
        </div>
    );
}

export default PresentInfo;