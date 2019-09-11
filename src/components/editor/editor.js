import React, { Component } from "react";
//Editor Component,used for addin and editing selected Components
class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      text: "",
      isImportant: false
    };
    //checks if the component is being edited or the user is creating a new component
    //If it is being edited it loads the values of the selected component on to the state
    this.componentDidMount = () => {
      if (this.props.isBeingEdited === true) {
        this.setState({
          header: this.props.componentBeingEdited.head,
          text: this.props.componentBeingEdited.text,
          isImportant: this.props.componentBeingEdited.isImportant
        });
      }
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
    if (
      this.props.isBeingEdited &&
      (this.state.header !== "" && this.state.text !== "")
    ) {
      const newObj = {
        id: this.props.componentBeingEdited.id,
        head: this.state.header,
        text: this.state.text,
        isImportant: this.state.isImportant
      };
      this.props.updateNote(newObj);
      //if the component is not being edited, it will send the object without the id
    } else if (this.state.header !== "" && this.state.text !== "") {
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
      <div className="editor">
        <div className="input-area">
          <label>Note Name</label>
          <input
            type="text"
            placeholder="note name"
            maxLength="30"
            value={this.state.header}
            onChange={this.headerHandler}
          />
        </div>
        <div className="textbox-area">
          <label>The main text goes here</label>
          <textarea
            value={this.state.text}
            placeholder="note text"
            onChange={this.textHandler}
          />
        </div>
        <div className="checkbox-area">
          <label>Is this important?</label>
          <input
            type="checkbox"
            checked={this.state.isImportant}
            onChange={this.checkboxHander}
          />
        </div>
        <input
          className="submit  "
          type="submit"
          onClick={this.sumbit}
          value="Submit"
        />
      </div>
    );
  }
}
export default EditorComponent;
