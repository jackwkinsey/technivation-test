import React, { Component } from "react";

import {
  CardFooter,
  CardHeader,
  CardImage,
  CardText,
  CardTitle
} from "./sub-components";

class Card extends Component {
  render() {
    const children = this.props.children ? (
      <div className="card-body">{this.props.children}</div>
    ) : null;

    return (
      <div className="card" onClick={this.props.onClick}>
        <CardHeader
          header={this.props.data.header}
          subheader={this.props.data.subheader}
        />
        <CardTitle
          title={this.props.data.title}
          subtitle={this.props.data.subtitle}
        />
        <CardImage
          imageUrl={this.props.data.imageUrl}
          text={this.props.data.imageText}
        />
        <CardText text={this.props.data.text} />
        {children}
        <CardFooter text={this.props.data.footer} />
      </div>
    );
  }
}

export default Card;
