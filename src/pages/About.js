import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/profile_pic.jpg";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Samuel Iradukunda</div>
            <div className="brief_description">
              Hi! I am a rising junior pursuing a computer science degree at University of Louisville. Besides programming, I love to try different coffee flavors, workout, and hangout with friends!
            </div>
          </div>
        </div>
      </div>
    );
  }
}
