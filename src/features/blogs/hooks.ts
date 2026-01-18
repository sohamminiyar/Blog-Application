import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlog, fetchBlogs, fetchBlog } from "./api";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Explicitly await the API call here to prevent the race condition
    mutationFn: async (newBlogData: any) => {
      return await createBlog(newBlogData);
    },
    onSuccess: () => {
      // This forces a refetch of the "blogs" query
      // Because we awaited the mutationFn above, this only runs AFTER the save is complete
      return queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => fetchBlog(id),
    enabled: !!id, // Only fetch if an ID exists
  });
};