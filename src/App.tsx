import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplitViewPage from "@/pages/SplitViewPage"; 
import CreateBlog from "@/pages/CreateBlog"; 

export default function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        {/* Redirect root to blogs */}
        <Route path="/" element={<Navigate to="/blogs" replace />} />
        
        {/* Both routes render the same SplitView page */}
        <Route path="/blogs" element={<SplitViewPage />} />
        <Route path="/blogs/:id" element={<SplitViewPage />} />
        
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  );
}