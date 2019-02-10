import React, { Component } from 'react';
import classes from './App.css'
import './App.css';
import {Route, Switch, withRouter, NavLink} from 'react-router-dom'
import Layout from "./HOC/Layout/Layout";
import Input from "./components/UI/Input/Input";
import Arrival from "./containers/Arrival/Arrival";
import Departure from "./containers/Departure/Departure";
import axios from 'axios'
import Flight from "./components/flight/Flight";
function currentDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1 >= 10 ? date.getMonth()+1 : `0${date.getMonth()+1}`}-${date.getDate()}`

}

class App extends Component {
    state={
        myForm:{
            flightNumber: '',
            carrier:'',
            date:currentDate(),
            type:'arr'
        },
    }


    onChangeInputHandler = (e,option)=>{
        let newState = this.state.myForm;
        newState[option]=e.target.value;
        this.setState({
            myForm:newState
        })
    }

    onButtonClickHandler = async (e)=>{
        e.preventDefault();
        const info = `${this.state.myForm.carrier}/${this.state.myForm.flightNumber}/${this.state.myForm.type}/${this.state.myForm.date.replace(/[-]/g,'/')}`
        try {

            if (this.state.myForm.type ==='arr'){
                const response = await axios.get(`https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/${info}?appId=0d1b066d&appKey=04e621b80655d6d251102e55583f8977&utc=false`)
                const data = response.data;

                this.setState({
                    flight:{
                        time: data.flightStatuses[0].arrivalDate.dateLocal.slice(11, 16),
                        city: `${data.appendix.airports[0].city}(${data.flightStatuses[0].departureAirportFsCode})`,
                        terminal: data.flightStatuses[0].airportResources.arrivalTerminal,
                        flightNumber: data.flightStatuses[0].carrierFsCode +data.flightStatuses[0].flightNumber
                    }
                })
                this.setState({gettedFlight: true})

                console.log(this.state.flight)



            }
            if (this.state.myForm.type==='dep'){
                const response = await axios.get(`https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/${info}?appId=0d1b066d&appKey=04e621b80655d6d251102e55583f8977&utc=false`)

                const data = response.data;
                console.log(data)

                this.setState({
                    flight:{
                        time: data.flightStatuses[0].departureDate.dateLocal.slice(11, 16),
                        city: `${data.appendix.airports[1].city}(${data.flightStatuses[0].arrivalAirportFsCode})`,
                        terminal: data.flightStatuses[0].airportResources.departureTerminal,
                        flightNumber: data.flightStatuses[0].carrierFsCode +data.flightStatuses[0].flightNumber
                    }
                })
                this.setState({gettedFlight: true})

            }
        }catch (e) {
            console.log(e)

        }
    }
  render() {

    return (
        <Layout>
            <div className={classes.App}>
                <h1>Flight display</h1>
                <form>
                    <Input value={this.state.myForm.carrier} placeholder={'enter airline code'} onChange={(e)=>this.onChangeInputHandler(e, 'carrier')}/>
                    <Input value={this.state.myForm.flightNumber} type={'number'} onChange={(e)=>this.onChangeInputHandler(e, 'flightNumber')} placeholder={'enter flight number'} />

                    <select onChange={(e)=>this.onChangeInputHandler(e, 'type')}>
                        <option value={'arr'}>Arrival</option>
                        <option value={'dep'}>Departure</option>
                    </select>
                    <input type="date" value={this.state.myForm.date} onChange={(e)=>this.onChangeInputHandler(e, 'date')}/>
                    <button onClick={(e)=>this.onButtonClickHandler(e)}>Find</button>
                </form>
                


                <div className={classes.Links}>
                    <NavLink to='/arrival' className={this.props.location.pathname==='/arrival'? classes.active : null }>Arrivals</NavLink>
                    <NavLink to='/departure' className={this.props.location.pathname==='/departure'? classes.active : null}>Departure</NavLink>
                </div>
                {this.state.gettedFlight ?
                    <Flight time={this.state.flight.time} city={this.state.flight.city} terminal={this.state.flight.terminal} flightNumber={this.state.flight.flightNumber}/>
                    : null

                }

                <Switch>
                    <Route path='/departure' render={()=><Departure time={this.state.time}/>}  />
                    <Route path='/arrival' render={()=><Arrival time={this.state.time}/>} />

                </Switch>

            </div>
        </Layout>


    );
  }
}

export default withRouter(App);
