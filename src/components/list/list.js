import React, { useState } from 'react';
import ListItemComponent from './listitem';
const ListComponent = ({ notes, updateNote, deleteNote }) => {
	return (
		<div className='note-container'>
			{notes.map(note => {
				return (
					<ListItemComponent
						note={note}
						updateNote={updateNote}
						deleteNote={deleteNote}
						key={note.id}
					/>
				);
			})}
		</div>
	);
};

export default ListComponent;
