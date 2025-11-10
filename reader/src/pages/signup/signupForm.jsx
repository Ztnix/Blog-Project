import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
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
      const res = await fetch("http://localhost:3000/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const body = await res.json();

      if (!res.ok) {
        setMsg(body.errors || "Signup failed");
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
      className="w-full space-y-4 bg-[#3b3b3b] text-white p-8 rounded-xl"
    >
      <div className="flex flex-col gap-2">
        <label className="block">Email</label>
        <input
          name="username"
          value={form.username}
          onChange={onChange}
          className="border px-2 py-1 w-full text-[#797979]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="block">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          className="border px-2 py-1 w-full text-[#797979]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="block">Password Confirm</label>
        <input
          name="passwordConfirm"
          type="password"
          value={form.passwordConfirm}
          onChange={onChange}
          className="border px-2 py-1 w-full text-[#797979]"
        />
      </div>

      <button
        type="submit"
        className="bg-linear-to-t from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 transition-colors duration-200 text-white px-4 py-2 rounded w-full mt-2"
      >
        Sign up
      </button>

      {msg && (
        <div className="text-red-600 mt-2">
          {msg.map((mes, i) => (
            <p key={i}>{mes.msg}</p>
          ))}
        </div>
      )}

      <p className="text-[#afafaf] text-center">
        ¿Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:text-blue-300 transition-colors duration-200 font-bold"
        >
          Log In!
        </Link>
      </p>
    </form>
  );
}
