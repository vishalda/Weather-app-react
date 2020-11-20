import React from 'react'
import "./css/DayCard.css";
import "./css/owfont-regular.css"
import oops from "./Picture/oops.png"
var moment=require('moment');



const DayCard=({reading}) => {
    if (reading=='error'){
        return(
            <div>
                <img src={oops} alt="" className="oopsIcon"/>
                <h1 className="ErrorBlock">Please enter a valid city name</h1>
            </div>
        )
    }
    let newDate=new Date();
    const weekday = reading.dt *1000;
    newDate.setTime(weekday);

    const imgURL =`owf owf-${reading.weather[0].id} owf-5x`
    return(
        <div className="card CardBlock">
            <h3 className="card-title">{moment(newDate).format("dddd")}</h3>
            <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
            <i className={imgURL}></i>
            <h2 >{Math.round(reading.main.temp)} °C </h2>
            <div className="card-body">
                <p className="card-text">{reading.weather[0].description}</p>
            </div>
        </div>
    );
}

export default DayCard;