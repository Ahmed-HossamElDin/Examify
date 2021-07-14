import React, { Component } from "react";
import axios from "axios";
import StudentChip from "./StudentChip";
import AddStudent from "./AddStudent";
export default class EditStudent extends Component {
  state = { allowedStudents: [] };
  componentDidMount() {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/allowed-students/`,
        {
          headers: {
            Authorization: "Token " + this.props.token,
          },
        }
      )
      .then((res) => {
        this.setState({
          allowedStudents: res.data.student,
        });
      });
  }
  render() {
    const refreshComponent = () => {
      this.forceUpdate();
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/allowed-students/`,
          {
            headers: {
              Authorization: "Token " + this.props.token,
            },
          }
        )
        .then((res) => {
          this.setState({ allowedStudents: res.data.student });
        });
    };
    return (
      <div>
        <br />
        <h3
          style={{ fontSize: "20px", fontFamily: "Century Gothic,Lucida Sans" }}
        >
          Edit Allowed Students{" "}
        </h3>
        <br />{" "}
        {this.state.allowedStudents.length !== 0 ? (
          <div>
            {this.state.allowedStudents.map((key) => (
              <div style={{ marginLeft: "auto" }}>
                <StudentChip
                  token={this.props.token}
                  exam_id={this.props.exam_id}
                  info={key}
                  callBack={refreshComponent}
                />
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
        <AddStudent
          callBack={refreshComponent}
          exam_id={this.props.exam_id}
          token={this.props.token}
        />
      </div>
    );
  }
}
