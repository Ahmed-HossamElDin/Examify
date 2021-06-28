import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
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
      <div>
        <Card
          style={{
            maxWidth: 345,
            size: "20%",
          }}
          onClick={handleClickOpen}
        >
          <CardContent>
            {" "}
            <CardMedia
              style={{ cursor: " zoom-in" }}
              component="img"
              height={"25%"}
              width={"15%"}
              alt={this.props.info.student_name}
              image="https://i.postimg.cc/RVHCzC1N/image.png"
              title={this.props.info.student_name}
            />{" "}
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
          <List>
            <CardMedia
              component="img"
              alt={this.props.student_name}
              image="https://i.postimg.cc/RVHCzC1N/image.png"
              title={this.props.student_name}
            />
          </List>
        </Dialog>
      </div>
    );
  }
}
