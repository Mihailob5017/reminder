import React from "react";
import ListItemComponent from "./listitem";
const ListComponent = ({ notes, editNote, deleteNote,viewComponent }) => {
  return (
    <div className="note-container">
      {notes.map(note => {
        return (
          <ListItemComponent
            note={note}
            viewComponent={viewComponent}
            editNote={editNote}
            deleteNote={deleteNote}
            key={note.id}
          />
        );
      })}
    </div>
  );
};

export default ListComponent;
