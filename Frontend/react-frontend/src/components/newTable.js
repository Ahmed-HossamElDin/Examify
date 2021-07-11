import React, { useEffect, useState } from "react";
import axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Edit";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/Visibility";
import GetApp from "@material-ui/icons/GetApp";
// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardHeader from "../components/Card/CardHeader.js";
import ReactTable from "../components/ReactTable/ReactTable.js";
import LinearProgress from "@material-ui/core/LinearProgress";

import ViewExamInfo from "./ViewExamInfo.js";

import ExamEdit from "./ExamEdit";

import { cardTitle } from "../assets/jss/material-dashboard-pro-react.js";

import "../css/table.scss";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

var formatDate = (exam_starttime) => {
  let examStartTime = new Date(exam_starttime);
  var date =
    examStartTime.getFullYear() +
    "-" +
    (examStartTime.getMonth() + 1) +
    "-" +
    examStartTime.getDate();

  return date;
};

var formatTime = (exam_starttime) => {
  let examStartTime = new Date(exam_starttime);
  var time =
    examStartTime.getHours() +
    ":" +
    examStartTime
      .getMinutes()
      .toString()
      .padStart(2, "0");
  return time;
};

var exportex = [];

var examId = null;

var examMarks = [];

export default function ReactTables(props) {
  const [Exams, setExams] = useState(props.exams);
  const [Branch, setBranch] = useState(0);
  const [focusedExamId, setFocusedExamId] = useState(null);
  const [Token, setToken] = useState(localStorage.getItem("ExamifyToken"));
  const [Marks, setMarks] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);

  const goBack = () => {
    setBranch(0);
  };

  const handleGetMarks = (id) => {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${id}/marks/`,
        {
          headers: { Authorization: "Token " + Token },
        }
      )
      .then((res) => {
        //setMarks(res.data);
        examMarks = res.data;
        exportex = [];
        var finalMarks = examMarks.map((key) => {
          delete key.id;
          exportex.push(key);
        });
      });
  };

  const handleGetExam = (id) => {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${id}/`,
        {
          headers: { Authorization: "Token " + Token },
        }
      )
      .then((res) => {
        setCurrentExam(res.data);
      });
  };

  const deleteExam = (id) => {
    axios
      .delete(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${id}/`,
        {
          headers: { Authorization: "Token " + Token },
        }
      )
      .then(() => {
        // console.log("deleted")
      });
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const [data, setData] = React.useState(
    Exams.map((prop, key) => {
      return {
        id: key,
        exam_name: prop[1]["exam_name"],
        exam_startdate:
          formatDate(new Date(prop[1]["exam_startdate"]).toString()) +
          " @ " +
          formatTime(new Date(prop[1]["exam_startdate"]).toString()),
        exam_duration: prop[1]["exam_duration"],
        actions: (
          <div className="actions-right">
            <Button
              title="View info"
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                setFocusedExamId(prop[1]["id"]);
                setBranch(1);
              }}
              color="info"
              className="view"
            >
              <Visibility />
            </Button>{" "}
            <Button
              title="Download marks"
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                setFocusedExamId(prop[1]["id"]);
                examId = prop[1]["exam_name"];
                handleGetMarks(examId);
                var downloadName = examId + "_Marks";
                exportToCSV(exportex, downloadName);
              }}
              color="success"
              className="view"
            >
              <GetApp />
            </Button>{" "}
            <Button
              title="Edit"
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                setFocusedExamId(prop[1]["id"]);
                examId = prop[1]["id"];
                handleGetExam(examId);
                setBranch(2);
              }}
              color="warning"
              className="edit"
            >
              <Dvr />
            </Button>{" "}
            <Button
              title="Delete"
              justIcon
              round
              simple
              onClick={() => {
                var newData = data;
                newData.find((o, i) => {
                  if (o.id === key) {
                    setFocusedExamId(prop[1]["id"]);
                    examId = prop[1]["id"];
                    deleteExam(examId);
                    newData.splice(i, 1);
                    return true;
                  }
                  return false;
                });
                setData([...newData]);
              }}
              color="danger"
              className="remove"
            >
              <Close />
            </Button>{" "}
          </div>
        ),
      };
    })
  );

  const classes = useStyles();
  return Branch === 0 ? (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Exams</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "Exam name",
                  accessor: "exam_name",
                },
                {
                  Header: "Start date & time",
                  accessor: "exam_startdate",
                },
                {
                  Header: "Duration (Hour)",
                  accessor: "exam_duration",
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                },
              ]}
              data={data}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  ) : Branch === 1 ? (
    <ViewExamInfo token={Token} id={focusedExamId} goBack={goBack} />
  ) : Branch === 2 && currentExam != null ? (
    <ExamEdit exam={currentExam} token={Token} goBack={goBack} />
  ) : (
    <div>
      <LinearProgress color="secondary" />
    </div>
  );
}
