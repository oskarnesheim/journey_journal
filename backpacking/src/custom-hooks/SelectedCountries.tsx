import Countries from "../../public/text/Countries";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { Ijourney } from "../interfaces/Interfaces";
import SuggestedCountries from "../components/SuggestedCountries";
import { Button, Input } from "@chakra-ui/react";

type SelectedCountriesProps = {
  setJourney: React.Dispatch<React.SetStateAction<Ijourney>>;
  journey: Ijourney;
};

const SelectedCountries = ({ setJourney, journey }: SelectedCountriesProps) => {
  const [search, setSearch] = useState<string>("");

  function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function addCountry(search: string) {
    setJourney((prev) => ({
      ...prev,
      countries: [...journey.countries, search],
    }));
    setSearch("");
  }

  return (
    <div>
      <div className="border border-theme-green rounded-lg mb-5">
        {journey.countries.map((country) => (
          <div key={country}>
            {country}
            <button
              onClick={() => {
                setJourney((prev) => ({
                  ...prev,
                  countries: journey.countries.filter(
                    (item) => item !== country
                  ),
                }));
              }}
            >
              <img
                src="../../public/images/cancelIcon.png"
                className="ml-2"
                width={14}
                alt="Remove"
              />
            </button>
          </div>
        ))}
      </div>
      <Input required type="text" value={search} onChange={updateSearch} />
      <SuggestedCountries search={search} setSearch={setSearch} />
      <Button className="mt-5" onClick={() => addCountry(search)}>
        AddCountry
      </Button>
    </div>
  );
};

export default SelectedCountries;
