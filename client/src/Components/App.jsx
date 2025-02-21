import React, { useState, useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


const server_port = 3001;
function App() {
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:${server_port}/api/notes`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.text().then(text => text ? JSON.parse(text) : {});
      })
      .then((data) => {
        console.log("Data being fetched from /api/notes");
        setNotesArray(data);
        console.log(notesArray);
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  function addNote(title, content) {
    fetch(`http://localhost:${server_port}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "title": title, "content": content })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.text().then(text => text ? JSON.parse(text) : {});
      })
      .then((data) => {
        console.log("Data being fetched from /api/notes");
        setNotesArray([...notesArray, { "title": title, "content": content }]);
        console.log(notesArray);
      })
      .catch((error) => console.error("Error adding note:", error));
  }

  function deleteNote(id) {
    
    const toDeleteNode = (notesArray.filter((item, index) => {
      return index == id;
    }));
    const title = toDeleteNode[0].title;
    const content = toDeleteNode[0].content;
    console.log("title:",title,"content:",content);


    fetch(`http://localhost:${server_port}/api/notes`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "title": title, "content": content })
    })
    .then((res)=>{
      if(!res.ok){
        throw new Error("Network response was not ok");
      }
      return res.text().then(text => text ? JSON.parse(text) : {});
    })
    .catch((error)=>console.error("Error deleting note:",error));


    
    setNotesArray((prevNotes) => {
      return prevNotes.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />

      {notesArray.map((noteItem, index) => (
        <Note
          index={index}
          key={index}
          title={noteItem.title}
          content={noteItem.content}
          onClick={deleteNote}
        />
      ))}

      <Footer />
    </div>
  );
}
export default App;