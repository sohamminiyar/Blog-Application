import type { Blog } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  blog: Blog;
};

export function BlogCard({ blog }: Props) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition">
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {blog.description}
        </p>
      </CardContent>
    </Card>
  );
}
