import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/create" element={<CreateArticle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;