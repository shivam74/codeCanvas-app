import { useSearchParams } from "react-router-dom";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    const params = Object.fromEntries(searchParams);

    if (params.sort !== e.target.value) {
      params.sort = e.target.value;
      setSearchParams(params);
    }
  };

  const handleCategoryChange = (category) => {
    const params = Object.fromEntries(searchParams);

    // ✅ Remove category if "All"
    if (category === "general") {
      delete params.cat;
    } else {
      params.cat = category;
    }

    setSearchParams(params);
  };

  const currentSort = searchParams.get("sort");
  const currentCat = searchParams.get("cat");

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />

      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        
        {["newest", "popular", "trending", "oldest"].map((type) => (
          <label
            key={type}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="sort"
              value={type}
              checked={currentSort === type}
              onChange={handleFilterChange}
              className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
            />
            {type === "newest"
              ? "Newest"
              : type === "popular"
              ? "Most Popular"
              : type === "trending"
              ? "Trending"
              : "Oldest"}
          </label>
        ))}
      </div>

      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        
        <span
          className={`underline cursor-pointer ${
            !currentCat ? "font-bold" : ""
          }`}
          onClick={() => handleCategoryChange("general")}
        >
          All
        </span>

        {[
          "web-design",
          "development",
          "databases",
          "seo",
          "marketing",
        ].map((cat) => (
          <span
            key={cat}
            className={`underline cursor-pointer ${
              currentCat === cat ? "font-bold" : ""
            }`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat.replace("-", " ")}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;