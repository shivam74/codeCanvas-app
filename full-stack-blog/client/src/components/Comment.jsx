import { format } from "timeago.js";
import Image from "./Image";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

const Comment = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || error?.response?.data;
      toast.error(typeof msg === "string" ? msg : "Something went wrong");
    },
  });

  // ✅ SAFE user handling
  const username = comment.user?.username || "Anonymous";
  const userImg = comment.user?.img || "/default-avatar.png";

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        
        {/* ✅ Safe image */}
        {userImg && (
          <Image
            src={userImg}
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}

        {/* ✅ Safe username */}
        <span className="font-medium">{username}</span>

        {/* ✅ Safe date */}
        <span className="text-sm text-gray-500">
          {comment.createdAt ? format(comment.createdAt) : ""}
        </span>

        {/* ✅ Safe delete condition */}
        {user &&
          (comment.user?.username === user.username || role === "admin") && (
            <span
              className="text-xs text-red-300 hover:text-red-500 cursor-pointer"
              onClick={() => mutation.mutate()}
            >
              delete
              {mutation.isPending && <span>(in progress)</span>}
            </span>
          )}
      </div>

      {/* ✅ Safe description */}
      <div className="mt-4">
        <p>{comment.desc || "No comment provided."}</p>
      </div>
    </div>
  );
};

export default Comment;