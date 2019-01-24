import React, { Component } from 'react';

//Firebase Configuration
var firebase = require('firebase');
var uuid = require('uuid');
var config = {
  apiKey: "AIzaSyBiqZUCWrzJUDc8ClJbMIEyVPttpnGnZYc",
  authDomain: "usurvey-720ac.firebaseapp.com",
  databaseURL: "https://usurvey-720ac.firebaseio.com",
  projectId: "usurvey-720ac",
  storageBucket: "usurvey-720ac.appspot.com",
  messagingSenderId: "580784096796"
};
firebase.initializeApp(config);

class Usurvey extends Component {
    state = {
        uid: uuid.v1(),
        name: 'Django',
        answers: {
          asnwer1:'',
          answer2:'',
          answer3:''
        },
        isSubmitted:false
    }
    //Updating State with the name output
    nameSubmit = (event) => {
        const name = this.refs.name.value;
        this.setState({name:name},() => console.log(this.state));
        
    }

    answerSelectedHandler = (event) => {
        const answer1 = event.target.value;
        const answers = {...this.state.answers};
        answers.asnwer1 = answer1;
        this.setState({answers:answers});
    }

    render() {
        var message;
        var questions;
        if (this.state.name === '' && this.state.isSubmitted === false) {
            message = <div>
              <h1>Hello! <br/> Please Enter your name and hit Enter to continue.</h1>
              <form onSubmit={this.nameSubmit}>
                <input className="nameInput" type='text' ref='name' placeholder='Enter your name'></input>
              </form>
            </div>;
            questions = null;
        } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
            message = <h1>Hi {this.state.studentName}! Thanks for taking our Survey</h1>;
            questions = <div className = 'card'>
                <form>
                    <label>What kind of Web developer are you?</label><br/>
                    <input type='radio' name='answer1' value='frontEnd' onChange={this.answerSelectedHandler} />Front-End
                    <input type='radio'name='answer1' value='backtEnd' onChange={this.answerSelectedHandler} />Back-End
                    <input type='radio'name='answer1' value='fullStacks' onChange={this.answerSelectedHandler} />Full Stacks
                </form>
            </div>
        }
        return(
            <div>
                {message}
                {questions}
            </div>
        )
    }
}


export default Usurvey;