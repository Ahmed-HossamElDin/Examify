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
import CreateQuestion from "../components/CreateQuestion";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import AddStudents from "../components/AddStudent";
import AddSupervisors from "../components/AddSupervisors";
import DoneIcon from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
var loading = false;
var dateError = false;
var timeError = false;
var timeToday = false;
var timeIf = false;
function validateDate(date) {
  let today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  let examStartDate = new Date(date);
  var selectedYear = examStartDate.getFullYear();
  var selectedMonth = examStartDate.getMonth() + 1;
  var selectedDay = examStartDate.getDate();
  if (selectedYear === year && selectedMonth === month && selectedDay === day) {
    timeToday = true;
    timeIf = true;
  } else {
    timeToday = false;
    timeIf = false;
    timeError = false;
  }

  if (selectedYear >= year) {
    if (selectedMonth >= month) {
      if (selectedDay >= day) {
        return false;
      }
    }
  }
  return true;
}
function validateTime(time) {
  let Time = new Date();
  var hour = Time.getHours();
  var minutes = Time.getMinutes();
  var selectedHour = time.getHours();
  var selectedMinutes = time.getMinutes();
  if (timeIf) {
    if (selectedHour >= hour) {
      if (selectedMinutes >= minutes) {
        timeToday = false;
        return false;
      }
    }
  } else {
    timeToday = false;
    return false;
  }
  timeToday = false;
  return true;
}
export default class CreateExam extends Component {
  componentDidMount() {
    loading = false;
    dateError = false;
    timeError = false;
    timeToday = false;
    timeIf = false;
    this.setState({
      date_time: this.state.date
        .concat("T")
        .substr(0, 11)
        .concat(this.state.time.toISOString().split("T")[1]),
      token: localStorage.getItem("ExamifyToken"),
    });
  }
  state = {
    date: new Date().toISOString().slice(0, 10),
    time: new Date(),
    date_time: "",
    exam_duration: "",
    exam_name: "exam_name",
    exam_id: null,
    disable: false,
    created: false,
    AddStudents: false,
    AddSupervisors: false,
    loading: false,
    token: "",
  };

  render() {
    const handleDateChange = (date) => {
      try {
        dateError = validateDate(date);
        if (
          this.state.date_time.includes("Z") &&
          this.state.date_time.includes("T")
        ) {
          this.setState({
            ...this.state,
            date: date,
            date_time:
              date.toISOString().substr(0, 11) +
              this.state.date_time.substring(11),
          });
        } else {
          this.setState({
            ...this.state,
            date: date,
            date_time: date.toISOString().substr(0, 11),
          });
        }
      } catch {}
    };
    const handleTimeChange = (time) => {
      try {
        timeError = validateTime(time);
        time = new Date(time);
        if (this.state.date_time.includes("Z")) {
          this.setState({
            ...this.state,
            time: time,
            date_time: this.state.date_time
              .substring(0, 11)
              .concat(time.toISOString().split("T")[1]),
          });
        } else {
          this.setState({
            ...this.state,
            time: time,
            date_time: this.state.date_time.concat(
              time.toISOString().split("T")[1]
            ),
          });
        }
      } catch {
        timeError = true;
        this.forceUpdate();
      }
    };
    const handleAddStudent = () => {
      this.setState({
        AddStudents: true,
      });
    };
    const handleAddSupervisors = () => {
      this.setState({
        AddSupervisors: true,
      });
    };
    const handleSubmit = () => {
      loading = true;
      this.setState({ loading: true }, handlePromise);
    };
    const handleDurationChange = (e) => {
      if (e.target.value > 5) {
        this.setState({
          exam_duration: 5,
        });
      } else {
        this.setState({
          exam_duration: e.target.value,
        });
      }
    };
    const handlePromise = () => {
      axios
        .post(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/`,
          {
            exam_name: this.state.exam_name,
            exam_startdate: this.state.date_time,
            exam_duration: this.state.exam_duration,
          },
          {
            headers: {
              Authorization: "Token " + this.state.token,
            },
          }
        )
        .then((res1) => {
          let id = res1.data.id;
          this.setState({
            exam_id: id,
            disable: true,
            created: true,
          });
        });
      loading = false;
    };
    const handleExamNameChange = (e) => {
      this.setState({
        exam_name: e.target.value,
      });
    };

    return (
      <div className="text-size-reset" style={{ textAlign: "center" }}>
        <TextField
          size="small"
          required
          id="ExamName"
          label="Exam name"
          onChange={handleExamNameChange}
          error={this.state.exam_name ? false : true}
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
            value={this.state.date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            error={dateError}
          />{" "}
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Pick the time"
            value={timeToday ? new Date() : this.state.time}
            onChange={handleTimeChange}
            required
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            error={timeError}
          />
        </MuiPickersUtilsProvider>{" "}
        <br />
        <TextField
          required
          id="standard-required"
          label="Duration in hours"
          onChange={handleDurationChange}
          value={this.state.exam_duration}
          error={isNaN(this.state.exam_duration)}
        />{" "}
        <Tooltip
          style={{ float: "bottom" }}
          title="Max duration for an Exam is 5 hours"
          interactive
        >
          <InfoOutlinedIcon />
        </Tooltip>
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
            this.state.exam_duration === "" ||
            dateError ||
            timeError
          }
          onClick={handleSubmit}
        >
          {loading
            ? "Creating exam..."
            : this.state.created
            ? "Exam created successfully"
            : "Create Exam"}
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={!this.state.created}
          startIcon={<AddIcon />}
          onClick={handleAddStudent}
        >
          Add allowed students
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={!this.state.created}
          startIcon={<AddIcon />}
          onClick={handleAddSupervisors}
        >
          Add supervisors
        </Button>
        {this.state.exam_id && (
          <CreateQuestion
            exam_id={this.state.exam_id}
            token={this.state.token}
          />
        )}{" "}
        {this.state.AddStudents && (
          <AddStudents exam_id={this.state.exam_id} token={this.state.token} />
        )}
        {this.state.AddSupervisors && (
          <AddSupervisors
            exam_id={this.state.exam_id}
            token={this.state.token}
          />
        )}
      </div>
    );
  }
}
