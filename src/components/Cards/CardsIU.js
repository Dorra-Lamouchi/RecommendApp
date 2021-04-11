//import React, { Component } from 'react'
import './card-style.css'
//import voir from "../../assets/voir.png";
//import Affichedetail from './../categories/afficheformation'
import {Link} from 'react-router-dom'
const Card = props => {
    const stylelink = {
        textDecoration : 'none',
        color : 'white ',
     
      }
      const linkstyle = {
          color : 'black',
      }
return(
    <div className="card text-center shadow" >
        <div className="overflow">
        <Link to={"/"+props.lien+"/"+props.id} ><img src={props.img} alt="logo" className="card-img-top" /></Link>
        </div>
        <div className="card-body text-dark">
            <h4 className="card-title"> <Link to={"/"+props.lien+"/"+props.id} style={linkstyle}>{props.title}</Link></h4>
            <p className="card-text">
            {props.description}<br/>
             {props.formateur}<br/>
             {props.nombreplace}<br/>
             {props.date}
            </p>
            <p className="card-text"></p>
           
           
        </div>
    </div>
)
}
export default Card ;