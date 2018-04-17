import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

// Simple Countdown Timer

// Everything here should be coded in HTML and Javascript (ReactJS). You can use any package manager and/or boilerplate you'd like. Please send all source code files in an email (zipped/compressed) with instructions on how to run them.
// Create an input to take a start time. The input should be in hh:mm:ss format, which represents: hour, minute and seconds, respectively. The input should be a valid input. 
// Create an input to take an end time. The input should be in hh:mm:ss format. The end time should be a valid input and should represent a time later than the start time. 
// Create an output div/text/span to represent the countdown counter (in seconds). 
// Create a button with "Start Countdown" text on it. When user clicks the button, it should:
// Verify both inputs' validity, and throw error message if there is a problem, e.g. input format, intervals, etc

// KX: Bug -- negative timer interval doesn't throw error

// Reset the countdown counter output div/text/span
// Calculate the number of seconds difference between start time and end time, and display it as the output's initial state

// KX: Bug -- timer is currently split into hh:mm:ss, rather than seconds

// Start decreasing the output by one for every second (behave like a countdown timer)
// All time inputs, output and button should be rendered in ReactJS.
// Bonus point if you can use Redux for button action and state transition. 

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      startHour: "00",
      startMinutes: "00",
      startSeconds: "00",
      endHour: "00",
      endMinutes: "00",
      endSeconds: "00",
      counter: "", 
      error: "",
      totalSecondsLeft: 0,
      startCountDown: false,
      timerId: '',
      timeOut: ''
    }
    
    this.updateStartHour = this.updateStartHour.bind(this);
    this.updateStartMinutes = this.updateStartMinutes.bind(this);
    this.updateStartSeconds = this.updateStartSeconds.bind(this);
    this.updateEndHour = this.updateEndHour.bind(this);
    this.updateEndMinutes = this.updateEndMinutes.bind(this);
    this.updateEndSeconds = this.updateEndSeconds.bind(this); 
    this.startCounter = this.startCounter.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
  }

  updateStartHour(e) {
    this.setState({
      startHour: e.target.value
    })
  }
  updateStartMinutes(e) {
    this.setState({
      startMinutes: e.target.value
    })
  }

  updateStartSeconds(e) {
    this.setState({
      startSeconds: e.target.value
    })
  }

  updateEndHour(e) {
    this.setState({
      endHour: e.target.value
    })
  }
  updateEndMinutes(e) {
    this.setState({
      endMinutes: e.target.value
    })
  }

  updateEndSeconds(e) {
    this.setState({
      endSeconds: e.target.value
    })
  }

  calculateTime() {
    let totalSecondsLeft; 
    if(this.state.startCountDown === false) {
      const { startHour, startMinutes, startSeconds, endHour, endMinutes, endSeconds } = this.state;
      let startTotalSeconds = parseInt(startSeconds) + (parseInt(startMinutes) * 60) + (parseInt(startHour) * 3600);
      let endTotalSeconds = parseInt(endSeconds) + (parseInt(endMinutes) * 60) + (parseInt(endHour) * 3600);
      totalSecondsLeft = endTotalSeconds - startTotalSeconds;
      this.setState({
        totalSecondsLeft: totalSecondsLeft
      })
    } else {
      totalSecondsLeft = this.state.totalSecondsLeft;
    }

    let hours = Math.floor(totalSecondsLeft/3600);
    totalSecondsLeft = totalSecondsLeft - (hours * 3600);
    let minutes = Math.floor(totalSecondsLeft/60);
    let seconds = totalSecondsLeft - (minutes * 60);
    
    if(hours.toString().length !== 2) {
      hours = "0" + hours;
    }
    if(minutes.toString().length !== 2) {
      minutes = "0" + minutes;
    }
    if(seconds.toString().length !== 2) {
      seconds = "0" + seconds;
    }
    this.setState({
      counter: hours + ":" + minutes + ":" + seconds
    })
    
    return  hours[0] !== "-" ? hours + ":" + minutes + ":" + seconds : "";
  }

  startCounter() {
    let timerId;
    let timeOut;
    if(this.state.startCountDown === true) {
      
      this.setState({
        startHour: "00",
        startMinutes: "00",
        startSeconds: "00",
        endHour: "00",
        endMinutes: "00",
        endSeconds: "00",
        counter: "", 
        error: "",
        totalSecondsLeft: 0,
        startCountDown: false
      }, () => {
        clearInterval(this.state.timerId);
        clearTimeout(this.state.timeOut);
        this.calculateTime();
        $('#startHour').val(""); 
        $('#startMinute').val("");
        $('#startSeconds').val("");
        $('#endHour').val("");
        $('#endMinute').val("");
        $('#endSeconds').val("");
      }) 
      
    } else {
      const { startHour, startMinutes, startSeconds, endHour, endMinutes, endSeconds } = this.state;
      let allMinutesAndSeconds = [startHour, startMinutes, startSeconds, endHour, endMinutes, endSeconds];
      let allHours = [startHour, endHour];
      let error = "";
      
      this.setState({
        error: ""
      })
  
      for(let i = 0; i < allHours.length; i++) {
        if(allHours[i].length !== 2) {
          error = "invalid input";
          this.setState({
            error: "invalid input"
          })
          throw new Error('invalid input');
        }
  
        let timeHour = +allHours[i];
        
        if(isNaN(timeHour) || (timeHour < 0 || timeHour >= 24)) {
          error = "invalid input";
          this.setState({
            error: "invalid input"
          })
          console.log('invalid input');
        }
      }
  
      for(let j = 0; j < allMinutesAndSeconds.length; j++) {
        if(allMinutesAndSeconds[j].length !== 2) {
          error = "invalid input";
          this.setState({
            error: "invalid input"
          })
          console.log('invalid input');
        }
  
        let timeSecMin = +allMinutesAndSeconds[j];
        if(isNaN(timeSecMin) || (allMinutesAndSeconds[j] < 0 || allMinutesAndSeconds[j] >= 60)) {
          error = "invalid input";
          this.setState({
            error: "invalid input"
          })
          console.log('invalid input');
        }
      }

      if(startHour > endHour) {
        error = "invalid input";
        this.setState({
          error: "invalid input"
        })
      } else if(startHour === "00") {
        if(startMinutes > endMinutes) {
          error = "invalid input";
          this.setState({
            error: "invalid input"
          })
         console.log('invalid input');
        }
      } else if(startMinutes === "00") {
        if(startSeconds > endSeconds) {
          error = "invalid input";
          this.setState({
            error: "invalid input"
          })
          console.log('invalid input');
        }
      }
  
      if(error.length === 0) {
        let countDownFrom = this.calculateTime();
        this.setState({
          counter: countDownFrom
        }, () => {
          this.setState({
            startCountDown: true
          }, () => {
              timerId = setInterval(() => {
              let totalSecondsLeft = this.state.totalSecondsLeft;
              this.setState({
                totalSecondsLeft: totalSecondsLeft - 1
              }, () => {
                this.calculateTime();
              })
            }, 1000);
  
            timeOut = setTimeout(() => {
              clearInterval(timerId);
              this.setState({
                startCountDown: false
              })
            }, this.state.totalSecondsLeft * 1000);

            this.setState({
              timerId: timerId,
              timeOut: timeOut
            })
          }) 
        })
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Timer-container">
          <header className="App-header">
            <h1 className="App-title">Count Down Timer</h1>
          </header>
          <div id="start">
            Start:
            HH: <input type="text" id="startHour" onKeyUp={this.updateStartHour}/>
            MM: <input type="text" id="startMinute" onKeyUp={this.updateStartMinutes}/>
            SS: <input type="text" id="startSeconds" onKeyUp={this.updateStartSeconds}/>
          </div>
          <div id="end">
            End:
            HH: <input type="text" id="endHour" onKeyUp={this.updateEndHour}/>
            MM: <input type="text" id="endMinute" onKeyUp={this.updateEndMinutes}/>
            SS: <input type="text" id="endSeconds" onKeyUp={this.updateEndSeconds}/>
          </div>
          <button type="submit" id="startTimer" onClick={this.startCounter}>Start Countdown</button>
          <div>
            {this.state.error}
          </div>
          <div id="counter">
            {this.state.counter}
          </div>
          <div id="totalSecondsLeft">
            {this.state.totalSecondsLeft} seconds left
          </div>
        </div>
      </div>
    );
  }
}

export default App;
