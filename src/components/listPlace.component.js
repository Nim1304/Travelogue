import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = (props) =>{
    return (
        <tr>
            <td>{props.places.place}</td>
            <td>{props.places.description}</td>
            <td><img src={props.places.imageData}></img> </td>
        </tr>
    )
}

export default class ListPlaces extends Component {
    constructor(props){
        super(props);
        this.state = {places:[]}
    }

    componentDidMount(){
        axios.get('http://localhost:3000/places').then((res)=>{
            this.setState({places:res.data});
        }).catch((err)=>{
            console.log(err);
        })
    }

    placesList() {
        return this.state.places.map((current)=>{
            return <List places={current}/>
        })
    }

    render(){
        return (
            <div>
                <h4>Visited Places</h4>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Place</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.placesList()
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}