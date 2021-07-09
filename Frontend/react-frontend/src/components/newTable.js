import React, { useEffect, useState } from "react";
import axios from 'axios';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardHeader from "../components/Card/CardHeader.js";
import ReactTable from "../components/ReactTable/ReactTable.js";


import { cardTitle } from "../assets/jss/material-dashboard-pro-react.js";
  

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

export default function ReactTables(props) {

  const [Exams, setExams] = useState(props.exams);
  console.log(props)
  console.log("exams are :")
  console.log(Exams)

  var alteredExams = [];
  
  for (var index in Exams){
    console.log(Exams[index][1]["exam_name"])
  }
  
  console.log("Exams after edit");
  console.log(alteredExams);

  const [data, setData] = React.useState(
    Exams.map((prop, key) => {
      return {
        id: key,
        exam_name: prop[1]["exam_name"],
        exam_startdate: prop["exam_startdate"],
        exam_duration: prop["exam_duration"],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <Button
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
              color="info"
              className="like"
            >
              <Favorite />
            </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
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
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>React Table</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "Exam name",
                  accessor: "exam_name",
                },
                {
                  Header: "Duration",
                  accessor: "exam_duration",
                },
                {
                  Header: "Start date & time",
                  accessor: "exam_startdate",
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
  );
}
