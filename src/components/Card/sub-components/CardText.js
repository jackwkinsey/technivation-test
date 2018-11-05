import React from "react";

export default function CardText(props) {
  return props.text ? (
    <div className="card-body">
      <p className="card-text">{props.text}</p>
    </div>
  ) : null;
}
