import NewBlogForm from "./newBlogForm";

export default function NewBlog() {
  return (
    <div className="bg-[#282429] flex-1 flex border-b border-gray-600 justify-center">
      <div className="formContainer flex p-12 justify-center w-full">
        <NewBlogForm></NewBlogForm>
      </div>
    </div>
  );
}
