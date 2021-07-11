import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LinearProgress from "@material-ui/core/LinearProgress";
import Jumbotron from "react-bootstrap/Jumbotron";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
export default class ViewStatistics extends Component {
  state = {
    exam_stats: [],
    loading: false,
    exam_statistics: [],
    question_stats: {},
  };
  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      () =>
        axios
          .get(
            `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.id}/statistics/`,
            {
              headers: {
                Authorization: "Token " + this.props.token,
              },
            }
          )
          .then((res) => {
            this.setState({
              exam_stats: res.data[0],
              exam_statistics: res.data[0].exam_statistics,
              question_stats: res.data[1],
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
  render() {
    return this.state.loading === true ? (
      <LinearProgress />
    ) : (
      <div>
        <div>
          {this.props.goBack && (
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
          )}
        </div>{" "}
        <div
          style={{
            textAlign: "center",
            fontFamily: "Arial",
          }}
        >
          <Jumbotron>
            <h1>{this.state.exam_stats.name} Exam</h1>
            <p>
              Total Mark: {this.state.exam_stats.total_mark} <br />
              Average:{" "}
              {this.state.exam_statistics.avg !== null
                ? " " + this.state.exam_statistics.avg + " "
                : "0"}{" "}
              Max Mark:
              {this.state.exam_statistics.max !== null
                ? " " + this.state.exam_statistics.max + " "
                : "0"}{" "}
              Min Mark:
              {this.state.exam_statistics.min !== null
                ? " " + this.state.exam_statistics.min + " "
                : "0"}{" "}
              Number of Submits:{" "}
              {this.state.exam_statistics.num_of_students_submited_the_exam !==
              null
                ? " " +
                  this.state.exam_statistics.num_of_students_submited_the_exam +
                  " "
                : "0"}
            </p>
          </Jumbotron>
        </div>{" "}
        <div>
          {Object.keys(this.state.question_stats).map((key) => {
            return (
              <div
                style={{
                  float: "left",
                  direction: "flex",
                  marginRight: 5,
                  marginTop: 5,
                  borderStyle: "solid",
                  borderRadius: 15,
                }}
                key={key}
              >
                <div
                  style={{
                    marginLeft: 20,
                    marginTop: 20,
                    marginBottom: 20,
                    marginRight: 20,
                  }}
                >
                  <Card bg={"Light"}>
                    <Card.Header>
                      {parseInt(key) +
                        1 +
                        ". " +
                        this.state.question_stats[key].text +
                        " "}
                      <hr />
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>
                        {"Correct Answer: " +
                          this.state.question_stats[key].correct_answer +
                          " "}
                      </Card.Title>
                      <Card.Text>
                        {"Correct Answers count: " +
                          this.state.question_stats[key].correct_count +
                          " student(s)"}
                        <br />
                        {"Incorrect Answers count: " +
                          this.state.question_stats[key].wrong_count +
                          " student(s)"}
                        <br />
                        {"Unanswered count: " +
                          parseInt(
                            this.state.exam_statistics
                              .num_of_students_submited_the_exam -
                              this.state.question_stats[key].wrong_count +
                              this.state.question_stats[key].correct_count
                          ) +
                          " student(s)"}{" "}
                      </Card.Text>
                      <ProgressBar>
                        <ProgressBar
                          striped
                          style={{ backgroundColor: (0, 128, 255) }}
                          now={
                            (this.state.question_stats[key].correct_count /
                              this.state.exam_statistics
                                .num_of_students_submited_the_exam) *
                            100
                          }
                          label={
                            (this.state.question_stats[key].correct_count /
                              this.state.exam_statistics
                                .num_of_students_submited_the_exam) *
                              100 +
                            "%"
                          }
                        />
                        <ProgressBar
                          striped
                          style={{
                            backgroundColor: "#CC0000",
                          }}
                          now={
                            (this.state.question_stats[key].wrong_count /
                              this.state.exam_statistics
                                .num_of_students_submited_the_exam) *
                            100
                          }
                          label={
                            (this.state.question_stats[key].wrong_count /
                              this.state.exam_statistics
                                .num_of_students_submited_the_exam) *
                              100 +
                            "%"
                          }
                        />{" "}
                        <ProgressBar
                          striped
                          style={{
                            backgroundColor: "#CCCC00",
                          }}
                          now={
                            ((this.state.exam_statistics
                              .num_of_students_submited_the_exam -
                              this.state.question_stats[key].wrong_count +
                              this.state.question_stats[key].correct_count) /
                              this.state.exam_statistics
                                .num_of_students_submited_the_exam) *
                            100
                          }
                          label={
                            (this.state.question_stats[key].wrong_count /
                              this.state.exam_statistics
                                .num_of_students_submited_the_exam) *
                              100 +
                            "%"
                          }
                        />{" "}
                      </ProgressBar>{" "}
                      <Card>
                        {" "}
                        <div
                          style={{
                            float: "right",
                            marginRight: "22%",
                          }}
                        >
                          Correct answer
                        </div>
                        <ProgressBar style={{ width: 50 }}>
                          <ProgressBar
                            striped
                            style={{
                              backgroundColor: (0, 128, 255),
                            }}
                            now={100}
                          />
                        </ProgressBar>{" "}
                        <div
                          style={{
                            float: "right",
                            marginRight: "18%",
                            textAlign: "center",
                          }}
                        >
                          Incorrect answer
                        </div>
                        <ProgressBar style={{ width: 50 }}>
                          <ProgressBar
                            striped
                            style={{
                              backgroundColor: "#CC0000",
                            }}
                            now={100}
                          />{" "}
                        </ProgressBar>{" "}
                        <div
                          style={{
                            float: "right",
                            marginRight: "30%",
                            textAlign: "center",
                          }}
                        >
                          Unanswered
                        </div>
                        <ProgressBar style={{ width: 50 }}>
                          <ProgressBar
                            striped
                            style={{
                              backgroundColor: "#CCCC00",
                            }}
                            now={100}
                          />{" "}
                        </ProgressBar>{" "}
                      </Card>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            );
          })}{" "}
        </div>
      </div>
    );
  }
}
