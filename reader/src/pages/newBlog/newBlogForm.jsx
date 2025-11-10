import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewBlogForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
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
      const res = await fetch("http://localhost:3000/newBlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const body = await res.json();

      if (!res.ok) {
        setMsg(body.errors || "Blog Creation failed");
        return;
      }

      navigate(body.redirect || "/home");
    } catch (err) {
      console.log(err);
      setMsg("Network error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-[35%] space-y-4 h-fit bg-[#3b3b3b] text-white p-8 rounded-xl"
    >
      <div className="flex flex-col gap-2">
        <label className="block">Blog's Title:</label>
        <input
          maxLength={60}
          name="title"
          value={form.title}
          onChange={onChange}
          className="border px-2 py-1 w-full text-[#797979]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="block">Blog's Content:</label>
        <textarea
          name="content"
          value={form.content}
          onChange={onChange}
          className="border px-2 py-1 w-full text-[#797979] rounded"
          rows={12}
        />
      </div>

      <button
        type="submit"
        className="bg-linear-to-t from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 transition-colors duration-200 text-white px-4 py-2 rounded w-full mt-2"
      >
        Create Blog
      </button>

      {msg && (
        <div className="text-red-600 mt-2">
          {msg.map((mes, i) => (
            <p key={i}>{mes.msg}</p>
          ))}
        </div>
      )}
    </form>
  );
}
