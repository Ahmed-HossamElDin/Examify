import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default class SuperviseStudent extends Component {
  state = {
    open: false,
    close: false,
    token: "",
    showModal: false,
    violation_description: "",
  };
  componentDidMount() {
    this.state = {
      ...this.state,
      showModal: false,
    };
  }
  render() {
    const handleClickOpen = () => {
      this.setState({ open: true });
    };
    const handleClose = () => {
      this.setState({ open: false });
    };
    const handleShowModalMessage = () => {
      this.setState({ showModal: true });
    };
    const reportViolation = () => {
      console.log("entered");
      axios
        .post(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/supervise/student/${this.props.info.student_id}/`,
          {
            violation: this.state.violation_description,
          },
          {
            headers: {
              Authorization: "Token " + this.props.token,
            },
          }
        )
        .then((res) => {});
    };
    const handleCloseModal = () => this.setState({ showModal: false });
    const handleViolationTextChange = (e) => {
      this.setState({ violation_description: e.target.value });
      console.log(this.state, this.props);
    };
    return (
      <div style={{ height: "25%", width: "25%" }}>
        <Card
          style={{
            maxWidth: 345,
            size: "20%",
            marginRight: 5,
          }}
        >
          <CardContent>
            <div
              style={{
                width: "100%",
                height: "0px",
                position: "relative",
                paddingBottom: "56.250%",
              }}
            >
              {" "}
              <iframe
                src="https://streamable.com/e/f0qajc?autoplay=1&nocontrols=1&muted=1"
                frameBorder="0"
                width="100%"
                height="100%"
                allowFullScreen
                allow="autoplay"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                  overflow: "hidden",
                }}
              ></iframe>
            </div>
            <CardContent onClick={handleClickOpen} style={{ cursor: "hand" }}>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.info.student_name}'s Camera
              </Typography>{" "}
            </CardContent>{" "}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleShowModalMessage}
              startIcon={<ReportIcon />}
            >
              Report Violation
            </Button>
          </CardContent>
        </Card>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">
                {this.props.info.student_name}'s Camera
              </Typography>
            </Toolbar>
          </AppBar>

          <div
            style={{
              width: "100%",
              height: "0px",
              position: "relative",
              paddingBottom: "56.250%",
            }}
          >
            <iframe
              src="https://streamable.com/e/f0qajc?autoplay=1"
              frameBorder="0"
              width="100%"
              height="100%"
              allow="autoplay"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0px",
                top: "0px",
                overflow: "hidden",
              }}
            ></iframe>
          </div>
        </Dialog>

        {this.state.showModal && (
          <Modal
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.showModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.showModal}>
              <div
                style={{
                  backgroundColor: "white",
                  border: "2px solid #000",
                  width: "45%",
                }}
              >
                <div
                  style={{
                    marginLeft: 20,
                    marginTop: 20,
                    marginBottom: 20,
                    marginRight: 20,
                  }}
                >
                  <h1>
                    Report {this.props.info.student_name}'s Violation{" "}
                    <IconButton style={{ float: "right" }}>
                      <CancelIcon onClick={handleCloseModal} />
                    </IconButton>
                    <hr style={{ width: "100%" }} />
                  </h1>
                  <TextField
                    label="Explain the violation"
                    style={{ width: "100%" }}
                    onChange={handleViolationTextChange}
                  />
                  <div style={{ float: "right", marginBottom: 20 }}>
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={reportViolation}
                    >
                      {" "}
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        )}
      </div>
    );
  }
}
