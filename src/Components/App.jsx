import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notesArray, setNotesArray] = useState([]);

  function addNote(title, content) {
    setNotesArray((prevValue) => {
      return [...prevValue, { title: title, content: content }];
    });
  }


  function deleteNote(id) {
    setNotesArray(prevNotes => {
      return prevNotes.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote = {addNote}  />
    

      {notesArray.map((noteItem, index) => (
        <Note index = {index} key={index} title={noteItem.title} content={noteItem.content}  onClick={deleteNote} />
      ))}

      <Footer />
    </div>
  );
}
export default App;
