import React, { Component } from "react";
import TimerIcon from "@material-ui/icons/Timer";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import Alert from "@material-ui/lab/Alert";

export default class CountdownTimer extends Component {
  state = {
    counter: 0,
    duration: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      duration: this.props.duration,
    };
  }
  componentDidMount() {
    if (this.state.counter === 0) {
      clearInterval(this.myInterval);
    } else {
      const startCount = this.props.duration;
      this.setState({
        counter: startCount,
      });
      this.myInterval = setInterval(() => {
        this.setState((prevState) => ({
          counter: prevState.counter - 1,
        }));
      }, 1000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  render() {
    return (
      <div>
        {this.state.counter > 0 ? (
          <div style={{ width: "20%", marginLeft: "40%" }}>
            <Alert severity="info">
              {" "}
              <TimerIcon /> Time Left: {Math.floor(
                this.state.counter / 60
              )}{" "}
              minute
            </Alert>
          </div>
        ) : (
          <div style={{ width: "20%", marginLeft: "40%" }}>
            <Alert severity="error">
              {" "}
              <TimerOffIcon /> Exam Ended, Good Luck!
            </Alert>{" "}
            {/*window.location.reload()*/}
          </div>
        )}
      </div>
    );
  }
}
