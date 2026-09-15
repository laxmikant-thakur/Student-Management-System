import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <div className="brand-icon">SM</div>
        <span>Student Manager</span>
      </NavLink>

      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          Create Student
        </NavLink>
        <NavLink
          to="/students"
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          Get Students
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
