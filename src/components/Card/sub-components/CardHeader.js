import React from "react";

export default function CardHeader(props) {
  return props.header ? (
    <h3 className="card-header">
      {props.header}
      <small className="text-muted"> ({props.subheader})</small>
    </h3>
  ) : null;
}
