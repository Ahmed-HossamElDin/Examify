import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import CountdownTimer from "./CountdownTimer";
import LinearProgress from "@material-ui/core/LinearProgress";
import StudentExam from "./StudentExam";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
var counter = 0;
var Answer = {};
var submitted = false;
var success = false;
export default class TakeExam extends Component {
  componentDidMount() {
    this.setState({ ...this.state, error: "", time_left: 0 });
  }
  state = {
    exam_name: "",
    exam_starttime: "",
    exam_duration: 0,
    questions: [],
    checked: false,
    Answer: {},
    loading: false,
    submit: false,
    start: false,
    time_left: 0,
    error: "",
  };

  handleStartExam = () => {
    var x = navigator.getUserMedia(
      { audio: true, video: true },
      function(stream) {
        stream.getTracks().forEach((x) => x.stop());
      },
      (err) => {
        console.log(err);
      }
    );
    this.setState({ ...this.state, loading: true, start: true }, () => {
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/start/`,
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((res) => {
          this.setState({
            exam_name: res.data.exam_name,
            exam_starttime: res.data.exam_starttime,
            exam_duration: res.data.exam_duration,
            questions: res.data.questions,
            loading: false,
          });
        })
        .catch(() => {
          this.setState({ error: this.props.status, loading: false });
        });
    });
  };
  handleSubmit = () => {
    this.setState({ ...this.state, submit: true }, () => {
      axios
        .post(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/submit/`,
          { student_answers: Answer },
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then(() => {
          submitted = true;
          success = true;
          this.setState({ ...this.state, submit: false });
        });
    });
  };
  getTimeLeft = (e) => {
    var show = e.target.checked;
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/time-left/`,
        {
          headers: { Authorization: "Token " + this.props.token },
        }
      )
      .then((res) => {
        this.setState({
          checked: show,
          time_left:
            parseInt(res.data.time_left.split(":")[0]) * 60 * 60 +
            parseInt(res.data.time_left.split(":")[1]) * 60,
        });
      })
      .catch((err) => {});
  };
  handleAnswer = (idQ, idA) => {
    Object.assign(Answer, { [idQ]: idA });
  };
  render() {
    let examStartTime = new Date(this.props.exam_startdate);
    var date =
      examStartTime.getFullYear() +
      "-" +
      (examStartTime.getMonth() + 1) +
      "-" +
      examStartTime.getDate();
    var time =
      examStartTime.getHours() +
      ":" +
      examStartTime
        .getMinutes()
        .toString()
        .padStart(2, "0");
    var dateTime = date + " " + time;

    return (
      <div
        style={{
          textAlign: "center",
          fontFamily: "Arial",
        }}
      >
        <Button
          style={{ float: "left", marginLeft: 20, marginTop: 20 }}
          variant="outlined"
          size="small"
          onClick={this.props.goBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        {this.props.exam_name !== "" ? (
          <div>
            {" "}
            <Jumbotron>
              <h1>{this.props.exam_name} Exam</h1>
              <p>
                Exam Duration: {this.props.exam_duration}h
                <br />
                {"   "} Exam Start Time: {dateTime.toString()}
              </p>
              <p>
                Show exam countdown timer{" "}
                <Switch
                  disabled={
                    !this.state.start ||
                    (this.state.start && this.state.error !== "" ? true : false)
                  }
                  checked={this.state.checked}
                  onChange={this.getTimeLeft}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </p>
              <p>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={this.handleStartExam}
                  startIcon={
                    this.state.loading ? (
                      <CircularProgress size={20} color="secondary" />
                    ) : (
                      <div></div>
                    )
                  }
                  disabled={this.state.loading || this.state.start}
                >
                  Start Exam
                </Button>
              </p>
            </Jumbotron>{" "}
            {this.state.error !== "" ? (
              <div>
                <br /> <Alert severity="error">{this.state.error}</Alert>
              </div>
            ) : (
              <div></div>
            )}
            {this.state.checked ? (
              this.state.time_left !== 0 && this.state.time_left !== "" ? (
                <div style={{ position: "sticky", top: 0 }}>
                  <CountdownTimer duration={parseInt(this.state.time_left)} />
                </div>
              ) : (
                <div></div>
              )
            ) : (
              <div></div>
            )}
            {Object.keys(this.state.questions).length > 0 ? (
              ((counter = 0),
              (
                <div>
                  {Object.entries(this.state.questions).map((question) => {
                    counter = counter + 1;
                    return (
                      <StudentExam
                        key={question[0]}
                        question={question}
                        counter={counter}
                        exam_id={163}
                        handleAnswer={this.handleAnswer}
                      />
                    );
                  })}{" "}
                  <Button
                    style={{ marginBottom: 20 }}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={this.handleSubmit}
                    startIcon={
                      this.state.submit ? (
                        <CircularProgress size={20} color="secondary" />
                      ) : (
                        <div></div>
                      )
                    }
                    disabled={this.state.submit || submitted}
                  >
                    {this.state.submit === false && success !== true
                      ? "Submit"
                      : success === true
                      ? "Submitted Successfully"
                      : "Submitting..."}
                  </Button>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <LinearProgress />
        )}
      </div>
    );
  }
}
