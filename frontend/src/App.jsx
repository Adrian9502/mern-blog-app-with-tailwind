import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";

function App() {
  return (
    <div className="bg-slate-900 min-h-[100vh]">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-blog" element={<AddBlog />} />
      </Routes>
    </div>
  );
}

export default App;
