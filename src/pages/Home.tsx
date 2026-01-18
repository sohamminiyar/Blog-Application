import { useNavigate } from "react-router-dom";
import { BlogList } from "@/features/blogs/BlogList";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={() => navigate("/create")}>Create Blog</Button>
      </div>
      <BlogList />
    </div>
  );
}
