import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useCurrentPosition } from 'react-use-geolocation';
import axios from 'axios';


var geopositionData;
const Position = ()=>{
    const [position,error]=useCurrentPosition();
    if(position){
        geopositionData=position;
    }
    return null;
}

export default class AddPlace extends Component {
    constructor(props) {
        super(props);
        this.onAddDesc=this.onAddDesc.bind(this);
        this.onAddPlace=this.onAddPlace.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onAddImg=this.onAddImg.bind(this);

        this.state={place:'',
                    description:'',
                    image:'',
                    latitude:'',
                    longitude:''}
        
    }

    onAddPlace(e){
        this.setState({
            place:e.target.value,
            latitude:parseFloat(geopositionData.coords.latitude).toFixed(5),
            longitude:parseFloat(geopositionData.coords.longitude).toFixed(5)
        })
    }

    onAddDesc(e){
        this.setState({
            description:e.target.value
        })
    }

    onAddImg(e){
        this.setState({
            image:e.target.files[0]
        })
    }
    onSubmit(e){
        e.preventDefault();
        
        const place=new FormData();
        place.append("place",this.state.place);
        place.append("description",this.state.description);
        place.append("imageData",this.state.image);
        place.append("location",`https://www.google.com/maps/@${this.state.latitude},${this.state.longitude}`);

        console.log(place);

        axios.post('http://localhost:3000/places/add',place)
            .then(res=>console.log(res.data));

        this.setState({place:'',
                        description:'',
                        image:''});
    }

    render(){
        return ( 
            <div>
                <h1>Add a Place</h1>
                <Position />
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                            value={this.state.place}
                            onChange={this.onAddPlace}/>
                    <input type="text"
                            value={this.state.description}
                            onChange={this.onAddDesc}/>
                    <input type="file"
                            onChange={this.onAddImg}/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}