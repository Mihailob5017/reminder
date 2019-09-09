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
      if(note===this.state.componentBeingViewed)
      {
        await this.setState({isBeingViewed:false})
      }
      await this.setState({ notes: newNotes });
      //firebase code
    }
  }
  //loading a selected component
  async viewComponent(note) {
    await this.setState({ componentBeingViewed: note, isBeingViewed: true });
  }
  //adding a note to the array and firebase
  async updateNote(note) {
    if (this.state.isBeingEdited) {
      let notes = this.state.notes;
      notes = notes.filter(__note => {
        return __note.id !== note.id;
      });
      notes.push(note);
      await this.setState({ notes: notes });
    } else {
      let notes = this.state.notes;
      notes.push(note);
      await this.setState({ notes: notes });
    }
    this.setState({ isLoaded: false });
    //firebase code
  }
  //editing a selected note
  async editNote(note) {
    await this.setState({
      componentBeingEdited: note,
      isBeingEdited: true,
      isLoaded: true
    });
  }

  render() {
    const notes = this.state.notes;

    

    //ovo mora biti responisve
    //treba povezati nove notove sa "Firebaseom"
    //svaka komponenta se sklanja kada se ne koristi vise
    //treba dodati animacije
    //treba napraviti novi css
    return (
      <div>
        <ListComponent
          notes={notes}
          editNote={this.editNote}
          viewComponent={this.viewComponent}
          deleteNote={this.deleteNote}
          updateNote={this.updateNote}
        />
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
        {this.state.isBeingViewed ? (
          <ViewComponent
            componentBeingViewed={this.state.componentBeingViewed}
            viewComponent={this.viewComponent}
            cancelView={async () =>
              await this.setState({ isBeingViewed: false })
            }
          />
        ) : (
          ""
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
