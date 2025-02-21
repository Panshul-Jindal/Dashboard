// // // // import React from "react";

// // // // function Note(props) {
// // // //   function handleClick() {
// // // //     props.onDelete(props.id);
// // // //   }

// // // //   return (
// // // //     <div className="note">
// // // //       <h1>{props.title}</h1>
// // // //       <p>{props.content}</p>
// // // //       <button onClick={handleClick}>DELETE</button>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Note;

// // // import React, { useState } from "react";

// // // function Note({ id, title, content, subnotes, onDelete, onAddSubnote }) {
// // //   const [subnoteText, setSubnoteText] = useState("");

// // //   function handleAddSubnote() {
// // //     if (subnoteText.trim() !== "") {
// // //       onAddSubnote(id, subnoteText);
// // //       setSubnoteText("");
// // //     }
// // //   }

// // //   return (
// // //     <div className="note">
// // //       <h1>{title}</h1>
// // //       <p>{content}</p>
// // //       <button onClick={() => onDelete(id)}>Delete</button>

// // //       <div>
// // //         <input
// // //           type="text"
// // //           value={subnoteText}
// // //           onChange={(e) => setSubnoteText(e.target.value)}
// // //           placeholder="Add a subnote"
// // //         />
// // //         <button onClick={handleAddSubnote}>Add Subnote</button>
// // //       </div>

// // //       <ul>
// // //         {subnotes.map((subnote, index) => (
// // //           <li key={index}>{subnote}</li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // }

// // // export default Note;

// // import React, { useState } from "react";

// // function Note({ id, title, content, subnotes, onDelete, onAddSubnote }) {
// //   const [subnoteText, setSubnoteText] = useState("");
// //   const [isExpanded, setIsExpanded] = useState(false);

// //   function handleAddSubnote() {
// //     if (subnoteText.trim() !== "") {
// //       onAddSubnote(id, subnoteText);
// //       setSubnoteText("");
// //     }
// //   }

// //   return (
// //     <div className="note">
// //       <h1>{title}</h1>
// //       <p>{content}</p>
// //       <button onClick={() => onDelete(id)}>Delete</button>

// //       <div>
// //         <input
// //           type="text"
// //           value={subnoteText}
// //           onChange={(e) => setSubnoteText(e.target.value)}
// //           placeholder="Add a subnote"
// //         />
// //         <button onClick={handleAddSubnote}>Add Subnote</button>
// //       </div>

// //       {subnotes.length > 0 && (
// //         <button onClick={() => setIsExpanded(!isExpanded)}>
// //           {isExpanded ? "Hide Subnotes" : "Show Subnotes"}
// //         </button>
// //       )}

// //       {isExpanded && (
// //         <ul>
// //           {subnotes.map((subnote, index) => (
// //             <li key={index}>{subnote}</li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // }

// // export default Note;

// import React, { useState } from "react";
// import { FaTrash, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons

// function Note({
//   id,
//   title,
//   content,
//   subnotes,
//   onDelete,
//   onAddSubnote,
//   onDeleteSubnote,
// }) {
//   const [subnoteText, setSubnoteText] = useState("");
//   const [isExpanded, setIsExpanded] = useState(false);

//   function handleAddSubnote() {
//     if (subnoteText.trim() !== "") {
//       onAddSubnote(id, subnoteText);
//       setSubnoteText("");
//     }
//   }

//   return (
//     <div className="note">
//       <h1>{title}</h1>
//       <p>{content}</p>

//       <button onClick={() => onDelete(id)}>
//         <FaTrash />
//       </button>

//       <div>
//         <input
//           type="text"
//           value={subnoteText}
//           onChange={(e) => setSubnoteText(e.target.value)}
//           placeholder="Add subnote..."
//         />
//         <button onClick={handleAddSubnote}>
//           <FaPlus />
//         </button>
//       </div>

//       {subnotes.length > 0 && (
//         <button onClick={() => setIsExpanded(!isExpanded)}>
//           {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
//         </button>
//       )}

//       {isExpanded && (
//         <ul>
//           {subnotes.map((subnote, index) => (
//             <li key={index}>
//               {subnote}{" "}
//               <button onClick={() => onDeleteSubnote(id, index)}>
//                 <FaTrash />
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Note;

import React, { useState } from "react";
import { FaTrash, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";

function Note({
  id,
  title,
  content,
  subnotes,
  onDelete,
  onAddSubnote,
  onDeleteSubnote,
}) {
  const [subnoteText, setSubnoteText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  function handleAddSubnote() {
    if (subnoteText.trim() !== "") {
      onAddSubnote(id, subnoteText);
      setSubnoteText("");
    }
  }

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>

      <button onClick={() => onDelete(id)} className="icon-button">
        <FaTrash size={14} />
      </button>

      <div>
        <input
          type="text"
          value={subnoteText}
          onChange={(e) => setSubnoteText(e.target.value)}
          placeholder="Add subnote..."
        />
        <button onClick={handleAddSubnote} className="icon-button">
          <FaPlus size={14} />
        </button>
      </div>

      {subnotes.length > 0 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="icon-button"
        >
          {isExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
        </button>
      )}

      {isExpanded && (
        <ul>
          {subnotes.map((subnote, index) => (
            <li key={index}>
              {subnote}{" "}
              <button
                onClick={() => onDeleteSubnote(id, index)}
                className="icon-button"
              >
                <FaTrash size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Note;
