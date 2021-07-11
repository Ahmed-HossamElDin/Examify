import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import CountdownTimer from "./CountdownTimer";
import LinearProgress from "@material-ui/core/LinearProgress";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import SuperviseStudent from "./SuperviseStudent";

export default class SuperviseExam extends Component {
  componentDidMount() {
    this.setState({ ...this.state, error: "", time_left: 0 });
  }
  state = {
    exam_name: "",
    exam_starttime: "",
    exam_duration: 0,
    checked: false,
    loading: false,
    start: false,
    time_left: 0,
    error: "",
    students: [],
  };

  handleStartExam = () => {
    this.setState({ ...this.state, loading: true, start: true }, () => {
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/supervise/`,
          {
            headers: {
              Authorization: "Token " + this.props.token,
            },
          }
        )
        .then((res) => {
          console.log(res, "SUPERVISOR");
          this.setState({
            exam_name: res.data.exam_name,
            exam_starttime: res.data.exam_starttime,
            exam_duration: res.data.exam_duration,
            students: res.data.students,
            loading: false,
          });
        })
        .catch(() => {
          this.setState({
            error: this.props.status,
            loading: false,
          });
        });
    });
  };

  getTimeLeft = (e) => {
    var show = e.target.checked;
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/time-left/`,
        {
          headers: {
            Authorization: "Token " + this.props.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          checked: show,
          time_left:
            parseInt(res.data.time_left.split(":")[0]) * 60 * 60 +
            parseInt(res.data.time_left.split(":")[1]) * 60,
        });
      })
      .catch((err) => {});
  };

  handleTimerChange = (e) => {
    this.setState(
      {
        checked: e.target.checked,
        time_left: localStorage.getItem("ExamfiyTimeLeft"),
      },
      console.log(this.state)
    );
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
          style={{
            float: "left",
            marginLeft: 20,
            marginTop: 20,
          }}
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
                  inputProps={{
                    "aria-label": "primary checkbox",
                  }}
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
                  Supervise Exam
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
            {this.state.students.length !== 0 ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                {Object.keys(this.state.students).map((key) => {
                  return (
                    <SuperviseStudent
                      key={this.state.students[key].student_id}
                      info={this.state.students[key]}
                      exam_id={this.props.exam_id}
                      token={this.props.token}
                    />
                  );
                })}
              </div>
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
