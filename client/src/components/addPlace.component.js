import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useCurrentPosition } from 'react-use-geolocation';
import axios from 'axios';
// import "materialize-css";

var geopositionData;
const Position = () => {
    const [position, error] = useCurrentPosition();
    if (position) {
        geopositionData = position;
    }
    return null;
    // return <p></p>
}

export default class AddPlace extends Component {
    constructor(props) {
        super(props);
        this.onAddDesc = this.onAddDesc.bind(this);
        this.onAddPlace = this.onAddPlace.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAddImg = this.onAddImg.bind(this);

        this.state = {
            place: '',
            description: '',
            image: '',
            latitude: '',
            longitude: ''
        }

    }

    onAddPlace(e) {
        this.setState({
            place: e.target.value,
            latitude: parseFloat(geopositionData.coords.latitude).toFixed(4),
            longitude: parseFloat(geopositionData.coords.longitude).toFixed(4)
        })
    }

    onAddDesc(e) {
        this.setState({
            description: e.target.value
        })
    }

    onAddImg(e) {
        this.setState({
            image: e.target.files[0]
        })
    }
    onSubmit(e) {
        e.preventDefault();

        const place = new FormData();
        place.append("place", this.state.place);
        place.append("description", this.state.description);
        place.append("imageData", this.state.image);
        place.append("location", `https://www.google.com/maps/@${this.state.latitude},${this.state.longitude},15z`)
        place.append("iframeLocation", `https://www.google.com/maps/embed/v1/view?key=<API_KEY>&center=${this.state.latitude},${this.state.longitude}&zoom=15`);

        console.log(place);

        axios.post('/places/add', place)
            .then((res) => {
                if (res.data === "success") {
                    alert('Successfully Saved');
                    window.location.href = '/';
                }
            });

        this.setState({
            place: '',
            description: '',
            image: ''
        });
    }

    render() {
        return (
            <div>
                <h1>Add a Place</h1>
                <Position />
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                        placeholder="Name"
                        value={this.state.place}
                        onChange={this.onAddPlace} />
                    <input type="text"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.onAddDesc} />
                    <div className="file-field input-field">
                        <div className="btn">
                            <span style={{marginTop:"0px"}}>Choose an Image</span>
                            <input type="file" onChange={this.onAddImg}></input>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"></input>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit<i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}
