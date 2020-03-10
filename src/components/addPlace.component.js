import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default class AddPlace extends Component {
    constructor(props) {
        super(props);
        this.onAddDesc=this.onAddDesc.bind(this);
        this.onAddPlace=this.onAddPlace.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onAddImg=this.onAddImg.bind(this);

        this.state={place:'',
                    description:'',
                    image:''}
    }

    onAddPlace(e){
        this.setState({
            place:e.target.value
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