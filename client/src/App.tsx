import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./scenes/Home/Home";
import Login from "./scenes/Login";
import Discover from "./scenes/Discover";
import CreateBlog from "./scenes/CreateBlog";
import ProfilePage from "./scenes/ProfilePage";
import BlogDetail from "./scenes/BlogDetail";
import Results from "./scenes/Results";
import Footer from "./components/Footer";
import Update from "./scenes/Update";
import NFT from "./components/NFT";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/update" element={<Update />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/discover/:id" element={<BlogDetail />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/search/:name/*" element={<Results />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
