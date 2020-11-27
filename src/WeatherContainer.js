//import { render } from '@testing-library/react';
import React from 'react';
import ApiKey from './ApiKeys';
import DayCard from './DayCard';
import './css/WeatherContainer.css';
import SunIcon from "./Picture/SunIcon.png"
import PresentInfo from './PresentInfo';
import searchIcon from './Picture/searchIcon.png'



class WeatherContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullData:[],
            dailyData:[],
            firstData:[],
            value:"London",
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount = () =>{
        this.callWeatherInfo()
    }
    
    callWeatherInfo = () => {
        const weatherURL=` http://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&mode=json&units=metric&appid=${ApiKey}`;

        fetch(weatherURL)
        .then(res=>res.json())
        .then(data =>{
            if(data.list){
                const dailyData = data.list.filter(reading =>{
                    return reading.dt_txt.includes("09:00:00")
                })
                let today = new Date();

                let date=(today.getFullYear() + "-"+(today.getMonth()+1) +"-"+(today.getDate()+1));
                const firstData=dailyData.filter(reading =>{
                    return reading.dt_txt.includes(`${date}`)
                })
                
                this.setState({
                    fullData:data.list,
                    dailyData:dailyData,
                    firstData:firstData,
                }, () => console.log(this.state))
            }else{
                this.setState({
                    dailyData:['error']
                })
            }
            
        })
    }

    CallPresentInfo = () =>{
        return(
            <div>
                {this.state.firstData.map((reading,index) => <PresentInfo reading={reading} key={index} />)}
            </div>
        )
    }

    CallCard=()=>{
        return(
            <div>
                {this.state.dailyData.map((reading,index) => <DayCard reading={reading} key={index} />)}  
            </div>
        );
    }

    handleChange(event) {    
        this.setState({value: event.target.value});  
    }

    handleSubmit(event) {
        this.callWeatherInfo()
        event.preventDefault();
    }

    render(){
        return(
            <div className="Block">
                <div className="container">
                    <form onSubmit={this.handleSubmit} className="form">
                        <input type="text" className="InputBlock" value={this.state.value} onChange={this.handleChange} />
                        <button type="submit" className="SubmitButton" ><img src={searchIcon} alt="" className="searchIcon"/></button>
                    </form>
                    {this.CallPresentInfo()}
                    
                    <img src={SunIcon} className="Weather-Icon" alt=""/>
                    <h3 className="display-5 text-muted">{this.state.cvalue}</h3>
                    <div>
                    {this.CallCard()} 
                    </div>
                       
                </div>
            </div>
            
        );
    };
}

export default WeatherContainer;