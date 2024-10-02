import { useState, useEffect } from "react";
import Header from "./component/Header";
import Meme from "./component/Meme";
import WindowTracker from "./component/WindowTracker";
import Split from "react-split";
import { nanoid } from "nanoid";
import Sidebar from "./component/Sidebar";
import Editor from "./component/Editor";
import { addDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { notesCollection } from "./firebase";
function App() {
  // const [show, isSHow] = useState(true);
  // function toggle() {
  //   isSHow((prevShow) => !prevShow);
  // }
  // return (
  //   <>
  //     <Header />
  //     <Meme />
  //     <br />
  //     <hr />
  //     <div className="container">
  //       <button className="window-button" onClick={toggle}>
  //         Toggle WindowTracker
  //       </button>
  //       {show && <WindowTracker />}
  //     </div>
  //   </>
  // );

  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      //Sync up our local notes array with the snapshot data

      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  function updateNote(text) {
    // Put the most recently-modified note at the top
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc();
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={currentNote} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
