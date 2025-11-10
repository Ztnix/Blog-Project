import img1 from "../../assets/chad.png";

export default function AboutPage() {
  return (
    <div className="bg-[#282429] flex-1 flex border-b border-gray-600 justify-center">
      <div className="mainContainer text-white flex flex-col w-[60%]  mb-8 ">
        <h1 className="text-4xl mt-8 mb-4 text-center">
          About <span className="text-blue-500 font-bold">me</span>
        </h1>
        <div className="text-[1.1rem] ">
          <div className="imgCont shape-custom m-4 aspect-square w-[40%] float-left">
            <img
              src={img1}
              alt=""
              className="img float-left w-full h-full rounded-[9999px]"
            />
          </div>

          <div className="textContainer mb-8">
            <p className="m-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quo
              quisquam quasi mollitia ipsum id vel culpa veniam ipsa error.
              Omnis dolorem laboriosam itaque quisquam voluptate temporibus hic
              saepe iste.Quidem quam quis expedita provident. Lorem ipsum dolor,
              sit amet consectetur adipisicing elit.
            </p>
            <p className="m-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              incidunt placeat numquam. Dolorum fugiat ipsa dolorem architecto
              debitis quidem repellendus at, cupiditate corporis beatae nulla?
              Quidem quam quis expedita provident. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Quis dicta alias porro dolores ad
              amet, cum provident nam quam aliquid reprehenderit voluptates ex
              tenetur odit!
            </p>
            <p className="m-4">
              {" "}
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In error
              dolorum nemo dolores vero? Consequuntur accusamus deleniti debitis
              minus ex. Fugiat iusto repudiandae ducimus aliquid, quod quaerat
              nulla magni molestias.Quidem quam quis expedita provident.Quis
              dicta alias porro dolores ad amet, cum
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo,
              velit magnam. Libero distinctio non esse facere ut temporibus
              asperiores laboriosam perferendis unde ea, tempore, excepturi
              autem aliquid! Suscipit, perspiciatis eaque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
