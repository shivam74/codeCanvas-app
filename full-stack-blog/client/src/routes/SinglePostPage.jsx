import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
    enabled: Boolean(slug),
  });

  if (isPending) return <p className="py-8">Loading...</p>;
  if (error) {
    return (
      <p className="py-8 text-red-600">
        {error?.response?.data?.message || error.message || "Something went wrong"}
      </p>
    );
  }
  if (!data) return <p className="py-8">Post not found.</p>;

  const authorName = data.user?.username || "Anonymous";
  const authorImg = data.user?.img;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm flex-wrap">
            <span>Written by</span>
            <Link
              className="text-blue-800"
              to={`/posts?author=${encodeURIComponent(authorName)}`}
            >
              {authorName}
            </Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>
              {data.createdAt ? format(data.createdAt) : ""}
            </span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} w="600" className="rounded-2xl" />
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          {data.content ? (
            <div
              className="post-content ql-editor"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          ) : (
            <p className="text-gray-500">No body for this post.</p>
          )}
        </div>
        <div className="px-4 h-max sticky top-8">
          <h2 className="mb-4 text-sm font-medium">Author</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {authorImg && (
                <Image
                  src={authorImg}
                  className="w-12 h-12 rounded-full object-cover"
                  w="48"
                  h="48"
                />
              )}
              <Link
                className="text-blue-800"
                to={`/posts?author=${encodeURIComponent(authorName)}`}
              >
                {authorName}
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur
            </p>
            <div className="flex gap-2">
              <Link to="/">
                <Image src="facebook.svg" />
              </Link>
              <Link to="/">
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h2 className="mt-8 mb-4 text-sm font-medium">Categories</h2>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/posts">
              All
            </Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h2 className="mt-8 mb-4 text-sm font-medium">Search</h2>
          <Search />
        </div>
      </div>
      {data._id && <Comments postId={data._id} />}
    </div>
  );
};

export default SinglePostPage;
