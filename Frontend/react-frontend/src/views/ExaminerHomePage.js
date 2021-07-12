import React, { Component } from "react";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import ViewStatistics from "../components/ViewStatistics";

export default class ExaminerHomePage extends Component {
  state = { loading: false, exam_id: 0, token: "" };
  componentDidMount() {
    this.setState(
      { loading: true, token: localStorage.getItem("ExamifyToken") },
      () =>
        axios
          .get(
            `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/most-recent-exam/`,
            {
              headers: {
                Authorization: "Token " + this.state.token,
              },
            }
          )
          .then((res) => {
            if (res.data !== "") {
              this.setState({ exam_id: res.data.id, loading: false });
            } else {
              this.setState({ loading: false });
            }
          })
    );
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <LinearProgress />
        ) : this.state.exam_id === "" || this.state.exam_id === 0 ? (
          <div>
            <h1>There is no statistics to show</h1>
          </div>
        ) : (
          <ViewStatistics token={this.state.token} id={this.state.exam_id} />
        )}
      </div>
    );
  }
}
