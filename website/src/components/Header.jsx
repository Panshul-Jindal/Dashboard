// import React from "react";

// function Header() {
//   return (
//     <header>
//       <h1>Keeper</h1>
//     </header>
//   );
// }

// export default Header;
import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import Calculator from "./Calculator"; // Import the Calculator component

function Header() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <header style={styles.header}>
      <h1>Notes Keeper</h1>
      <button
        style={styles.iconButton}
        onClick={() => setIsCalculatorOpen(true)}
      >
        <FaCalculator size={20} />
      </button>

      {isCalculatorOpen && (
        <Calculator onClose={() => setIsCalculatorOpen(false)} />
      )}
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f5ba13",
    color: "white",
    fontSize: "24px",
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "white",
  },
};

export default Header;
