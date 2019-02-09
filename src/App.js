import React, { Component } from 'react';
import classes from './App.css'
import './App.css';
import {Route, Switch, withRouter, NavLink} from 'react-router-dom'
import Layout from "./HOC/Layout/Layout";
import Input from "./components/UI/Input/Input";
import Arrival from "./containers/Arrival/Arrival";
import Departure from "./containers/Departure/Departure";

class App extends Component {
    state={
        myInput:{
            value: ''
        },
    }


    onChangeInputHandler = (e)=>{
        this.setState({
            myInput:{
                value: e.target.value
            }
        })

    }
  render() {
    return (
        <Layout>
            <div className={classes.App}>
                <h1>Flight display</h1>
                    <Input value={this.state.myInput.value} onChange={(e)=>this.onChangeInputHandler(e)} placeholder={'enter flight number'} />


                <div>
                    <NavLink to='/arrival' className={this.props.location.pathname==='/arrival'? classes.active : null }>Arrivals</NavLink>
                    <NavLink to='/departure' className={this.props.location.pathname==='/departure'? classes.active : null}>Departure</NavLink>
                </div>

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
