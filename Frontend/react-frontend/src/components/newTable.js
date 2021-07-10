import React, { useEffect, useState } from "react";
import axios from 'axios';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Edit";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/Visibility";
import GetApp from "@material-ui/icons/GetApp"
// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardHeader from "../components/Card/CardHeader.js";
import ReactTable from "../components/ReactTable/ReactTable.js";

import ViewExamInfo from "./ViewExamInfo.js";


import { cardTitle } from "../assets/jss/material-dashboard-pro-react.js";

import "../css/table.scss"
  

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



export default function ReactTables(props) {

  const [Exams, setExams] = useState(props.exams);
  const [Branch, setBranch] = useState(0);
  const [focusedExamId, setFocusedExamId] = useState(null);
  const [Token, setToken] = useState(localStorage.getItem("ExamifyToken"));


  const [data, setData] = React.useState(
    Exams.map((prop, key) => {
      return {
        id: key,
        exam_name: prop[1]["exam_name"],
        exam_startdate: formatDate(new Date(prop[1]["exam_startdate"]).toString())+ " @ " + formatTime(new Date(prop[1]["exam_startdate"]).toString()),
        exam_duration: prop[1]["exam_duration"],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <Button
              title="View"
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                setBranch(1);
                setFocusedExamId(prop[1]["id"]);
                
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
                alert(
                  "You've clicked LIKE button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                );
              }}
              color="success"
              className="view"
            >
              <GetApp />
            </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
              title="Edit"
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked EDIT button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                );
              }}
              color="warning"
              className="edit"
            >
              <Dvr />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              title="Delete"
              justIcon
              round
              simple
              onClick={() => {
                var newData = data;
                newData.find((o, i) => {
                  if (o.id === key) {
                    // here you should add some custom code so you can delete the data
                    // from this component and from your server as well
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
  return (
    Branch === 0 ? (
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

    ):(
      <ViewExamInfo token={Token} id={focusedExamId}/>
    )
    
  );
}
