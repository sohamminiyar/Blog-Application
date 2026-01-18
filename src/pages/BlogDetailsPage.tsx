import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "@/features/blogs/hooks"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CalendarIcon } from "lucide-react";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch single blog data
  const { data: blog, isLoading, isError } = useBlog(id!);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-4xl space-y-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Blog not found</h2>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-6 pl-0 hover:bg-transparent hover:text-slate-600"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Feed
      </Button>

      <article className="space-y-6">
        {/* Cover Image */}
        <div className="aspect-video w-full overflow-hidden rounded-xl border bg-slate-100 shadow-sm">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-full w-full object-cover"
            onError={(e) =>
              (e.currentTarget.src =
                "https://placehold.co/800x400?text=No+Image")
            }
          />
        </div>

        {/* Header Info */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {blog.category.map((cat: string) => (
              <Badge key={cat} variant="secondary" className="text-slate-700">
                {cat}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight lg:text-5xl">
            {blog.title}
          </h1>

          <div className="flex items-center text-slate-500 text-sm font-medium">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {new Date(blog.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 my-8" />

        {/* Main Content */}
        <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
          {blog.content.split("\n").map((paragraph: string, index: number) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
