import { useState } from "react";
import { searchInputType } from "../pages/Home";

type searchBarType = {
  setSearch: React.Dispatch<React.SetStateAction<searchInputType>>;
};

const SearchBar = (props: searchBarType) => {
  const [term, setTerm] = useState("");

  const handleSearch = (e: string) => {
    props.setSearch((prev) => ({ ...prev, text: e }));
    setTerm(e);
  };

  return (
    <div>
      <p>Search for a country here</p>
      <input
        value={term}
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        placeholder="Search For a country"
      />
    </div>
  );
};

export default SearchBar;
