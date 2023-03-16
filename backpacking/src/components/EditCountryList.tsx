import { Dispatch, useState } from "react";
import SelectedCountries from "../custom-hooks/SelectedCountries";
import { Ijourney } from "../interfaces/Interfaces";

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
    <div>
      <h1>Countries</h1>

      {isEditing ? (
        <button
          onClick={() => {
            setIsEditing(false);
            saveChanges(journey);
          }}
        >
          Save
        </button>
      ) : (
        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      )}
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
