import { useState, useEffect } from "react";
import ContainerLoadingSpinner from "../../components/ui/containerLoadingSpinner";
import img1 from "../../assets/chad.png";
import { Link } from "react-router-dom";

/* eslint-disable no-unused-vars */

export default function PostPreview() {
  const [msg, setMsg] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getPosts() {
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/getBlogs", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const body = await res.json();
      setPosts(body.posts);

      if (!res.ok) {
        setMsg(body?.errors || body?.error || "Could not fetch blogs");
        return;
      }
    } catch (err) {
      console.log(err);
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) return <ContainerLoadingSpinner></ContainerLoadingSpinner>;

  return (
    <div className="flex justify-center">
      {posts && (
        <div
          className="posts w-[60%] m-4 
        grid grid-cols-[repeat(auto-fill,minmax(clamp(200px,100%,300px),1fr))] gap-8"
        >
          {posts.map((post, i) => (
            <Link
              key={post.id}
              className="post outline-1 outline-gray-500 rounded-lg"
              to={`/blog/${post.title}`}
            >
              <img src={img1} className="rounded-lg" />
              <div className="textContentPost p-6">
                <h2
                  className="text-white font-bold w-100% line-clamp-3  "
                  title={post.title}
                >
                  {post.title}
                </h2>
                <div className="tagsContainer mt-2 mb-2">
                  <div className="tag date bg-[#364345] text-[#92ceb0] font-bold w-fit p-0.5 rounded-lg">
                    {post.created_at}
                  </div>
                </div>
                <p className="text-gray-400 line-clamp-5 leading-4 text-[.9rem]">
                  {post.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
