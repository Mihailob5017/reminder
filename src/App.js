import React from 'react';
import ListComponent from './components/list/list';
import EditorComponent from './components/editor/editor';
const firebase = require('firebase');

//Main Parent
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			notes: [],
			isLoaded: false,
			isBeingEdited: false,
			componentBeingEdited: {}
		};
		this.deleteNote = this.deleteNote.bind(this);
		this.updateNote = this.updateNote.bind(this);
		this.updateNote = this.updateNote.bind(this);
		this.editNote=this.editNote.bind(this);
	}
	//deleting notes from the array and firebase
	async deleteNote(note) {
		if (window.confirm(`are you sure u want to delete ${note.head}`)) {
			const newNotes = this.state.notes;
			newNotes.splice(newNotes.indexOf(note), 1);
			await this.setState({ notes: newNotes });
			//firebase code
		}
	}
	//adding a note to the array and firebase
	async updateNote(note) {
		let notes = this.state.notes;
		notes.push(note);
		await this.setState({ notes: notes, isLoaded: false });
		//firebase code
	}
	//editing a selected note
	async editNote(note){

	}
	render() {
		const notes = this.state.notes;

		//svaka beleska ce moci da se izmenjuje

		//ovo mora biti responisve
		//treba povezati nove notove sa "Firebaseom"
		//treba dodati viewComponentu
		//svaka komponenta se sklanja kada se ne koristi vise
		//treba dodati animacije
		//treba napraviti novi css
		return (
			<div>
				<ListComponent
					notes={notes}
					deleteNote={this.deleteNote}
					updateNote={this.updateNote}
				/>
				<button
					className='add-element'
					onClick={() => this.setState({ isLoaded: !this.state.isLoaded })}>
					{this.state.isLoaded ? 'Cancel' : 'Add new Element'}
				</button>
				{this.state.isLoaded ? (
					<EditorComponent
						isBeingEdited={this.state.isBeingEdited}
						componentBeingEdited={this.state.componentBeingEdited}
						updateNote={this.updateNote}
					/>
				) : (
					''
				)}
			</div>
		);
	}

	//loading the notes from firebase
	componentDidMount() {
		firebase
			.firestore()
			.collection('notes')
			.onSnapshot(update => {
				const notes = update.docs.map(doc => {
					const data = doc.data();
					data['id'] = doc.id;
					return data;
				});
				this.setState({ notes: notes });
			});
	}
}
export default App;
