import Countries from "../../public/text/Countries";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { Ijourney } from "../interfaces/Interfaces";
import SuggestedCountries from "../components/SuggestedCountries";
import { Button, Input } from "@chakra-ui/react";
import GeneralButton from "../components/GeneralButton";

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
    if (search === "") return;
    setJourney((prev) => ({
      ...prev,
      countries: [...journey.countries, search],
    }));
    setSearch("");
  }

  // const handleKeypressPassword = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (e.key === "Enter") {
  //     () => addCountry(search);
  //   }
  // };

  return (
    <div>
      <div className=" rounded-lg mb-5">
        {journey.countries.map((country) => (
          <div
            key={country}
            className="relative h-10 hover:bg-theme-green rounded-2xl"
          >
            <div className="absolute left-3 underline underline-offset-8">
              {country}
            </div>
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
                className="ml-2 absolute right-5 bottom-3"
                width={20}
                alt="Remove"
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-row dark:text-theme-green">
        <div className="flex flex-col w-4/5">
          <Input
            width="100%"
            marginY={"20px"}
            type="text"
            value={search}
            onChange={updateSearch}
            className=""
          />
          <SuggestedCountries
            addCountry={addCountry}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <GeneralButton
          type="button"
          description={"Add"}
          onClick={() => {
            addCountry(search);
          }}
        />
      </div>
    </div>
  );
};

export default SelectedCountries;
