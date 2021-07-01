import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default class SuperviseStudent extends Component {
  state = { open: false, close: false };
  render() {
    const handleClickOpen = () => {
      this.setState({ open: true });
    };
    const handleClose = () => {
      this.setState({ open: false });
    };
    return (
      <div style={{ height: "25%", width: "25%" }}>
        <Card
          style={{
            maxWidth: 345,
            size: "20%",
          }}
          onClick={handleClickOpen}
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
              <iframe
                src="https://streamable.com/e/f0qajc?autoplay=1&nocontrols=1"
                frameborder="0"
                width="100%"
                height="100%"
                allowfullscreen
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
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.info.student_name}'s Camera
              </Typography>
            </CardContent>
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
          {/*<CardMedia
              component="img"
              alt={this.props.student_name}
              image="https://i.postimg.cc/RVHCzC1N/image.png"
              title={this.props.student_name}
            />{" "}*/}

          <div
            style={{
              width: "100%",
              height: "0px",
              position: "relative",
              paddingBottom: "56.250%",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/jbUI2d6RwE8?autoplay=1&nocontrols=1"
              frameborder="0"
              width="100%"
              height="100%"
              allowfullscreen
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
        </Dialog>
      </div>
    );
  }
}
