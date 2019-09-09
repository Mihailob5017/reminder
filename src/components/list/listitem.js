import React from "react";
import { FaPen, FaTrash, FaEye } from "react-icons/fa";
import Concat from "../helpers/concat";
//a single Note Component
const ListItemComponent = props => {
  return (
    <div
      index={props.index}
      className={
        props.isImportant ? "note note-important" : "note note-regular"
      }
    >
      <div>
        <h1 className="head">{Concat(props.note.head)}</h1>
        <p className="text">{Concat(props.note.text)}</p>
      </div>
      <div>
        <FaEye
          onClick={() => {
            props.viewComponent(props.note);
          }}
        />
        <FaPen
          onClick={() => {
            props.editNote(props.note);
          }}
        />
        <FaTrash onClick={() => props.deleteNote(props.note)} />
      </div>
    </div>
  );
};
export default ListItemComponent;
