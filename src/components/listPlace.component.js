import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "materialize-css";
const List = (props) => {
    var a=`/places/${props.places._id}`
    return (
        // <div className="responsive">
        //     <div className="gallery">
        //         <a href={a}>
        //         <img src={props.places.imageData} alt="Cinque Terre" width="400" height="400"></img>
        //         </a>
        //         <div className="desc">{props.places.description}</div>
        //     </div>
        // </div>
        <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" height="400px" width="600px" src={props.places.imageData}></img>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">{props.places.place}<i className="material-icons right">more_vert</i></span>
              <p><a href="#">This is a link</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{props.places.place}<i className="material-icons right">close</i></span>
                <p>{props.places.description}</p>
            </div>
        </div>
                  
        
        // <div class="col-md-4">`
        //     <div class="thumbnail">
        //         <a href="/w3images/lights.jpg">
        //             <img src={props.places.imageData} alt="Lights" style="width:100%"></img>
        //             <div class="caption">
        //                 <p>{props.places.description}</p>
        //             </div>
        //         </a>
        //     </div>
        // </div>
    )
}

const Add = ()=>{
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
        return this.state.places.map((current) => {
            return <List places={current} />
        })
    }

    render() {
        let places;
        this.state.places.length>0 ? places=this.placesList() : places=<Add/>;
        // console.log(places)
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
                    places
                }
            </div>
        )
    }
}