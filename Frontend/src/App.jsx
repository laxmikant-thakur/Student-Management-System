import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import CreateStudent from "./CreateStudent";
import GetStudentsPage from "./GetStudentsPage";

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<CreateStudent />} />
          <Route path="/students" element={<GetStudentsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
