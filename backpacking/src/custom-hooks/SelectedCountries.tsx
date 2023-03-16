import Countries from "../../public/text/Countries";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { Ijourney } from "../interfaces/Interfaces";
import SuggestedCountries from "../components/SuggestedCountries";
import { Button, Input } from "@chakra-ui/react";

type SelectedCountriesProps = {
  setSelected: React.Dispatch<React.SetStateAction<Ijourney>>;
  selected: string[];
};

const SelectedCountries = ({
  setSelected,
  selected,
}: SelectedCountriesProps) => {
  const [search, setSearch] = useState<string>("");

  function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function addCountry(search: string) {
    setSelected((prev) => ({ ...prev, countries: [...selected, search] }));
    setSearch("");
  }

  return (
    <div>
      <div className="border border-theme-green rounded-lg mb-5">
        {selected.map((country) => (
          <div key={country}>
            {country}
            <button
              onClick={() => {
                setSelected((prev) => ({
                  ...prev,
                  countries: selected.filter((item) => item !== country),
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
