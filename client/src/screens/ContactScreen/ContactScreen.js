import React, { Component } from 'react';
import './ContactScreen.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from '../../App';
import axios from 'axios';

class ContactScreen extends Component {

  constructor() {
    super();
    this.state = {
      email:"",
      subject:"",
      message:""
    };
  }


  sendMessage = event => {
    event.preventDefault();
    const endPoint = "/messaged";
    const emailData = {
      email:this.state.email,
      subject:this.state.subject,
      message:this.state.message
    };

    if(emailData.email!=="" && emailData.subject !=="" && emailData.message!==""){
      axios.post(endPoint,emailData).then(res => {
        console.log(res.data[0]['Message']);
      });
      alert("Email is sent");
      this.newEmailForm();
    }
    else{
      alert("Email form is not completed");
    }

  }

  newEmailForm = () =>{
    this.setState({
      email:"",
      subject:"",
      message:""
    });
  }

  emailOnChange = event => {
      this.setState({
        email:event.target.value,
      });
  }

  subjectOnChange = event => {
    this.setState({
      subject:event.target.value,
    });
  }

  messageOnChange = event => {
    this.setState({
      message:event.target.value,
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/contact" render={props =>
            <div className="ContactScreen">
              <Link to='/'><h5>◀ Go Back To Home</h5></Link>
              <h1>Contact Me</h1>

              <form onSubmit={this.sendMessage}>
                <input onChange={this.emailOnChange}  type="text" name="email" placeholder="Enter in your Email.." value={this.state.email}/>
                <input onChange={this.subjectOnChange} type="text" name="subject" placeholder="Enter in the Subject.." value={this.state.subject}/>
                <textarea onChange={this.messageOnChange}  name="message" placeholder="Enter in your Message.. " value={this.state.message}></textarea>
                <button type="submit">Send Message</button>
              </form>
              <div className="contactBar">

              </div>
            </div>}
          />
          <Route exact path='/' component={App}/>

        </div>
        </Router>
    );
  }
}

export default ContactScreen;
