// import React, { useState, useEffect, useRef } from "react";
// import { FaTimes } from "react-icons/fa";

// function Calculator({ onClose }) {
//   const [input, setInput] = useState("");
//   const inputRef = useRef(input);

//   // Sync ref with current input value
//   useEffect(() => {
//     inputRef.current = input;
//   }, [input]);

//   useEffect(() => {
//     function handleKeyDown(event) {
//       const currentInput = inputRef.current;

//       if (event.key.match(/[0-9+\-*/.]/)) {
//         setInput((prev) => {
//           const newValue = prev + event.key;
//           // Prevent multiple consecutive operators
//           const operators = ["+", "-", "*", "/"];
//           const lastChar = newValue.slice(-1);
//           const prevChar = newValue.slice(-2, -1);

//           if (operators.includes(lastChar) && operators.includes(prevChar)) {
//             return prev;
//           }
//           return newValue;
//         });
//       } else if (event.key === "Enter") {
//         event.preventDefault();
//         calculateResult();
//       } else if (event.key === "Backspace") {
//         setInput((prev) => prev.slice(0, -1));
//       } else if (event.key === "Escape") {
//         onClose();
//       }
//     }

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [onClose]);

//   function calculateResult() {
//     try {
//       const currentInput = inputRef.current.trim();

//       // Enhanced validation
//       if (
//         !currentInput ||
//         /[+\-*/.]$/.test(currentInput) ||
//         /([+\-*/])\1{1,}/.test(currentInput) ||
//         currentInput.split(".").length > 2
//       ) {
//         setInput("Error");
//         return;
//       }

//       // Safe evaluation using Function constructor
//       const result = new Function("return " + currentInput)();
//       setInput(Number.isFinite(result) ? result.toString() : "Error");
//     } catch {
//       setInput("Error");
//     }
//   }

//   // Rest of the component remains the same...

//   function handleButtonClick(value) {
//     if (value === "=") {
//       calculateResult();
//     } else if (value === "C") {
//       setInput("");
//     } else {
//       setInput((prev) => prev + value);
//     }
//   }
import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

function Calculator({ onClose }) {
  const [input, setInput] = useState("");
  const [lastOperation, setLastOperation] = useState(false);
  const inputRef = useRef(input);

  // Sync ref with current input value
  useEffect(() => {
    inputRef.current = input;
  }, [input]);

  useEffect(() => {
    function handleKeyDown(event) {
      const currentInput = inputRef.current;

      if (event.key.match(/[0-9]/)) {
        if (lastOperation) {
          setInput(event.key);
          setLastOperation(false);
        } else {
          setInput((prev) => prev + event.key);
        }
      } else if (event.key.match(/[+\-*/]/)) {
        setInput((prev) => prev + event.key);
        setLastOperation(false);
      } else if (event.key === ".") {
        if (!currentInput.includes(".")) {
          setInput((prev) => prev + event.key);
        }
      } else if (event.key === "Enter") {
        event.preventDefault();
        calculateResult();
        setLastOperation(true);
      } else if (event.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        setLastOperation(false);
      } else if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, lastOperation]);

  function calculateResult() {
    try {
      const currentInput = inputRef.current.trim();

      // Enhanced validation
      if (
        !currentInput ||
        /[+\-*/.]$/.test(currentInput) ||
        /([+\-*/])\1{1,}/.test(currentInput) ||
        currentInput.split(".").length > 2
      ) {
        setInput("Error");
        return;
      }

      // Safe evaluation using Function constructor
      const result = new Function("return " + currentInput)();
      setInput(Number.isFinite(result) ? result.toString() : "Error");
    } catch {
      setInput("Error");
    }
  }

  function handleButtonClick(value) {
    if (value === "=") {
      calculateResult();
      setLastOperation(true);
    } else if (value === "C") {
      setInput("");
      setLastOperation(false);
    } else {
      if (lastOperation && value.match(/[0-9]/)) {
        setInput(value);
        setLastOperation(false);
      } else {
        setInput((prev) => prev + value);
        setLastOperation(false);
      }
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.calculator}>
        <button style={styles.closeButton} onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <input type="text" value={input} readOnly style={styles.display} />
        <div style={styles.buttons}>
          {[
            "7",
            "8",
            "9",
            "/",
            "4",
            "5",
            "6",
            "*",
            "1",
            "2",
            "3",
            "-",
            "0",
            ".",
            "=",
            "+",
          ].map((btn) => (
            <button
              key={btn}
              style={styles.button}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
          <button style={styles.button} onClick={() => handleButtonClick("C")}>
            C
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  calculator: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
    position: "relative",
    zIndex: 1001,
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "red",
    cursor: "pointer",
    position: "absolute",
    right: "10px",
    top: "10px",
    fontSize: "20px",
  },
  display: {
    width: "100%",
    padding: "10px",
    fontSize: "20px",
    textAlign: "right",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginTop: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "18px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "#f0f0f0",
  },
};

export default Calculator;
