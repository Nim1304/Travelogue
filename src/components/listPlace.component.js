import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "materialize-css";

const ListWithRow = (props) => {
    
    return (
        <div className="row">
            {props.list}
        </div>
    )
}

const List = (props) => {
    var a = `/places/${props.places._id}`
    return (
        <div class="col s12 m6 l3">
            <div className="card card-panel hoverable">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator responsive-img" src={props.places.imageData}></img>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{props.places.place}<i className="material-icons right">more_vert</i></span>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{props.places.place}<i className="material-icons right">close</i></span>
                    <p>{props.places.description}</p>
                    <p><a href={props.places.location}>See On Maps</a></p>
                    <p><a href={a}>See Big</a> </p> 
                </div>
            </div>
        </div>
    )
}

const Add = () => {
    return <h4>Add Something</h4>
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
        var ls=[]
        this.state.places.map((current, i) => {
            if (i % 4 == 0){
                ls.push([])
                ls[ls.length - 1].push(<List places={current} />)
            } else {
                ls[ls.length - 1].push(<List places={current} />)
            }
        });
        console.log(ls);
        return ls.map((curr)=>{
            return <ListWithRow list={curr} />
        });

    }

    render() {
        let places;
        this.state.places.length > 0 ? places = this.placesList() : places = <Add />;
        // console.log(places)
        return (
            <div>
                <h3>
                    Logue &nbsp;
                <small className="text-muted">See your visited places</small>
                </h3>
                <div>
                    {
                        places
                    }
                </div>
            </div>
        )
    }
}