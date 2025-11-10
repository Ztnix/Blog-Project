import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AddCommentSection({ postTitle }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    comment: "",
  });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);

    try {
      const payload = { ...form, postTitle };
      const res = await fetch("http://localhost:3000/newComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const body = await res.json();

      if (!res.ok) {
        setMsg(body?.errors || body?.error || "Comment Creation failed");
        return;
      }
      setForm({ comment: "" });
      navigate(body.redirect || "/home");
    } catch (err) {
      console.log(err);
      setMsg("Network error");
    }
  }
  return (
    <>
      {user ? (
        <div>
          <div class="absolute left-1/2 -translate-x-1/2  w-full border-t  border-gray-600"></div>
          <div className="flex flex-col gap-6 pt-6 pb-6">
            <h2 className="cTitle text-3xl text-white">Leave a comment</h2>
            <p className="text-gray-400">Message</p>
            <form
              onSubmit={onSubmit}
              className="w-full space-y-4 bg-[#3b3b3b] text-white p-8 rounded-xl"
            >
              <div className="flex flex-col gap-2">
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={onChange}
                  className="border px-2 py-1 w-full text-[#797979] rounded"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="bg-linear-to-t from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 transition-colors duration-200 text-white px-4 py-2 rounded w-full mt-2"
              >
                Comment
              </button>
              {msg && (
                <div className="text-red-600 mt-2">
                  {msg.map((mes, i) => (
                    <p key={i}>{mes.msg}</p>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div class="absolute left-1/2 -translate-x-1/2  w-full border-t  border-gray-600"></div>
          <div className="flex flex-col gap-6 pt-6 pb-6 mt-6 items-center bg-[#313131] border border-gray-600">
            <h2 className="cTitle text-4xl text-white">Leave a comment</h2>
            <h2 className="cTitle text-3xl text-white">
              You need to be logged in!
            </h2>
            <button
              className="p-2 text-[1rem] rounded-lg bg-linear-to-t from-blue-700 to-blue-500"
              onClick={() => navigate("/signup")}
            >
              Sign up now!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
