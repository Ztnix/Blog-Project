import LoginForm from "./loginForm";

export default function LoginPage() {
  return (
    <div className="bg-[#282429] flex-1 flex border-b border-gray-600 justify-center">
      <div className="mainContainer flex flex-col gap-6 p-8">
        <div className="formText text-white flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl">Log in</h2>
          <p className="text-[#afafaf]">
            Access your account and{" "}
            <span className="text-blue-500 font-bold">engage</span> in
            discussions!
          </p>
        </div>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}
