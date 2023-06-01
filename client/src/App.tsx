import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import Discover from "./scenes/Discover";
import CreateBlog from "./scenes/CreateBlog";
import ProfilePage from "./scenes/ProfilePage";
import BlogDetail from "./scenes/BlogDetail";
import TagResults from "./scenes/TagResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:id" element={<BlogDetail />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/tag/*" element={<TagResults />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
