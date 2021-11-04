// Packages
import React from "react";

// Components
import { Link } from "react-router-dom";

// -------------------------

const Selection = () => {
  return (
    <div className="container">
      <h1> AAS Management</h1>
      <ul>
        <li>
          <Link to={"/aas"}>AAS</Link>
        </li>
      </ul>
    </div>
  );
};

export default Selection;
