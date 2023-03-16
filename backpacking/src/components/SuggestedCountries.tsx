import { useEffect, useState } from "react";
import Countries from "../../public/text/Countries";

type SuggestedCountriesProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

function SuggestedCountries({ search, setSearch }: SuggestedCountriesProps) {
  function handleCountryClick(country: string) {
    setSearch(country);
  }

  return (
    <div className="">
      {search &&
        Countries.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        ).map((country) => (
          <div
            key={country.name}
            onClick={() => handleCountryClick(country.name)}
          >
            {country.name}
          </div>
        ))}
    </div>
  );
}

export default SuggestedCountries;
