import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SearchOrder() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) {
      return;
    }
    console.log(`order/${query}`);
    navigate(`order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Order #"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="rounded-full bg-yellow-100 px-4 py-2 text-sm placeholder:text-stone-900 w-28 sm:w-[300px] sm:focus:w-[500px] transition-all duration-300 focus:outline-none focus:ring-yellow-500 focus:ring focus:ring-opacity-50"
      ></input>
    </form>
  );
}

export default SearchOrder;
