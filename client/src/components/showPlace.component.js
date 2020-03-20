import React, { Component } from 'react';
import axios from 'axios';
import "materialize-css";

const Place = (props) => {
    return (
        <div class="card">
            <div class="card-content">
                <img className="materialboxed" data-caption={props.place.place} src={props.place.imageData}></img>
            </div>
            <div class="card-tabs">
                <ul class="tabs tabs-fixed-width">
                    <li class="tab"><a href="#place">Place</a></li>
                    <li class="tab"><a class="active" href="#desc">Description</a></li>
                    <li class="tab"><a href="#location">Location</a></li>
                </ul>
            </div>
            <div class="card-content grey lighten-4">
                <div id="place">{props.place.place}</div>
                <div id="desc"> {props.place.description} </div>
                <div id="location"><iframe
                    width="600"
                    height="450"
                    frameborder="0"
                    src={props.place.iframeLocation} allowfullscreen>
                </iframe></div>
            </div>
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
        axios.get(`places/${this.state.mongo_id}`).then((res) => {
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
        axios.post(`places/delete/${this.state.mongo_id}`).then((res) => {
            console.log(res);
            if (res.data === "success")
                alert('Successfully Deleted');
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