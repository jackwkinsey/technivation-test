import React from "react";

export default function CardFooter(props) {
  return props.footer ? <div className="card-footer">{props.text}</div> : null;
}
