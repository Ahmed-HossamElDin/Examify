import React, { Component } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import ViewAllowed from "../components/ViewAllowed.js";
import "../css/examiner-component.css";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    backgroundColor: "#376331",
    type: "number",
  },
  {
    field: "exam_name",
    headerName: "Exam name",
    width: 200,
    backgroundColor: "#376331",
  },

  {
    field: "exam_duration",
    headerName: "Exam Duration",
    width: 160,
    type: "number",
  },
  {
    field: "exam_startdate",
    headerName: "Exam start date and time",
    width: 230,
    type: "dateTime",
  },
];

export default class ListExams extends Component {
  componentDidMount() {
    //console.log("Key is : ");
    //console.log(this.state);
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/`,
        {
          headers: { Authorization: "Token " + "b9bb864dbd489d8b714a2211cc32aa78697a6adb" },
        }
      )
      .then((res) => {
        this.setState({ exams: res.data });
      });
  }
  constructor(props) {
    super(props);
    this.state = { ...this.state, token: "b9bb864dbd489d8b714a2211cc32aa78697a6adb" };
  }
  state = {
    exams: [],
    token: "",
  };
  render() {
    let rows = this.state.exams;
    for (let i = 0; i < rows.length; i++) {
      rows[i].exam_startdate = new Date(rows[i].exam_startdate.toString());
    }

    return (
      <div>
        {rows.length > 0 ? (
          <div style={{ height: 630, width: 700 }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} />
            {console.log(rows, "rows")}
            {this.props.view === true ? (
              <ViewAllowed token="b9bb864dbd489d8b714a2211cc32aa78697a6adb" />
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div>
            <LinearProgress />
          </div>
        )}
      </div>
    );
  }
}
