import React from "react";

export default function CardTitle(props) {
  return props.title || props.subtitle ? (
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <h6 className="card-subtitle text-muted">{props.subtitle}</h6>
    </div>
  ) : null;
}
