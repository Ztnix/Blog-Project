import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import ContainerLoadingSpinner from "../ui/containerLoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
/* eslint-disable no-unused-vars */

export default function PostAuditPanel({ onClose, onNavigate }) {
  const [msg, setMsg] = useState(null);
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <>
      {isAdmin ? (
        <div className="postAuditContainer flex flex-col  gap-4 relative">
          <button
            className="absolute left-[-30%] px-2 py-1 text-sm bg-gray-600 rounded w-fit bg-linear-to-t from-blue-700 to-blue-500"
            onClick={() => onNavigate(null)}
          >
            Go back
          </button>
          <div className="postList w-full flex flex-col items-center gap-4">
            {posts && (
              <div
                className="posts w-[80%]  
       flex flex-col gap-8"
              >
                {posts.map((post, i) => (
                  <div
                    key={post.id}
                    className="post flex divide-x gap-4 outline-1 outline-gray-500 rounded-lg"
                  >
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
                    <div className="flex flex-col gap-4">
                      <button
                        className="headerOption bg-linear-to-t from-blue-700 to-blue-500 px-2 py-1 rounded  font-bold"
                        onClick={() => navigate(`/blog/${post.title}`)}
                      >
                        Go to Post
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="notAdmin">
          <h1>FORBIDDEN</h1>
        </div>
      )}
    </>
  );
}
