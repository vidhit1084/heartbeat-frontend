import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="d-flex p-3">
      <Link className="text-primary text-decoration-none mx-3" to="/InStore">
        InStore
      </Link>
      <Link className="text-primary text-decoration-none" to="/onPrem">
        OnPrem
      </Link>
    </div>
  );
};

export default NavBar;
