import { useEffect, useState } from "react";
import Countries from "../../public/text/Countries";

type SuggestedCountriesProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  addCountry: (search: string) => void;
};

function SuggestedCountries({
  search,
  setSearch,
  addCountry,
}: SuggestedCountriesProps) {
  function handleCountryClick(country: string) {
    addCountry(country);
  }

  return (
    <div className="shadow-2xl rounded-2xl">
      {search &&
        Countries.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        ).map((country) => (
          <div
            className="hover:bg-theme-green h-10 "
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
