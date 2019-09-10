import React from "react";
import ListComponent from "./components/list/list";
import EditorComponent from "./components/editor/editor";
import ViewComponent from "./components/view/view";
const firebase = require("firebase");

//Main Parent
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      isLoaded: false,
      isBeingEdited: false,
      isBeingViewed: false,
      componentBeingViewed: {},
      componentBeingEdited: {}
    };
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.viewComponent = this.viewComponent.bind(this);
  }

  //deleting notes from the array and firebase
  async deleteNote(note) {
    if (window.confirm(`are you sure u want to delete ${note.head}`)) {
      const newNotes = this.state.notes;
      newNotes.splice(newNotes.indexOf(note), 1);
      //if the user click on delete and the component is open for viewing or editing, it will automaticly close the editor and viewer
      if (
        note === this.state.componentBeingViewed ||
        note === this.state.componentBeingEdited
      ) {
        await this.setState({ isBeingViewed: false, isLoaded: false });
      }
      //deleteing the note from firebase
      await firebase
        .firestore()
        .collection("notes")
        .doc(note.id)
        .delete();
    }
  }
  //when the user click on the eye icon,it will open the window for viewing
  async viewComponent(note) {
    await this.setState({ componentBeingViewed: note, isBeingViewed: true });
  }
  //adding a note to the array and firebase
  async updateNote(note) {
    //if the note is being edited ,it will edit it by firstly deleting it and adding a new note with the edited values
    if (this.state.isBeingEdited) {
      await this.setState({ isBeingViewed: false });
      await firebase
        .firestore()
        .collection("notes")
        .doc(note.id)
        .delete();
    }
    this.setState({ isLoaded: false });
    await firebase
      .firestore()
      .collection("notes")
      .add(note);
  }
  //opens a window for editing notes and passes the values of the note being edited
  async editNote(note) {
    //if the element is already open, it will firsty close it and open it again
    if (this.state.isLoaded) await this.setState({ isLoaded: false });
    await this.setState({
      componentBeingEdited: note,
      isBeingEdited: true,
      isLoaded: true
    });
  }
  render() {
    const notes = this.state.notes;
    return (
      <div className='root'>
        <ListComponent
          notes={notes}
          editNote={this.editNote}
          viewComponent={this.viewComponent}
          deleteNote={this.deleteNote}
          updateNote={this.updateNote}
        />
        <div className='middle'>
          <button
            className="add-element"
            onClick={() => this.setState({ isLoaded: !this.state.isLoaded })}
          >
            {this.state.isLoaded ? "Cancel" : "Add new Element"}
          </button>
          {this.state.isLoaded ? (
            <EditorComponent
              isBeingEdited={this.state.isBeingEdited}
              componentBeingEdited={this.state.componentBeingEdited}
              updateNote={this.updateNote}
            />
          ) : (
            ""
          )}
        </div >
        
        {this.state.isBeingViewed ? (
          <ViewComponent
            componentBeingViewed={this.state.componentBeingViewed}
            viewComponent={this.viewComponent}
            cancelView={async () =>
              await this.setState({ isBeingViewed: false })
            }
          />
        ) : (
         <div className='view-proxy'></div>
        )}
      </div>
    );
  }

  //loading the notes from firebase
  componentDidMount() {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(update => {
        const notes = update.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ notes: notes });
      });
  }
}
export default App;
