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
import CreateQuestion from "./CreateQuestion";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import AddStudents from "./AddStudent";
import AddSupervisors from "./AddSupervisors";

export default class CreateExam extends Component {
  state = {
    date: new Date().toISOString().slice(0, 10),
    time: new Date(),
    date_time: "",
    exam_duration: 0,
    exam_name: "exam_name",
    exam_id: null,
    loading: false,
    disable: false,
    created: false,
    AddStudents: false,
    AddSupervisors: false,
  };
  render() {
    const handleDateChange = (date) => {
      this.setState({
        ...this.state,
        date: date,
        date_time: date.toISOString().substr(0, 11),
      });
    };
    const handleTimeChange = (time) => {
      time = new Date(time);
      this.setState({
        ...this.state,
        time: time,
        date_time: this.state.date_time.concat(
          time.toISOString().split("T")[1]
        ),
      });
    };
    const handleAddStudent = () => {
      this.setState({
        ...this.state,
        AddStudents: true,
      });
    };
    const handleAddSupervisors = () => {
      this.setState({
        ...this.state,
        AddSupervisors: true,
      });
    };
    const handleSubmit = () => {
      this.setState({
        ...this.state,
        loading: true,
      });
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
            ...this.state,
            exam_id: id,
            loading: false,
            disable: true,
            created: true,
          });
        })
        .catch(
          this.setState({
            ...this.state,
            loading: false,
          })
        );
    };
    const handleDurationChange = (e) => {
      this.setState({
        ...this.state,
        exam_duration: e.target.value,
        date_time: this.state.date
          .concat("T")
          .substr(0, 11)
          .concat(this.state.time.toISOString().split("T")[1]),
      });
    };
    const handleExamNameChange = (e) => {
      this.setState({
        ...this.state,
        exam_name: e.target.value,
      });
    };

    return (
      <div>
        <TextField
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
          />{" "}
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Pick the time"
            value={this.state.time}
            onChange={handleTimeChange}
            required
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </MuiPickersUtilsProvider>{" "}
        <br />
        <TextField
          required
          id="standard-required"
          label="Duration in hours"
          onChange={handleDurationChange}
          error={isNaN(this.state.exam_duration)}
        />
        <br /> <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={
            this.state.loading ? (
              <CircularProgress size={20} color="secondary" />
            ) : (
              <SaveIcon />
            )
          }
          disabled={
            this.state.loading ||
            this.state.disable ||
            isNaN(this.state.exam_duration) ||
            this.state.exam_duration === 0 ||
            this.state.exam_name === "exam_name" ||
            this.state.exam_name === "exam_name"
          }
          onClick={handleSubmit}
        >
          {this.state.loading ? "Creating exam..." : "Create Exam"}
        </Button>
        {this.state.exam_id && (
          <CreateQuestion
            exam_id={this.state.exam_id}
            token={this.state.token}
          />
        )}{" "}
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
