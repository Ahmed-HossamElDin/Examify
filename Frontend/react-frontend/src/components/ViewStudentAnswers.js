import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import Table from "react-bootstrap/Table";

var questions = [
  {
    student_name: "student 1",
    student: 41,
    exam: 13,
    exam_name: "Movies",
    question: 18,
    question_text: "how old are you now wrong new?",
    answer: 12,
    answer_text: "Joe Fox",
    is_correct: true,
  },
  {
    student_name: "student 1",
    student: 41,
    exam: 13,
    exam_name: "Movies",
    question: 19,
    question_text: "how old are you now wrong new?",
    answer: 17,
    answer_text: "Sansa Stark",
    is_correct: true,
  },
  {
    student_name: "student 1",
    student: 41,
    exam: 13,
    exam_name: "Movies",
    question: 20,
    question_text: "how old are you now wrong new?",
    answer: 20,
    answer_text: "Chuck Noland",
    is_correct: true,
  },
];
export default class ViewStudentAnswers extends Component {
  state = { questions: [] };
  componentDidMount() {
    this.setState({ loading: true }, () =>
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/student/${this.props.student_id}/`,
          {
            headers: {
              Authorization: "Token 8a747b9ad8b7fb01d30c0ae0033e7951bb7ae939",
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
      </div>
    );
  }
}
