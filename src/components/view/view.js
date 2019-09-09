import React from "react";

const ViewComponent = props => {
  return (
    <div className="view-container">
      <h1 className="header">{props.componentBeingViewed.head}</h1>
      <div className="text">{props.componentBeingViewed.text}</div>
      {props.componentBeingViewed.isImportant ? <div className='important'>This is important</div> : ""}
      <button onClick={props.cancelView} className='cancel'>Cancel</button>
    </div>
  );
};

export default ViewComponent;
