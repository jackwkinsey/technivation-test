import React, { Component } from "react";

import { Enroll, Redeem } from "./sub-components";

class Rewards extends Component {
  render() {
    return (
      <div>
        <Enroll account={this.props.account} onEnroll={this.props.onEnroll} />
        <Redeem
          account={this.props.account}
          points={this.props.points}
          onRedeem={this.props.onRedeem}
        />
      </div>
    );
  }
}

export default Rewards;
