import SignUpForm from "./signupForm";

export default function SignUpPage() {
  return (
    <div className="bg-[#282429] flex-1 flex border-b border-gray-600 justify-center">
      <div className="mainContainer flex flex-col gap-6 p-8">
        <div className="formText text-white flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl">Sign Up</h2>
          <p className="text-[#afafaf]">
            {" "}
            and participate in the{" "}
            <span className="text-blue-500 font-bold">journey</span> with the
            <span className="text-blue-500 font-bold"> community!</span>
          </p>
        </div>
        <SignUpForm></SignUpForm>
      </div>
    </div>
  );
}
