import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = (props) => {
    return (
        <li class="media">
            <img src={props.places.imageData} className="mr-3" style={{width:"300px"},{height:"300px"}}></img>
        </li>
    )
}

export default class ListPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = { places: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/places').then((res) => {
            this.setState({ places: res.data });
        }).catch((err) => {
            console.log(err);
        })
    }

    placesList() {
        return this.state.places.map((current) => {
            return <List places={current} />
        })
    }

    render() {
        return (
            <div>
                <h3>
                    Logue &nbsp;
                <small class="text-muted">See your visited places</small>
                </h3>
                {/* <table className="table">
                    <thead className="thead-dark">
                        <tr style={{borderRadius:"10rem"}}>
                            <th>Place</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.placesList()
                        }
                    </tbody>
                </table> */}
                <ul className="list-unstyled">
                    {
                        this.placesList()
                    }
                </ul>
            </div>
        )
    }
}