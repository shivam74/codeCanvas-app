import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";

const MainCategories = () => {
  const [searchParams] = useSearchParams();
  const currentCat = searchParams.get("cat");

  const categories = [
    { name: "All Posts", value: null },
    { name: "Web Design", value: "web-design" },
    { name: "Development", value: "development" },
    { name: "Databases", value: "databases" },
    { name: "Search Engines", value: "seo" },
    { name: "Marketing", value: "marketing" },
  ];

  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
        {categories.map((cat) => {
          const isActive =
            (!cat.value && !currentCat) || currentCat === cat.value;

          return (
            <Link
              key={cat.name}
              to={cat.value ? `/posts?cat=${cat.value}` : "/posts"}
              className={`rounded-full px-4 py-2 ${
                isActive
                  ? "bg-blue-800 text-white"
                  : "hover:bg-blue-50"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      <span className="text-xl font-medium">|</span>

      {/* search */}
      <Search />
    </div>
  );
};

export default MainCategories;