import { useState, useEffect } from "react";
import ContainerLoadingSpinner from "../ui/containerLoadingSpinner";
/* eslint-disable no-unused-vars */

export default function CommentSection({ postTitle }) {
  const [msg, setMsg] = useState(null);
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getComments(postTitle) {
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/getComments/${postTitle}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const body = await res.json();
      setComments(body.comments);

      if (!res.ok) {
        setMsg(body?.errors || body?.error || "Could not fetch comments");
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
    getComments(postTitle);
  }, [postTitle]);

  if (loading)
    return (
      <div className="bg-[#282429] flex border-b border-gray-600 justify-center">
        <ContainerLoadingSpinner></ContainerLoadingSpinner>;
      </div>
    );

  return (
    <>
      {comments && comments.length > 0 ? (
        <div>
          <div class="absolute left-1/2 -translate-x-1/2  w-full border-t  border-gray-600"></div>
          <div className="comments flex flex-col gap-4 pt-6 pb-6">
            {comments.map((comment, i) => (
              <div className="commentContainer p-3 rounded-lg outline-1 outline-gray-500">
                <div className="commentTop flex gap-3">
                  <p className="CommentUser text-blue-500 font-bold">
                    {comment.User.username}
                  </p>
                  <div className="tag date bg-[#364345] text-[#92ceb0] font-bold w-fit p-0.5 rounded-lg">
                    {comment.created_at}
                  </div>
                </div>
                <div className="commentBot text-gray-400">
                  {comment.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div class="absolute left-1/2 -translate-x-1/2  w-full border-t  border-gray-600"></div>
          <h2 className="noComments font-bold text-white text-3xl text-center  pt-6">
            No comments yet! Be the first one!
          </h2>
        </div>
      )}
    </>
  );
}
