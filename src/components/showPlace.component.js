import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import App from '../App';

const Place = (props) =>{
    return (
        <div>
            <img src={props.place.imageData}></img>
            <p>name : {props.place.name}</p>
            <p>desc : {props.place.description}</p>
            <a href={props.place.location}>See on Maps</a>
            <input type="submit" />
        </div>
    )
}

export default class ShowPlace extends Component {
    constructor(props){
        super(props);

        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            mongo_id:props.id,
            place:'',
            done:false
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:3000/places/${this.state.mongo_id}`).then((res)=>{
            this.setState({place:res.data});
            console.log(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    }

    showPlace(){
        return <Place place={this.state.place} />
    }

    onSubmit(e){
        e.preventDefault();
        axios.post(`http://localhost:3000/places/delete/${this.state.mongo_id}`).then((res)=>{
            console.log(res);
            if(res=="success")
            alert('deleted');
            this.setState({done:true});
        });

    }

    render(){
        let route;
        this.state.done ? route =<App /> : route=this.showPlace();

        return (
            <form onSubmit={this.onSubmit}>
                {route}
            
            </form>
        )
    }
}