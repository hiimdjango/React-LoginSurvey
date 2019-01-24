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
        name: '',
        answers: {
          answer1:'',
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
        const answers = {...this.state.answers};
        if (event.target.name === 'answer1') {
            answers.answer1 = event.target.value;
            this.setState({answers:answers});
        } else if (event.target.name === 'answer2') {
            answers.answer2 = event.target.value;
            this.setState({answers:answers});
        } else {
            answers.answer3 = event.target.value;
            this.setState({answers:answers});
        }     
    }

    questionSubmitHandler = () => {
        firebase.database().ref('uSurvey/'+this.state.uid).set({
            name: this.state.name,
            answers: this.state.answers
        })
        this.setState({isSubmitted:true});
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
            message = <h1>Hi {this.state.name}! Please fill in the form below!</h1>;
            questions = <div>
                <form onSubmit={this.questionSubmitHandler}>
                    <div className = 'card'>
                        <label>What kind of Web developer are you?</label><br/>
                        <input type='radio' name='answer1' value='frontEnd' onChange={this.answerSelectedHandler} />Front-End
                        <input type='radio'name='answer1' value='backtEnd' onChange={this.answerSelectedHandler} />Back-End
                        <input type='radio'name='answer1' value='fullStacks' onChange={this.answerSelectedHandler} />Full Stacks
                    </div>
                    <div className = 'card'>
                        <label>What's your current status?</label><br/>
                        <input type='radio' name='answer2' value='study' onChange={this.answerSelectedHandler} />Student
                        <input type='radio'name='answer2' value='working' onChange={this.answerSelectedHandler} />Working
                        <input type='radio'name='answer2' value='searching' onChange={this.answerSelectedHandler} />Looking for a job
                    </div>
                    <div className = 'card'>
                        <label>How old are you?</label><br/>
                        <input type='radio' name='answer3' value='-25' onChange={this.answerSelectedHandler} />Under 25
                        <input type='radio'name='answer3' value='25-40' onChange={this.answerSelectedHandler} />25 - 40
                        <input type='radio'name='answer3' value='40+' onChange={this.answerSelectedHandler} />Over 40 Years old
                    </div>
                    <input className="feedback-button" type='submit' value='Submit'/>
                </form>
            </div>       
        } else if (this.state.isSubmitted === true && this.state.name !== '') {
            questions = '';
            message = <h1>Thanks for taking this survey!</h1>;
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