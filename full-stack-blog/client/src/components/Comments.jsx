import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const api = import.meta.env.VITE_API_URL;

  const { data: comments, isPending, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axios.get(`${api}/comments/${postId}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: Boolean(postId && api),
  });

  const mutation = useMutation({
    mutationFn: async (body) => {
      const token = await getToken();
      return axios.post(`${api}/comments/${postId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setDesc("");
      toast.success("Comment posted");
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        "Failed to add comment";
      toast.error(typeof msg === "string" ? msg : "Failed to add comment");
    },
  });

  if (!postId) return null;

  return (
    <div className="flex flex-col gap-6 mt-8">
      <h2 className="text-xl font-medium">Comments</h2>

      {isLoaded && isSignedIn ? (
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const text = desc.trim();
            if (!text) return;
            mutation.mutate({ desc: text });
          }}
        >
          <textarea
            className="w-full rounded-xl border border-gray-200 p-3 min-h-[100px]"
            placeholder="Write a comment..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            type="submit"
            disabled={mutation.isPending}
            className="self-start py-2 px-4 rounded-xl bg-blue-800 text-white text-sm disabled:opacity-50"
          >
            {mutation.isPending ? "Posting..." : "Post comment"}
          </button>
        </form>
      ) : isLoaded ? (
        <p className="text-sm text-gray-500">Sign in to leave a comment.</p>
      ) : null}

      {isPending && <p className="text-sm text-gray-500">Loading comments...</p>}
      {error && (
        <p className="text-sm text-red-600">Could not load comments.</p>
      )}

      <div className="flex flex-col gap-2">
        {(comments || []).map((c) =>
          c?._id ? <Comment key={c._id} comment={c} postId={postId} /> : null
        )}
      </div>
    </div>
  );
};

export default Comments;
