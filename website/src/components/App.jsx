// // // import React, { useState } from "react";
// // // import Header from "./Header";
// // // import Footer from "./Footer";
// // // import Note from "./Note";
// // // import CreateArea from "./CreateArea";

// // // function App() {
// // //   const [notes, setNotes] = useState([]);

// // //   function addNote(newNote) {
// // //     setNotes(prevNotes => {
// // //       return [...prevNotes, newNote];
// // //     });
// // //   }

// // //   function deleteNote(id) {
// // //     setNotes(prevNotes => {
// // //       return prevNotes.filter((noteItem, index) => {
// // //         return index !== id;
// // //       });
// // //     });
// // //   }

// // //   return (
// // //     <div>
// // //       <Header />
// // //       <CreateArea onAdd={addNote} />
// // //       {notes.map((noteItem, index) => {
// // //         return (
// // //           <Note
// // //             key={index}
// // //             id={index}
// // //             title={noteItem.title}
// // //             content={noteItem.content}
// // //             onDelete={deleteNote}
// // //           />
// // //         );
// // //       })}
// // //       <Footer />
// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import React, { useState } from "react";
// // import CreateArea from "./CreateArea";
// // import Note from "./Note";

// // function App() {
// //   const [notes, setNotes] = useState([]);

// //   function addNote(newNote) {
// //     setNotes((prevNotes) => [...prevNotes, { ...newNote, subnotes: [] }]);
// //   }

// //   function addSubnote(noteIndex, subnote) {
// //     setNotes((prevNotes) =>
// //       prevNotes.map((note, index) =>
// //         index === noteIndex
// //           ? { ...note, subnotes: [...note.subnotes, subnote] }
// //           : note
// //       )
// //     );
// //   }

// //   function deleteNote(index) {
// //     setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
// //   }

// //   return (
// //     <div>
// //       <CreateArea onAdd={addNote} />
// //       {notes.map((note, index) => (
// //         <Note
// //           key={index}
// //           id={index}
// //           title={note.title}
// //           content={note.content}
// //           subnotes={note.subnotes}
// //           onDelete={deleteNote}
// //           onAddSubnote={addSubnote}
// //         />
// //       ))}
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from "react";
// import CreateArea from "./CreateArea";
// import Note from "./Note";
// import Header from "./Header";

// function App() {
//   const [notes, setNotes] = useState([]);

//   function addNote(newNote) {
//     setNotes((prevNotes) => [...prevNotes, { ...newNote, subnotes: [] }]);
//   }

//   function addSubnote(noteIndex, subnote) {
//     setNotes((prevNotes) =>
//       prevNotes.map((note, index) =>
//         index === noteIndex
//           ? { ...note, subnotes: [...note.subnotes, subnote] }
//           : note
//       )
//     );
//   }

//   function deleteNote(index) {
//     setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
//   }

//   function deleteSubnote(noteIndex, subnoteIndex) {
//     setNotes((prevNotes) =>
//       prevNotes.map((note, index) =>
//         index === noteIndex
//           ? {
//               ...note,
//               subnotes: note.subnotes.filter((_, i) => i !== subnoteIndex),
//             }
//           : note
//       )
//     );
//   }

//   return (
//     <div>
//       <CreateArea onAdd={addNote} />
//       {notes.map((note, index) => (
//         <Note
//           key={index}
//           id={index}
//           title={note.title}
//           content={note.content}
//           subnotes={note.subnotes}
//           onDelete={deleteNote}
//           onAddSubnote={addSubnote}
//           onDeleteSubnote={deleteSubnote}
//         />
//       ))}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import Header from "./Header"; // Import Header
import CreateArea from "./CreateArea";
import Note from "./Note";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    if (newNote.title.trim() === "" && newNote.content.trim() === "") return;
    setNotes((prevNotes) => [...prevNotes, { ...newNote, subnotes: [] }]);
  }

  function addSubnote(noteIndex, subnote) {
    setNotes((prevNotes) =>
      prevNotes.map((note, index) =>
        index === noteIndex
          ? { ...note, subnotes: [...note.subnotes, subnote] }
          : note
      )
    );
  }

  function deleteNote(index) {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  }

  function deleteSubnote(noteIndex, subnoteIndex) {
    setNotes((prevNotes) =>
      prevNotes.map((note, index) =>
        index === noteIndex
          ? {
              ...note,
              subnotes: note.subnotes.filter((_, i) => i !== subnoteIndex),
            }
          : note
      )
    );
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          subnotes={note.subnotes}
          onDelete={deleteNote}
          onAddSubnote={addSubnote}
          onDeleteSubnote={deleteSubnote}
        />
      ))}
    </div>
  );
}

export default App;
