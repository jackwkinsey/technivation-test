import React from "react";

export default function CardImage(props) {
  return props.imageUrl ? (
    <img src={props.imageUrl} alt={props.imageText} />
  ) : null;
}
