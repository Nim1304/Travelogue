import React, { Component } from 'react';
import axios from 'axios';
import "materialize-css";

const Place = (props) => {
    return (
        <div>
            <img className="responsive-img" align="centre" src={props.place.imageData}></img>
            <div><span>Name<blockquote>{props.place.place}</blockquote></span></div> 
            <p>desc : {props.place.description}</p>
            <p><a href={props.place.location}>See on Maps</a></p>
        </div>
    )
}

export default class ShowPlace extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            mongo_id: props.id,
            place: ''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/places/${this.state.mongo_id}`).then((res) => {
            this.setState({ place: res.data });
            console.log(res.data)
        }).catch((err) => {
            console.log(err);
        });
    }

    showPlace() {
        return <Place place={this.state.place} />
    }

    onClick(e) {
        e.preventDefault();
        axios.post(`http://localhost:3000/places/delete/${this.state.mongo_id}`).then((res) => {
            console.log(res);
            if (res.data === "success")
                alert('Successfully Deleted');
            this.setState({ done: true });
            window.location.href = "/"
        });

    }

    render() {
        return (
            <div>
                {
                    this.showPlace()
                }
                <button type="button" onClick={this.onClick}>Delete Entry</button>
            </div>
        )
    }
}