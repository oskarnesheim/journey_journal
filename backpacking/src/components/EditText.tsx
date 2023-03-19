import { Heading } from "@chakra-ui/react";
import { Dispatch, useRef, useState } from "react";
import { auth } from "../firebase-config";
import { Ijourney } from "../interfaces/Interfaces";
import GeneralButton from "./GeneralButton";

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
  const isNumber = whatAttribute === "cost" ? true : false;

  return (
    <div className="relative border border-theme-green-darker m-10 rounded-r-xl p-3">
      <Heading as="h4" size="md">
        {whatAttribute}
      </Heading>
      <input
        className={
          isEditing ? "border border-theme-green-darker rounded-r-xl p-3" : ""
        }
        autoFocus={isEditing}
        type={isNumber ? "number" : "text"}
        value={isNumber ? Number(text) : text}
        disabled={!isEditing}
        onChange={(e) =>
          setJourney({
            ...journey,
            [whatAttribute]: [
              isNumber ? Number(e.target.value) : e.target.value,
            ],
          })
        }
      />
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
      ) : null}
    </div>
  );
}

export default EditText;
