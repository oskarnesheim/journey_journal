import { Heading } from "@chakra-ui/react";
import { Dispatch, useState } from "react";
import SelectedCountries from "../custom-hooks/SelectedCountries";
import { auth } from "../firebase-config";
import { Ijourney } from "../interfaces/Interfaces";
import GeneralButton from "./GeneralButton";

type EditCountryListType = {
  setJourney: Dispatch<React.SetStateAction<Ijourney>>;
  journey: Ijourney;
  saveChanges: (journey: Ijourney) => Promise<void>;
};

function EditCountryList({
  journey,
  setJourney,
  saveChanges,
}: EditCountryListType) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="flex flex-row justify-evenly shadow-md p-5">
      <div className="flex flex-col shadow-md">
        <Heading as="h4" size="lg">
          Countries
        </Heading>
        {auth.currentUser?.uid === journey.uid &&
          (isEditing ? (
            <GeneralButton
              description={"Save"}
              onClick={() => {
                setIsEditing(false);
                saveChanges(journey);
              }}
            />
          ) : (
            <GeneralButton
              description={"Edit"}
              onClick={() => {
                setIsEditing(true);
              }}
            />
          ))}
      </div>
      <div className="shadow-md p-5 w-full">
        {isEditing ? (
          <SelectedCountries journey={journey} setJourney={setJourney} />
        ) : (
          //
          countriesList()
        )}
      </div>
    </div>
  );

  function countriesList() {
    var countries = "";

    journey.countries.forEach((country) => {
      countries += country + " -> ";
    });
    countries = countries.slice(0, -4);
    return countries;
  }
}

export default EditCountryList;
