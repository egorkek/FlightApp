import React from 'react'
import classes from "./Departure.css";
import Flight from '../../components/flight/Flight'
import axios from "axios";
import Loader from "../../components/UI/Loader/Loader";

class Departure extends React.Component{
    state={

    }
    async getFlights (time){
        try {
            const response = await axios.get(`https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/VKO/dep/${time}?appId=0d1b066d&appKey=04e621b80655d6d251102e55583f8977&utc=false&numHours=2&maxFlights=100`);
            const data = response.data.flightStatuses;
            const baseOfAirports = response.data.appendix.airports;

            const newState = [];
            data.forEach((obj)=>{
                let city= '';
                for (let i=0;i<baseOfAirports.length;i++) {

                    if (baseOfAirports[i].fs === obj.arrivalAirportFsCode) {
                        city = baseOfAirports[i].city

                    }
                }
                console.log(obj)

                newState.push({
                    time: obj.departureDate.dateLocal.slice(11, 16),
                    city: `${city}(${obj.arrivalAirportFsCode})`,
                    terminal: obj.airportResources.departureTerminal,
                    flightNumber: obj.carrierFsCode +obj.flightNumber
                })

            })
            newState.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
            this.setState({
                flights:newState
            })



        }catch (e) {
            console.log(e)

        }

    };
    componentDidMount() {
        const date = new Date();
        if (!this.state.time)
            this.getFlights(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}/${date.getHours()}`)
    }
    renderFlights = ()=>{
        return this.state.flights.map((flight, index)=>{
            return(
                <Flight time={flight.time} city={flight.city} terminal={flight.terminal} key={index} flightNumber={flight.flightNumber}/>
            )

        })
    }
    onChangeSelectHandler = (e)=>{
        const date = new Date();

        const time  = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}/${e.target.value}`

        this.getFlights(time)


    }


    render(){
    return(
        <div className={classes.Departure}>
            <div>
                <select name="choose time" onChange={(e)=>this.onChangeSelectHandler(e)} >
                    <option>Choose time</option>
                    <option value={'00'}>00:00-02:00</option>
                    <option value={'02'}>02:00-04:00</option>
                    <option value={'04'}>04:00-06:00</option>
                    <option value={'06'}>06:00-08:00</option>
                    <option value={'08'}>08:00-10:00</option>
                    <option value={'10'}>10:00-12:00</option>
                    <option value={'12'}>12:00-14:00</option>
                    <option value={'14'}>14:00-16:00</option>
                    <option value={'16'}>16:00-18:00</option>
                    <option value={'18'}>18:00-20:00</option>
                    <option value={'20'}>20:00-22:00</option>
                    <option value={'22'}>22:00-00:00</option>
                </select>
            </div>

            <div className={classes.Tab}>
                <p>Time</p>
                <p>City</p>
                <p>Terminal</p>
                <p>Flight number</p>

            </div>
            {this.state.flights ? this.renderFlights() : <Loader/> }
        </div>
    )

    }

}
export default Departure