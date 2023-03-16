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
// import { useEffect, useState } from "react";
// import Countries from "../../public/text/Countries";

// type SuggestedCountriesProps = {
//   search: string;
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
// };

// function SuggestedCountries({ search, setSearch }: SuggestedCountriesProps) {
//   const [suggestedCountries, setSuggestedCountries] = useState<string[]>([]);

//   useEffect(() => {
//     filterCountries();
//     console.log("search", search);
//     console.log("suggestedCountries", suggestedCountries);
//   }, [search]);

//   function filterCountries() {
//     const filteredCountries = Countries.filter((country) =>
//       country.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setSuggestedCountries(filteredCountries.map((country) => country.name));
//   }

//   return (
//     <div>
//       {suggestedCountries.map((country) => (
//         <div key={country} onClick={() => setSearch(country)}>
//           {country}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SuggestedCountries;
