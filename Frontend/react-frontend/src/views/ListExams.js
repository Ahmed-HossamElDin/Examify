import React, { Component } from "react";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import NewTable from "../components/newTable";
import ViewAllowed from "../components/ViewAllowed";
import Card from "@material-ui/core/Card";

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
    headerName: "Exam Duration (hours)",
    width: 230,
    type: "number",
  },
  {
    field: "exam_startdate",
    headerName: "Exam start date and time",
    width: 260,
    type: "dateTime",
  },
];

export default class ListExams extends Component {
  componentDidMount() {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/`,
        {
          headers: { Authorization: "Token " + this.state.token },
        }
      )
      .then((res) => {
        this.setState({ exams: res.data });
      });
      
  }
  constructor(props) {
    super(props);
    this.state = { ...this.state, token: localStorage.getItem("ExamifyToken") };
  }
  state = {
    exams: [],
    token: "",
  };
  render() {
    const data = Object.entries(this.state.exams);
    let rows = this.state.exams;
    for (let i = 0; i < rows.length; i++) {
      rows[i].exam_startdate = new Date(rows[i].exam_startdate.toString());
    }

    return (
      <div style={{ marginLeft: 150, marginRight: 20 }}>
        {rows.length > 0 ? (
          <div >
            <NewTable exams={data}></NewTable>
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
