import { useBlogs } from "./hooks";
import { BlogCard } from "./BlogCard";

export function BlogList() {
  const { data, isLoading } = useBlogs();

  if (isLoading) return <p>Loading blogs...</p>;

  return (
    <div className="space-y-4">
      {data?.slice(0, 10).map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
