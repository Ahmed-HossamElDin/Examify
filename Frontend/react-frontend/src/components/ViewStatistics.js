import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LinearProgress from "@material-ui/core/LinearProgress";
import Jumbotron from "react-bootstrap/Jumbotron";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";

import ChartistGraph from "react-chartist";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import Timeline from "@material-ui/icons/Timeline";

import GridItem from "../components/Grid/GridItem.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";

import styles from "../js/chartsStyle.js";

import "../css/chartist.scss";

const useStyles = makeStyles(styles);

const pieChart = {
  data: {
    labels: ["35%", "25%", "20%", "15%", "5%"],
    series: [5, 4, 3, 2, 1],
  },
  options: {
    height: "300px",
  },
};

function getGrades(gradeData, totalMark) {
  var ACount = 0;
  var BCount = 0;
  var CCount = 0;
  var DCount = 0;
  var FCount = 0;

  for (var grade in gradeData) {
    if (gradeData[grade].mark >= 0.9 * totalMark) {
      ACount++;
    } else if (gradeData[grade].mark >= 0.8 * totalMark) {
      BCount++;
    } else if (gradeData[grade].mark >= 0.7 * totalMark) {
      CCount++;
    } else if (gradeData[grade].mark >= 0.5 * totalMark) {
      DCount++;
    } else {
      FCount++;
    }
  }

  var ALabel = ((ACount / gradeData.length) * 100).toString() + "%";
  var BLabel = ((BCount / gradeData.length) * 100).toString() + "%";
  var CLabel = ((CCount / gradeData.length) * 100).toString() + "%";
  var DLabel = ((DCount / gradeData.length) * 100).toString() + "%";
  var FLabel = ((FCount / gradeData.length) * 100).toString() + "%";

  var gradeLabels = [ALabel, BLabel, CLabel, DLabel, FLabel];

  for (var item in gradeLabels) {
    if (gradeLabels[item] === "0%") {
      gradeLabels[item] = " ";
    }
  }

  return {
    labels: gradeLabels,
    series: [ACount, BCount, CCount, DCount, FCount],
  };
}

class ViewStatistics extends Component {
  state = {
    exam_stats: [],
    loading: false,
    exam_statistics: [],
    question_stats: {},
    marks: [],
    marksExist: false,
  };
  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      () => {
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
            this.setState(
              {
                exam_stats: res.data[0],
                exam_statistics: res.data[0].exam_statistics,
                question_stats: res.data[1],
                loading: false,
              },
              () =>
                axios
                  .get(
                    `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.id}/marks/`,
                    {
                      headers: {
                        Authorization: "Token " + this.props.token,
                      },
                    }
                  )
                  .then((res) => {
                    var tempMarks = [];
                    for (var mark in this.state.marks) {
                      tempMarks.push(mark.mark);
                    }
                    this.setState({
                      marks: res.data,
                    });
                    if (this.state.marks.length > 0) {
                      pieChart.data = getGrades(
                        this.state.marks,
                        this.state.exam_stats.total_mark
                      );

                      this.setState({
                        marksExist: true,
                      });
                    }
                  })
            );
          })
          .catch(() => {
            this.setState({
              loading: false,
            });
          });
      }
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
              {this.state.exam_statistics.avg !== null &&
              this.state.exam_statistics.avg !== undefined
                ? " " + this.state.exam_statistics.avg + " "
                : " 0"}{" "}
              Max Mark:
              {this.state.exam_statistics.max !== null &&
              this.state.exam_statistics.max !== undefined
                ? " " + this.state.exam_statistics.max + " "
                : " 0"}{" "}
              Min Mark:
              {this.state.exam_statistics.min !== null &&
              this.state.exam_statistics.min !== undefined
                ? " " + this.state.exam_statistics.min + " "
                : " 0"}{" "}
              Number of Submits:{" "}
              {this.state.exam_statistics.num_of_students_submited_the_exam !==
                null &&
              this.state.exam_statistics.num_of_students_submited_the_exam !==
                undefined
                ? " " +
                  this.state.exam_statistics.num_of_students_submited_the_exam +
                  " "
                : " 0"}
            </p>
          </Jumbotron>
        </div>{" "}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.state.marksExist && (
              <GridItem xs={12} sm={12} md={5}>
                <Card>
                  <CardHeader color="danger" icon>
                    <CardIcon color="danger">
                      <Timeline />
                    </CardIcon>
                    <h4 className={useStyles.cardIconTitle}>
                      Grades percentages
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <ChartistGraph
                      data={pieChart.data}
                      type="Pie"
                      options={pieChart.options}
                    />
                  </CardBody>
                  <CardFooter stats className={useStyles.cardFooter}>
                    <i
                      className={"fas fa-circle "}
                      style={{ color: "#00bcd4" }}
                    />
                    A{` `}
                    <i
                      className={"fas fa-circle "}
                      style={{ color: "#f05b4f" }}
                    />
                    B{` `}
                    <i
                      className={"fas fa-circle "}
                      style={{ color: "#f4c63d" }}
                    />
                    C{` `}
                    <i
                      className={"fas fa-circle "}
                      style={{ color: "#d17905" }}
                    />
                    D{` `}
                    <i
                      className={"fas fa-circle "}
                      style={{ color: "#453d3f" }}
                    />
                    F{` `}
                  </CardFooter>
                </Card>
              </GridItem>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
            }}
          ></div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Individual questions statistics</h1>
          </div>
          {Object.keys(this.state.question_stats).map((key) => {
            return (
              <div
                style={{
                  float: "left",
                  direction: "flex",
                  marginRight: 2,
                  marginTop: 5,
                  borderStyle: "solid",
                  borderRadius: 15,
                  maxWidth: 300,
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
                        {"Question Answer: " +
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
                              (this.state.question_stats[key].wrong_count +
                                this.state.question_stats[key].correct_count)
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
                              (this.state.question_stats[key].wrong_count +
                                this.state.question_stats[key].correct_count)) /
                              this.state.exam_statistics
                                .num_of_students_submited_the_exam) *
                            100
                          }
                          label={
                            ((this.state.exam_statistics
                              .num_of_students_submited_the_exam -
                              (this.state.question_stats[key].wrong_count +
                                this.state.question_stats[key].correct_count)) /
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
                          Correct answers
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
                          Incorrect answers
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

export default withStyles(useStyles)(ViewStatistics);
