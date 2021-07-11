import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { ExcelRenderer } from "react-excel-renderer";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import EditStudent from "./EditStudent";

var success = false;
var help =
  "Correct format is : student1,student2,student3 or student1 student2 student3 or by sperating them by new lines";
export default class AddStudents extends Component {
  state = {
    allowedStudents: [],
    loading: false,
    token: "",
    exam_id: "",
    error: "",
    manually: 0,
    upload: 0,
    selectedFile: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      exam_id: props.exam_id,
      token: props.token,
    };
  }
  render() {
    const handleAddStudents = (e) => {
      this.setState({
        ...this.state,
        allowedStudents: e.target.value,
      });
    };
    const handleAllowedStudentsArray = () => {
      if (this.state.allowedStudents.includes(",")) {
        this.setState(
          {
            ...this.state,
            allowedStudents: this.state.allowedStudents
              .replace(/,/g, " ")
              .trim()
              .split(" "),
          },
          handleSubmit
        );
      } else if (this.state.allowedStudents.includes(" ")) {
        this.setState(
          {
            ...this.state,
            allowedStudents: this.state.allowedStudents
              .replace(/\s+/g, " ")
              .trim()
              .split(" "),
          },
          handleSubmit
        );
      } else if (this.state.allowedStudents.includes("\n")) {
        console.log(
          "sadsadsadsa",
          this.state.allowedStudents
            .replace(/\n/g, " ")
            .trim()
            .split(" ")
        );
        this.setState(
          {
            ...this.state,
            allowedStudents: this.state.allowedStudents
              .replace(/\n/g, " ")
              .trim()
              .split(" "),
          },
          handleSubmit
        );
      } else {
        success = false;
        this.setState({
          ...this.state,
          error: `Incorrect format, plz follow the required format`,
          loading: false,
        });
      }
    };
    const handleSubmit = () => {
      this.setState(
        {
          ...this.state,
          loading: true,
        },
        handleAllowedStudentsArray()
      );

      axios
        .post(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.exam_id}/allowed-students/`,
          {
            students: this.state.allowedStudents,
          },
          {
            headers: { Authorization: "Token " + this.state.token },
          }
        )
        .then((res) => {
          success = true;
          this.setState({ ...this.state, loading: false });
          if (this.props.callBack !== null) this.props.callBack();
        })
        .catch(() => {
          this.setState({
            ...this.state,
            error: `Error adding students!`,
            loading: false,
          });
        });
    };
    const enterManually = () => {
      this.setState({
        manually: 1,
        upload: 0,
      });
    };
    const uploadFile = () => {
      this.setState({
        upload: 1,
        manually: 0,
      });
    };
    const getData = () => {
      let result = [];
      ExcelRenderer(this.state.selectedFile, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          resp.rows.map((student) => result.push(student[0]));
          this.setState({
            allowedStudents: result,
          });
        }
      });
    };
    const fileHandler = (event) => {
      this.setState(
        {
          selectedFile: event.target.files[0],
        },
        getData
      );
    };

    return (
      <div>
        {this.props.edit && (
          <div>
            <EditStudent
              token={this.state.token}
              exam_id={this.state.exam_id}
            />{" "}
          </div>
        )}
        <br /> <br />
        <h3
          style={{ fontSize: "20px", fontFamily: "Century Gothic,Lucida Sans" }}
        >
          Add Allowed Students
        </h3>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={enterManually}>Enter students manually</Button>
          <Button onClick={uploadFile}>Upload an excel file</Button>
        </ButtonGroup>{" "}
        {success === true && this.state.loading === false ? (
          <div>
            {" "}
            <br />
            <Alert severity="success">Students added successfully! </Alert>
          </div>
        ) : this.state.error !== "" ? (
          <div>
            {" "}
            <br />
            <Alert severity="error">
              {" "}
              {this.state.error}{" "}
              <Tooltip title={help} interactive>
                <HelpOutlineOutlinedIcon />
              </Tooltip>
            </Alert>
          </div>
        ) : (
          <div></div>
        )}{" "}
        {this.state.manually === 1 ? (
          <div>
            <br />
            <TextField
              id="outlined-multiline-static"
              label="Add allowed Students"
              multiline
              rowsMax={this.state.allowedStudents.length}
              variant="outlined"
              onChange={handleAddStudents}
              fullWidth
              size="medium"
              value={this.state.allowedStudents}
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
                  <AddIcon />
                )
              }
              onClick={handleAllowedStudentsArray}
              disabled={this.state.allowedStudents.length === 0 ? true : false}
            >
              {this.state.loading ? "Adding students..." : "Add students"}
            </Button>{" "}
          </div>
        ) : (
          <div></div>
        )}
        {this.state.upload === 1 ? (
          <div>
            <br />{" "}
            <input
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={fileHandler.bind(this)}
              accept=".xlsx, .xls, .csv"
            />{" "}
            <label style={{ marginLeft: 470 }} htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="default"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Choose an excel file
              </Button>
            </label>
            {"   "}
            <Button
              variant="contained"
              color="primary"
              style={{ float: "left", marginLeft: 5 }}
              startIcon={
                this.state.loading ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  <AddIcon />
                )
              }
              onClick={handleSubmit}
              disabled={this.state.allowedStudents.length === 0 ? true : false}
            >
              {this.state.loading
                ? "Uploading and Adding students..."
                : "  Upload and add students"}
            </Button>{" "}
            <br />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
