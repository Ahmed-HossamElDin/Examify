import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import DoneIcon from "@material-ui/icons/Done";
import Question from "./Question";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import CreateQuestion from "./CreateQuestion";
import AddStudent from "./AddStudent";
import EditSupervisors from "./EditSupervisors";
import AddIcon from "@material-ui/icons/Add";

var loading = false;
var counter = 0;
var updated = false;
var clicked = false;
var editAllowedStudents = false;
var editSupervisors = false;
var addNewQuestionvar = false;
export default class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      date_time: props.exam["startdate"],
      exam_duration: props.exam["duration"],
      exam_name: props.exam["exam"],
      exam_id: props.exam["id"],
    };
  }
  componentDidMount() {
    loading = false;
    counter = 0;
    updated = false;
    clicked = false;
    editAllowedStudents = false;
    editSupervisors = false;
    addNewQuestionvar = false;
    this.setState({
      questions: [],
    });
  }
  componentDidUpdate() {
    counter = 0;
  }
  state = {
    date: new Date().toISOString().slice(0, 10),
    time: new Date(),
    date_time: "",
    exam_duration: 0,
    exam_name: "exam_name",
    exam_id: null,
    disable: false,
    created: false,
    AddStudents: false,
    AddSupervisors: false,
    loading: false,
    questions: [],
    addNewQuestionvar: false,
  };
  render() {
    const handleDurationChange = (e) => {
      this.setState({
        exam_duration: e.target.value,
      });
    };
    const handleExamNameChange = (e) => {
      this.setState({
        exam_name: e.target.value,
      });
    };
    const handleDateChange = (date) => {
      try {
        this.setState({
          ...this.state,
          date: date,
          date_time:
            date.toISOString().substr(0, 11) +
            this.state.date_time.toString().substring(11),
        });
      } catch {}
    };
    const handleTimeChange = (time) => {
      try {
        time = new Date(time);
        this.setState({
          ...this.state,
          time: time,
          date_time: this.state.date_time
            .substring(0, 11)
            .concat(time.toISOString().split("T")[1]),
        });
      } catch {}
    };
    const deleteQuestion = (question_id) => {
      var deleted = false;
      axios
        .delete(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam.id}/question/${question_id}/`,
          {
            headers: {
              Authorization: "Token " + this.props.token,
            },
          }
        )
        .then((deleted = true));
      return deleted;
    };
    const getQuestions = () => {
      counter = 0;
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam.id}/`,
          {
            headers: {
              Authorization: "Token " + this.props.token,
            },
          }
        )
        .then((res) => {
          console.log(res.data.questions, "sdsdsdsdsdsdsd");

          this.setState({ questions: res.data.questions });
        });
      clicked = true;
    };
    const updateExam = () => {
      axios
        .patch(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam.id}/`,
          {
            id: this.props.exam.id,
            exam: this.state.exam_name,
            startdate: this.state.date_time,
            duration: this.state.exam_duration,
          },
          {
            headers: {
              Authorization: "Token " + this.props.token,
            },
          }
        )
        .then((updated = true), this.forceUpdate());
    };
    const ShowAddStudent = () => {
      editAllowedStudents = true;
      counter = 0;
      this.forceUpdate();
    };
    const ShowEditSupervisor = () => {
      editSupervisors = true;
      this.forceUpdate();
    };
    const addNewQuestion = () => {
      this.setState({ addNewQuestionvar: true });
    };
    return (
      <div style={{ textAlign: "center" }}>
        {updated && (
          <Alert severity="success">Exam updated successfully!</Alert>
        )}
        <TextField
          size="small"
          required
          id="ExamName"
          label="Exam name"
          value={this.state.exam_name}
          error={this.state.exam_name ? false : true}
          onChange={handleExamNameChange}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <br />{" "}
          <KeyboardDatePicker
            required
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Pick the date"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={this.state.date_time}
            onChange={handleDateChange}
          />{" "}
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Pick the time"
            value={this.state.date_time}
            required
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            onChange={handleTimeChange}
          />
        </MuiPickersUtilsProvider>{" "}
        <br />
        <TextField
          required
          id="standard-required"
          label="Duration in hours"
          error={isNaN(this.state.exam_duration)}
          value={this.state.exam_duration}
          onChange={handleDurationChange}
        />
        <br /> <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={
            loading ? (
              <CircularProgress size={20} color="secondary" />
            ) : this.state.created ? (
              <DoneIcon />
            ) : (
              <SaveIcon />
            )
          }
          disabled={
            loading ||
            this.state.disable ||
            isNaN(this.state.exam_duration) ||
            this.state.exam_duration === 0 ||
            this.state.exam_name === "exam_name" ||
            this.state.exam_name === "" ||
            this.state.exam_duration === ""
          }
          onClick={updateExam}
        >
          {loading
            ? "Updating exam..."
            : this.state.created
            ? "Updated successfully"
            : "Update Exam"}
        </Button>{" "}
        <Button
          startIcon={<VisibilityIcon />}
          variant="contained"
          color="primary"
          size="small"
          onClick={getQuestions}
        >
          Show Questions
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          onClick={ShowAddStudent}
        >
          Edit allowed students
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          onClick={ShowEditSupervisor}
        >
          Edit supervisors
        </Button>
        {this.state.questions.length > 0 ? (
          this.state.questions.map((question) => {
            counter = counter + 1;
            console.log(question, "THE QUESTION");
            return (
              <Question
                key={counter}
                question={question}
                counter={counter}
                token={this.props.token}
                deleteQuestion={deleteQuestion}
                exam_id={this.props.exam.id}
              />
            );
          })
        ) : clicked === true ? (
          <div>
            <br />
            <Alert severity="info">
              This Exam Doesn't have any questions!{" "}
            </Alert>
            <CreateQuestion
              exam_id={this.props.exam.id}
              token={this.props.token}
            />
          </div>
        ) : (
          <div></div>
        )}
        {clicked && (
          <div>
            <br />
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={addNewQuestion}
            >
              Add a new Question
            </Button>
          </div>
        )}
        {this.state.addNewQuestionvar === true ? (
          <CreateQuestion
            counter={counter + 1}
            token={this.props.token}
            exam_id={this.props.exam.id}
            callBacl={getQuestions}
          />
        ) : (
          <div></div>
        )}
        {editAllowedStudents && (
          <AddStudent
            edit={true}
            exam_id={this.props.exam.id}
            token={this.props.token}
          />
        )}{" "}
        {editSupervisors && (
          <EditSupervisors
            exam_id={this.props.exam.id}
            token={this.props.token}
          />
        )}
      </div>
    );
  }
}
