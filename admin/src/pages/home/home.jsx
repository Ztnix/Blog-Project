import img1 from "../../assets/img1.jpg";
import PostPreview from "./postPreview";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
//add no posts screen

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-[#282429] flex-1 flex border-b border-gray-600 justify-center">
      <div className="mainContainer flex flex-col gap-6 mb-8">
        <div className="welcomeContainer flex border-b border-gray-600">
          <div className="leftSide w-1/2 flex justify-center p-4 border-r border-gray-600">
            <div className="w-1/2 flex flex-col gap-8 m-8 justify-center">
              <h1 className="font-bold text-5xl text-white">
                Welcome to my blog
              </h1>
              <p className="text-white text-[1.2rem]">
                Hi there! I don't feel like typing a whole description for this
                made up blog, so here: Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quaerat, saepe fugiat. Delectus quibusdam
                magnam commodi, dignissimos.
              </p>
              <div className="bottomContainer text-white flex gap-4">
                {user ? (
                  <></>
                ) : (
                  <>
                    <button
                      className="p-2 text-[1rem] rounded-lg bg-linear-to-t from-violet-600 to-fuchsia-700"
                      onClick={() => navigate("/signup")}
                    >
                      Sign up now!
                    </button>
                  </>
                )}
                <button
                  className="p-2 rounded-lg bg-linear-to-t from-blue-700 to-blue-500"
                  onClick={() => navigate("/about")}
                >
                  About author
                </button>
              </div>
            </div>
          </div>
          <div className="rightSide w-1/2">
            <img src={img1} alt="BGImage" />
          </div>
        </div>

        <h1 className="font-bold text-5xl text-center text-white mb-4 mt-4">
          Available blog articles:
        </h1>
        <PostPreview></PostPreview>
      </div>
    </div>
  );
}
