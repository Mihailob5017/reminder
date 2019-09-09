import React, { Component } from 'react';

class EditorComponent extends Component {
	//will need at least three props
	//isBeingEdited and if true
	//componentBeingEdited
	//a funtrion to pass up so it can change the parent state back to false
	constructor(props) {
		super(props);
		this.state = {
			header: '',
			text: '',
			isImportant: false
		};
	}
	checkboxHander = () => {
		this.setState({ isImportant: !this.state.isImportant });
	};
	headerHandler = header => {
		this.setState({ header: header.target.value });
	};
	textHandler = text => {
		this.setState({ text: text.target.value });
	};
	sumbit = () => {
		if (this.state.header !== '' && this.state.text !== '') {
			const obj = {
				head: this.state.header,
				text: this.state.text,
				isImportant: this.state.isImportant
			};
			this.props.updateNote(obj);
		}
	};
	render() {
		return (
			<div className='editor'>
				<div className='input-area'>
					<label>The header goes here</label>
					<input
						type='text'
						value={this.state.header}
						onChange={this.headerHandler}
					/>
				</div>
				<div className='textbox-area'>
					<label>The main text goes here</label>
					<textarea value={this.state.text} onChange={this.textHandler} />
				</div>
				<div className='checkbox-area'>
					<label>Is this important?</label>
					<input
						type='checkbox'
						checked={this.state.isImportant}
						onChange={this.checkboxHander}
					/>
				</div>
				<input type='submit' onClick={this.sumbit} value='Submit' />
			</div>
		);
	}
}
export default EditorComponent;
