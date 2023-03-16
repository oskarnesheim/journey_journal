import { Dispatch, useState } from "react";
import { Ijourney } from "../interfaces/Interfaces";

type EditTextType = {
  text: string;
  setJourney: Dispatch<React.SetStateAction<Ijourney>>;
  journey: Ijourney;
  whatAttribute: string;
  saveChanges: (journey: Ijourney) => Promise<void>;
};

function EditText({
  text,
  setJourney,
  journey,
  whatAttribute,
  saveChanges,
}: EditTextType) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <div>
      <input
        type="text"
        value={text}
        disabled={!isEditing}
        onChange={(e) =>
          setJourney({ ...journey, [whatAttribute]: e.target.value })
        }
      />
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
    </div>
  );
}

export default EditText;
