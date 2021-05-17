import React from "react";

function article(props) {
  return (
    <div>
      <div>
        <img src={props.data.urlToImage}></img>
      </div>
      <div>{props.data.source.Name}</div>
      <div>{props.data.source.Name}</div>
    </div>
  );
}

export default article;
