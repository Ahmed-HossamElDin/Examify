import React, { Component } from "react";
import Chip from "@material-ui/core/Chip";
import axios from "axios";

export default class StudentChip extends Component {
  render() {
    const handleDelete = () => {
      axios
        .delete(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/allowed-students/${this.props.info.student_id}/`,
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((res) => {
          console.log(this.props.info);
          this.props.callBack();
        });
    };
    return (
      <div>
        {console.log(this.props)}
        <Chip
          style={{ float: "left" }}
          label={this.props.info.student_name}
          clickable
          onDelete={handleDelete}
        />{" "}
      </div>
    );
  }
}
