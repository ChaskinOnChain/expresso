import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import User from "./scenes/UserHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
