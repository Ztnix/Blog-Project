import img1 from "../../assets/img1.jpg";
import ContainerLoadingSpinner from "../../components/ui/containerLoadingSpinner";
import { useEffect, useState } from "react";
import AddCommentSection from "../../components/blog/addCommentSection";
import { useParams } from "react-router-dom";
import CommentSection from "../../components/blog/commentSection";

export default function FullBlog() {
  const { title } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/blog/${encodeURIComponent(title)}`
        );
        if (!res.ok) {
          setPost(null);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPost(data.post);
      } catch (e) {
        console.log(e);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [title]);

  if (loading) return <ContainerLoadingSpinner></ContainerLoadingSpinner>;
  if (!post)
    return (
      <div className="bg-[#282429] flex border-b border-gray-600 justify-center">
        <h1 className="text-white text-6xl">Not Found!</h1>
      </div>
    );

  return (
    <>
      <div className="bg-[#282429] flex-1 flex border-b border-gray-600 justify-center">
        <div className="mainContainer w-[50%] flex flex-col gap-6 mb-8">
          <div className="imgContainer w-full h-[300px] overflow-hidden rounded-b-lg">
            <img src={img1} className="img w-full h-auto object-cover" />
          </div>
          <h1 className="blogTitle text-white font-bold text-4xl ">
            {post.title}
          </h1>
          <div className="tagsContainer">
            <div className="tag date bg-[#364345] text-[#92ceb0] font-bold w-fit p-0.5 rounded-lg">
              {post.created_at}
            </div>
          </div>
          <p className="text-gray-400 line-clamp-5 leading-6 text-[1.1rem]">
            {post.content}
          </p>
          <AddCommentSection
            postTitle={encodeURIComponent(title)}
          ></AddCommentSection>
          <CommentSection
            postTitle={encodeURIComponent(title)}
          ></CommentSection>
        </div>
      </div>
    </>
  );
}
