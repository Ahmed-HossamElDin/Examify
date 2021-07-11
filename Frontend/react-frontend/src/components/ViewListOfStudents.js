import React, { Component } from "react";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Table from "react-bootstrap/Table";
import LinearProgress from "@material-ui/core/LinearProgress";
import ViewStudentAnswers from "./ViewStudentAnswers";
export default class ViewListOfStudents extends Component {
  state = { attendance: [], loading: false, student_id: 0, token: "" };
  componentDidMount() {
    this.setState(
      { loading: true, token: localStorage.getItem("ExamifyToken") },
      () =>
        axios
          .get(
            `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/attendance/`,
            {
              headers: {
                Authorization: "Token " + this.state.token,
              },
            }
          )
          .then((res) => {
            this.setState({ attendance: res.data, loading: false });
          })
          .catch(() => {
            this.setState({
              loading: false,
            });
          })
    );
  }
  goBack = () => {
    this.setState({ ...this.state, clicked: false });
  };
  render() {
    return this.state.loading ? (
      <LinearProgress />
    ) : !this.state.clicked ? (
      <div>
        <Button
          style={{
            float: "left",
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 20,
          }}
          variant="outlined"
          size="small"
          onClick={this.props.goBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>{" "}
        <br />
        {this.state.attendance.length !== 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student name</th>
                <th>Supervisor</th>
                <th>Start Time</th>
                <th>Submit Time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.attendance.map((key) => {
                return (
                  <tr key={key.id}>
                    <td>
                      <Button
                        style={{ color: "blue" }}
                        onClick={() =>
                          this.setState({
                            student_id: key.id,
                            clicked: true,
                          })
                        }
                      >
                        {key.student_name}
                      </Button>
                    </td>
                    <td>{key.supervisor_name}</td>
                    <td>
                      {key.starttime !== null
                        ? new Date(key.enter_time.toString()).toString()
                        : "-"}
                    </td>
                    <td>
                      {key.submit_time !== null
                        ? new Date(key.submit_time.toString()).toString()
                        : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>{" "}
          </Table>
        ) : (
          <h1 style={{ textAlign: "center" }}>No records found!</h1>
        )}
      </div>
    ) : (
      <div>
        <ViewStudentAnswers
          student_id={this.state.student_id}
          exam_id={this.props.exam_id}
          goBack={this.goBack}
        />
      </div>
    );
  }
}
