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
var success = false;
var help =
  "Correct format is : supervisor1,supervisor2,supervisor3 or supervisor1 supervisor2 supervisor3 or by sperating them by new lines";
export default class AddSupervisors extends Component {
  state = {
    allowedSupervisors: [],
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
      upload: 0,
    };
  }
  render() {
    const handleAddSupervisors = (e) => {
      this.setState({
        ...this.state,
        allowedSupervisors: e.target.value,
      });
    };
    const handleAllowedSupervisorsArray = () => {
      if (this.state.allowedSupervisors.includes(",")) {
        this.setState(
          {
            ...this.state,
            allowedSupervisors: this.state.allowedSupervisors
              .replace(/,/g, " ")
              .trim()
              .split(" "),
          },
          handleSubmit
        );
      } else if (this.state.allowedSupervisors.includes(" ")) {
        this.setState(
          {
            ...this.state,
            allowedSupervisors: this.state.allowedSupervisors
              .replace(/\s+/g, " ")
              .trim()
              .split(" "),
          },
          handleSubmit
        );
      } else if (this.state.allowedSupervisors.includes("\n")) {
        this.setState(
          {
            ...this.state,
            allowedSupervisors: this.state.alloweSupervisors
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
        { ...this.state, loading: true },
        handleAllowedSupervisorsArray()
      );
      console.log(this.state);
      axios
        .post(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.exam_id}/supervisors/`,
          {
            supervisor: this.state.allowedSupervisors,
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
            error: `Error adding supervisors!`,
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
          console.log(resp.rows);
          resp.rows.map((supervisor) => result.push(supervisor[0]));
          this.setState(
            {
              allowedSupervisors: result,
            },
            console.log(this.state)
          );
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
        <br />
        <h3
          style={{ fontSize: "20px", fontFamily: "Century Gothic,Lucida Sans" }}
        >
          Add Supervisors
        </h3>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={enterManually}>Enter Supervisors manually</Button>
          <Button onClick={uploadFile}>Upload an excel file</Button>
        </ButtonGroup>{" "}
        {success === true && this.state.loading === false ? (
          <div>
            {" "}
            <br />
            <Alert severity="success">Supervisors added successfully! </Alert>
          </div>
        ) : this.state.error !== "" && this.state.loading === false ? (
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
        )}
        {this.state.manually === 1 ? (
          <div>
            <br />
            <TextField
              id="outlined-multiline-static"
              label="Add allowed Supervisors"
              multiline
              rowsMax={this.state.allowedSupervisors.length}
              variant="outlined"
              onChange={handleAddSupervisors}
              fullWidth
              size="medium"
              value={this.state.allowedSupervisors}
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
              onClick={handleAllowedSupervisorsArray}
              disabled={
                this.state.allowedSupervisors.length === 0 ? true : false
              }
            >
              {this.state.loading ? "Adding supervisors..." : "Add supervisor"}
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
              disabled={
                this.state.allowedSupervisors.length === 0 ? true : false
              }
            >
              {this.state.loading
                ? "Uploading and Adding supervisors..."
                : "  Upload and add supervisors"}
            </Button>{" "}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
