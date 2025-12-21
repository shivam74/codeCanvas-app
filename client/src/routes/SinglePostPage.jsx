import { Link } from "react-router-dom";
import IKImage from "../components/IKImage";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";

const SinglePostPage = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam modi
            eum aut.
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">John Doe</Link>
            <span>on</span>
            <Link className="text-blue-800">Web Design</Link>
            <span>2 days ago</span>
          </div>
          <p className="text-gray-500 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur laborum non fugit accusantium. Ut enim, quibusdam impedit quidem fugiat excepturi repellendus porro autem minus?</p>
        </div>
        <div className="hidden lg:block w-2/5">
          <IKImage src="postImg.jpeg" w="800" className="rounded-2xl"/>
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:test-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis ullam exercitationem deleniti odio nam. Aspernatur architecto saepe mollitia nemo culpa magnam unde ullam, temporibus libero dolores aliquid quaerat quia earum!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius maiores pariatur dolores, at iusto veniam ea, corrupti tenetur distinctio autem dolor laborum iure esse repellendus? Eaque deserunt repudiandae aliquid quisquam!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ad tempora consequatur molestias fuga asperiores temporibus autem alias aut, quos neque illum esse eius, rem magni similique quam ipsa optio. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae at aspernatur ratione consequatur minus accusantium fugit. Deserunt consectetur, quae optio asperiores perferendis commodi, veritatis numquam eius rerum, exercitationem error consequuntur.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur inventore quasi asperiores. Nam quod consectetur, id at, cum earum soluta voluptatibus rerum eum explicabo magni eligendi cumque quis nemo perferendis!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, molestiae cupiditate? Ad illo praesentium molestias, unde alias et asperiores odit voluptatum, labore fuga aliquam modi ipsam nihil accusantium repellat qui?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur inventore quasi asperiores. Nam quod consectetur, id at, cum earum soluta voluptatibus rerum eum explicabo magni eligendi cumque quis nemo perferendis!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, molestiae cupiditate? Ad illo praesentium molestias, unde alias et asperiores odit voluptatum, labore fuga aliquam modi ipsam nihil accusantium repellat qui?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur inventore quasi asperiores. Nam quod consectetur, id at, cum earum soluta voluptatibus rerum eum explicabo magni eligendi cumque quis nemo perferendis!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, molestiae cupiditate? Ad illo praesentium molestias, unde alias et asperiores odit voluptatum, labore fuga aliquam modi ipsam nihil accusantium repellat qui?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur inventore quasi asperiores. Nam quod consectetur, id at, cum earum soluta voluptatibus rerum eum explicabo magni eligendi cumque quis nemo perferendis!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, molestiae cupiditate? Ad illo praesentium molestias, unde alias et asperiores odit voluptatum, labore fuga aliquam modi ipsam nihil accusantium repellat qui?
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className=" mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <IKImage src="userImg.jpeg"
            className="w-12 h-12 rounded-full object-cover"
            w="48"
            h="48"
            />
            <Link className="text-blue-800">John Doe</Link>
          </div>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="flex gap-1">
              <Link>
              <IKImage src="facebook.svg"></IKImage>
              </Link>
              <Link>
              <IKImage src="instagram.svg"></IKImage>
              </Link>
            </div>
          </div>
          <PostMenuActions/>
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
          <Link className="underline">All</Link>
          <Link className="underline" to="/">
            Web Design
          </Link>
          <Link className="underline" to="/">
            Development
          </Link>
          <Link className="underline" to="/">
            Databases
          </Link>
          <Link className="underline" to="/">
            Search Engines
          </Link>
          <Link className="underline" to="/">
            Marketing
          </Link>
        </div>
        <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
        <div className="mb-8"><Search/></div>
        </div>
      </div>
      <Comments/>
    </div>
  );
};

export default SinglePostPage;