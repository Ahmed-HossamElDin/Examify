import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default class ViewStudentAnswers extends Component {
  state = { questions: [], loading: false, token: "" };
  componentDidMount() {
    this.setState(
      { loading: true, token: localStorage.getItem("ExamifyToken") },
      () =>
        axios
          .get(
            `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/student/${this.props.student_id}/`,
            {
              headers: {
                Authorization: "Token " + this.state.token,
              },
            }
          )
          .then((res) => {
            this.setState({
              questions: res.data,
              loading: false,
            });
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
    ) : (
      <div>
        <div>
          {console.log(this.state.questions.length)}
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
          </Button>
          <br />
          {this.state.questions.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Student's answer</th>
                  <th>Answer is correct</th>
                </tr>
              </thead>
              <tbody>
                {this.state.questions.map((key) => {
                  return (
                    <tr>
                      <td>{key.question_text}</td>
                      <td>{key.answer_text}</td>
                      <td>{key.is_correct.toString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h1 style={{ textAlign: "center" }}>No Answered questions!</h1>
          )}
        </div>
      </div>
    );
  }
}
