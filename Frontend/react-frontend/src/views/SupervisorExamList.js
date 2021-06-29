import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "@material-ui/core/Button";
import SuperviseExam from "../components/SuperviseExam";
import LinearProgress from "@material-ui/core/LinearProgress";

export default class SupervisorExamList extends Component {
  state = {
    exams: [],
    exam_name: "",
    exam_id: 0,
    exam_duration: 0,
    exam_startdate: "",
    clicked: false,
    status: "",
  };
  componentDidMount() {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/supervisor/dashboard/`,
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("ExamifyToken"),
          },
        }
      )
      .then((res) => {
        console.log(res, "sdsd");
        this.setState({ ...this.state, exams: res.data });
      });
  }
  goBack = () => {
    this.setState({ ...this.state, clicked: false });
  };
  formatDate = (exam_starttime) => {
    let examStartTime = new Date(exam_starttime);
    var date =
      examStartTime.getFullYear() +
      "-" +
      (examStartTime.getMonth() + 1) +
      "-" +
      examStartTime.getDate();

    return date;
  };
  formatTime = (exam_starttime) => {
    let examStartTime = new Date(exam_starttime);
    var time =
      examStartTime.getHours() +
      ":" +
      examStartTime
        .getMinutes()
        .toString()
        .padStart(2, "0");
    return time;
  };
  render() {
    return !this.state.clicked ? (
      this.state.exams.length > 0 ? (
        <div
          style={{
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Exam name</th>
                <th>Start date</th>
                <th>Start Time</th>
                <th>Duration</th>
                <th>Exam status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.exams.map((key) => {
                return (
                  <tr key={key.exam_id}>
                    <td
                      onClick={() =>
                        this.setState({
                          ...this.state,
                          exam_name: key.exam_name,
                          exam_id: key.exam_id,
                          exam_duration: key.exam_duration,
                          exam_startdate: key.exam_startdate,
                          clicked: true,
                          status: key.is_started,
                        })
                      }
                    >
                      <Button style={{ color: "blue" }}>{key.exam_name}</Button>{" "}
                    </td>
                    <td>{this.formatDate(key.exam_startdate)}</td>
                    <td>{this.formatTime(key.exam_startdate)}</td>
                    <td>{key.exam_duration}</td>
                    <td>
                      {key.is_started === "The Exam is Closed"
                        ? "Exam ended"
                        : "Exam didn't start yet"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <LinearProgress />
        </div>
      )
    ) : (
      <div>
        <SuperviseExam
          exam_id={this.state.exam_id}
          exam_name={this.state.exam_name}
          exam_startdate={this.state.exam_startdate}
          exam_duration={this.state.exam_duration}
          goBack={this.goBack}
          token={localStorage.getItem("ExamifyToken")}
          status={this.state.status}
        />
      </div>
    );
  }
}
