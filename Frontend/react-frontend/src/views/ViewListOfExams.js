import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "react-bootstrap/Table";
import ViewListOfStudents from "../components/ViewListOfStudents";

export default class ViewListOfExams extends Component {
  state = {
    exams: [],
    exam_id: 0,
    clicked: false,
    loading: false,
    token: "",
  };
  componentDidMount() {
    this.setState(
      {
        clicked: false,
        loading: true,
        token: localStorage.getItem("ExamifyToken"),
      },
      () =>
        axios
          .get(
            `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/`,
            {
              headers: {
                Authorization: "Token " + this.state.token,
              },
            }
          )
          .then((res) => {
            this.setState({ ...this.state, exams: res.data, loading: false });
          })
          .catch(() => {
            this.setState({
              loading: false,
            });
          })
    );
  }
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
  goBack = () => {
    this.setState({ ...this.state, clicked: false });
  };
  render() {
    return this.state.loading ? (
      <LinearProgress />
    ) : !this.state.clicked ? (
      <div>
        {" "}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Exam name</th>
              <th>Start date</th>
              <th>Start Time</th>
              <th>Duration(hours)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exams.map((key) => {
              return (
                <tr key={key.id}>
                  <td>
                    <Button
                      style={{ color: "blue" }}
                      onClick={() =>
                        this.setState({
                          exam_id: key.id,
                          clicked: true,
                        })
                      }
                    >
                      {key.exam_name}
                    </Button>{" "}
                  </td>
                  <td>{this.formatDate(key.exam_startdate)}</td>
                  <td>{this.formatTime(key.exam_startdate)}</td>
                  <td>{key.exam_duration}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    ) : (
      <ViewListOfStudents exam_id={this.state.exam_id} goBack={this.goBack} />
    );
  }
}
