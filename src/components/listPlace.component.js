import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = (props) => {
    return (
        <div className="gallery">
            <a target="_blank" href="img_5terre.jpg">
            <img src={props.places.imageData} alt="Cinque Terre" width="400" height="400"></img>
            </a>
            <div className="desc">{props.places.description}</div>
        </div>
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
                <small className="text-muted">See your visited places</small>
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
                {
                    this.placesList()
                }
            </div>
        )
    }
}