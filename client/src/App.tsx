import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import User from "./scenes/UserHome";
import Discover from "./scenes/Discover";
import CreateBlog from "./scenes/CreateBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
