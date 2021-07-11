import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { LinearProgress } from "@material-ui/core";
import Table from "react-bootstrap/Table";
var finalMarks = [];
var exportex = [];
const columns = [
  {
    field: "student_name",
    headerName: "Student username",
    width: 170,
    backgroundColor: "#376331",
  },
  {
    field: "supervisor_name",
    headerName: "Supervisor name",
    width: 200,
  },

  {
    field: "enter_time",
    headerName: "Enter time",
    width: 180,
    type: "dateTime",
  },
  {
    field: "submit_time",
    headerName: "Submit time",
    width: 180,
    type: "dateTime",
  },
];
const supervisors = [
  {
    field: "supervisor_name",
    headerName: "Supervisor name",
    width: 200,
    backgroundColor: "#376331",
  },
  {
    field: "students",
    headerName: "Assigned Student",
    width: 400,
  },
];
const marks = [
  {
    field: "student_name",
    headerName: "Student username",
    width: 170,
    backgroundColor: "#376331",
  },
  {
    field: "mark",
    headerName: "Mark",
    width: 200,
    type: "number",
  },
];

export default class ViewExamInfo extends Component {
  handleGetAttendance() {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/attendance/`,
        {
          headers: {
            Authorization: "Token " + this.props.token,
          },
        }
      )
      .then((res) => {
        this.setState({ attendance: res.data });
      });
  }
  handleViewStudent() {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/allowed-students/`,
        {
          headers: {
            Authorization: "Token " + this.props.token,
          },
        }
      )
      .then((res) => {
        this.setState({ students: res.data.student.sort() });
      });
  }
  handleViewSupervisors() {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/supervisors/`,
        {
          headers: {
            Authorization: "Token " + this.props.token,
          },
        }
      )
      .then((res) => {
        this.setState({ supervisors: res.data });
      });
  }

  handleGetMarks() {
    this.setState({ loading: true }, () =>
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/marks/`,
          {
            headers: {
              Authorization: "Token " + this.props.token,
            },
          }
        )
        .then((res) => {
          this.setState({ marks: res.data, loading: false });

          finalMarks = res.data;
          finalMarks = finalMarks.map((key) => {
            delete key.id;
            exportex.push(key);
          });
        })
    );
  }
  handleGetViolation = () => {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/violations/`,
        {
          headers: {
            Authorization: "Token " + this.props.token,
          },
        }
      )
      .then((res) => {
        this.setState({ violations: res.data });
      });
  };
  componentDidMount() {
    this.handleViewStudent();
    this.handleViewSupervisors();
    this.handleGetAttendance();
    this.handleGetViolation();
    this.handleGetMarks();
  }
  state = {
    id: this.props.id,
    exam: [],
    mountComponent: false,
    attendance: [],
    students: [],
    supervisors: [],
    marks: [],
    clicked: false,
    loading: false,
    violations: {
      id: 0,
      exam_name: "",
      violations: [],
    },
  };
  render() {
    let rows = this.state.attendance;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].enter_time !== null && rows[i].submit_time === null) {
        rows[i].enter_time = new Date(rows[i].enter_time.toString());
      } else if (rows[i].enter_time === null && rows[i].submit_time !== null) {
        rows[i].submit_time = new Date(rows[i].submit_time.toString());
      } else if (rows[i].enter_time !== null && rows[i].submit_time !== null) {
        rows[i].enter_time = new Date(rows[i].enter_time.toString());
        rows[i].submit_time = new Date(rows[i].submit_time.toString());
      }
    }
    return (
      <div>
        <Button
          style={{ float: "left" }}
          variant="outlined"
          size="small"
          onClick={this.props.goBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>

        <CardContent>
          <br />
          {this.state.loading === true ? <LinearProgress /> : <div></div>}
          {this.state.clicked === false ? (
            <div>
              {" "}
              {this.state.students.length > 0 ? (
                <div>
                  <br />
                  {/*  <Alert severity="info"> </Alert>*/}
                  Allowed Students: {this.state.students.length} <hr />
                  <TextField
                    id="outlined-multiline-static"
                    label="Allowed Students"
                    multiline
                    rowsMax={this.state.students.length}
                    variant="outlined"
                    fullWidth
                    size="medium"
                    value={this.state.students.join(", ")}
                  />{" "}
                  <br />
                </div>
              ) : this.state.loading ? (
                <div></div>
              ) : (
                <div>
                  {" "}
                  <br />
                  <Alert severity="info">
                    This Exam Doesn't have any students!{" "}
                  </Alert>
                </div>
              )}
              {this.state.attendance.length > 0 ? (
                <div>
                  {" "}
                  <br />
                  Attendance Sheet <hr />
                  <div style={{ height: 300, width: 735 }}>
                    {" "}
                    <DataGrid
                      rows={this.state.attendance}
                      columns={columns}
                      pageSize={10}
                    />
                  </div>{" "}
                </div>
              ) : this.state.loading ? (
                <div></div>
              ) : (
                <div>
                  {" "}
                  <br />
                  <Alert severity="info">This Exam Doesn't come yet! </Alert>
                </div>
              )}{" "}
              {this.state.marks.length > 0 ? (
                <div>
                  <div style={{ marginTop: 20, marginBottom: 20 }}>
                    Students Marks <hr />
                  </div>{" "}
                  <div style={{ height: 300, width: 735 }}>
                    <DataGrid
                      rows={this.state.marks}
                      columns={marks}
                      pageSize={10}
                    />
                    <br />
                  </div>
                </div>
              ) : this.state.loading ? (
                <div></div>
              ) : (
                <div>
                  {" "}
                  <br />
                  <Alert severity="info">
                    This Exam Doesn't have any marks!{" "}
                  </Alert>
                </div>
              )}{" "}
              {this.state.supervisors.length > 0 ? (
                <div style={{ height: 500, width: 700 }}>
                  <div style={{ marginTop: 20, marginBottom: 20 }}>
                    Assigned Supervisors
                    <hr />
                  </div>
                  <div style={{ height: 300, width: 735 }}>
                    <DataGrid
                      rows={this.state.supervisors}
                      columns={supervisors}
                      pageSize={10}
                    />
                  </div>
                </div>
              ) : this.state.loading ? (
                <div></div>
              ) : (
                <div>
                  {" "}
                  <br />
                  <Alert severity="info">
                    This Exam Doesn't have any supervisors!{" "}
                  </Alert>
                </div>
              )}
              {this.state.violations.violations.length > 0 &&
              this.state.loading !== true ? (
                <div
                  style={{
                    marginTop: -130,
                    height: 500,
                    width: 700,
                  }}
                >
                  {console.log(this.state.violations)}
                  <div style={{ marginTop: 20, marginBottom: 20 }}>
                    Reported Violations
                    <hr />
                  </div>
                  <div style={{ height: 300, width: 735 }}>
                    {" "}
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Student Name</th>
                          <th>Violation</th>
                          <th>Supervisor</th>
                          <th>Time of violation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.violations.violations.map((key) => {
                          return (
                            <tr key={key.id}>
                              <td>{key.student}</td>
                              <td>{key.violation}</td>
                              <td>{key.supervisor}</td>
                              <td>{key.time.substr(0, 19)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : this.state.loading ? (
                <div></div>
              ) : (
                <div>
                  {" "}
                  <br />
                  <Alert severity="info">
                    This Exam Doesn't have any violations!{" "}
                  </Alert>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </CardContent>
      </div>
    );
  }
}
