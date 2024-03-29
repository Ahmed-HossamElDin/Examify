import React, { Component } from "react";
import axios from "axios";
import SupervisorChip from "./SupervisorChip";
import AddSupervisors from "./AddSupervisors";
import RefreshIcon from "@material-ui/icons/Refresh";

export default class EditSupervisors extends Component {
  state = { supervisors: {} };
  componentDidMount() {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/supervisors/`,
        {
          headers: { Authorization: "Token " + this.props.token },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ supervisors: res.data });
      });
  }
  render() {
    const refreshComponent = () => {
      this.forceUpdate();
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/supervisors/`,
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.setState({ supervisors: res.data });
        });
    };
    return (
      <div>
        <br />
        <h3
          style={{ fontSize: "20px", fontFamily: "Century Gothic,Lucida Sans" }}
        >
          <br />
          Edit Allowed Supervisors{" "}
          <RefreshIcon
            style={{ fontSize: "18px" }}
            onClick={refreshComponent}
          />
        </h3>
        <br />
        {this.state.supervisors.length !== 0 ? (
          <div>
            {Object.keys(this.state.supervisors).map((key) => (
              <SupervisorChip
                token={this.props.token}
                exam_id={this.props.exam_id}
                info={this.state.supervisors[key]}
                callBack={refreshComponent}
              />
            ))}
          </div>
        ) : (
          <div></div>
        )}
        <AddSupervisors
          callBack={refreshComponent}
          exam_id={this.props.exam_id}
          token={this.props.token}
        />
      </div>
    );
  }
}
