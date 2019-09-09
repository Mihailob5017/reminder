import React from 'react';
import { FaPen, FaTrash,FaEye } from 'react-icons/fa';
import Concat from '../helpers/concat';
const ListItemComponent = props => {
	return (
		<div
			index={props.index}
			className={
				props.isImportant ? 'note note-important' : 'note note-regular'
			}>
			<div>
				<h1 className='head'>{props.note.head}</h1>
				<p className='text'>{Concat(props.note.text)}</p>
			</div>
			<div>
				<FaEye/>
				<FaPen />
				<FaTrash onClick={() => props.deleteNote(props.note)} />
			</div>
		</div>
	);
};
export default ListItemComponent;