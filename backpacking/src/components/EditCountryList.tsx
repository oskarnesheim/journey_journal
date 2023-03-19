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
  whatAttribute: string;
};

function EditCountryList({
  journey,
  setJourney,
  saveChanges,
  whatAttribute,
}: EditCountryListType) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="flex flex-row justify-evenly absolute right-52">
      <div className="flex flex-col">
        <Heading as="h4" size="md">
          Countries
        </Heading>
        {auth.currentUser ? (
          isEditing ? (
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
          )
        ) : (
          <></>
        )}
      </div>
      {isEditing ? (
        <SelectedCountries journey={journey} setJourney={setJourney} />
      ) : (
        <ul>
          {journey.countries.map((country) => {
            return <li key={country}>{country}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default EditCountryList;
