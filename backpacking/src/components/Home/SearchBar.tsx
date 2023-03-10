import { Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { filterType } from "../../pages/Home";

type searchBarType = {
  setSearch: React.Dispatch<React.SetStateAction<filterType>>;
};

const SearchBar = (props: searchBarType) => {
  const [term, setTerm] = useState("");

  const handleSearch = (e: string) => {
    props.setSearch((prev) => ({ ...prev, text: e }));
    setTerm(e);
  };

  return (
    <div className="mb-10">
      <Heading size={"md"}>Search for a country here</Heading>
      <Input
        marginTop={"8px"}
        value={term}
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        placeholder="Search For a country"
      />
    </div>
  );
};

export default SearchBar;
