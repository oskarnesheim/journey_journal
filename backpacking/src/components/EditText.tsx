import { Heading, Input, Textarea } from "@chakra-ui/react";
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
    <div className="relative p-5 shadow-md h-40">
      <Heading className="absolute left-9" as="h2" size="lg">
        {whatAttribute}
      </Heading>

      {isNumber ? (
        <Input
          className={"mt-10"}
          type={"number"}
          value={Number(text)}
          disabled={!isEditing}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false);
              saveChanges(journey);
            }
          }}
          onChange={(e) =>
            setJourney({
              ...journey,
              [whatAttribute]: Number(e.target.value),
            })
          }
        />
      ) : (
        <Textarea
          className={"mt-10 h-auto disabled:text-black"}
          height="auto"
          value={text}
          disabled={!isEditing}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false);
              saveChanges(journey);
            }
          }}
          onChange={(e) =>
            setJourney({
              ...journey,
              [whatAttribute]: e.target.value,
            })
          }
        />
      )}
      {auth.currentUser?.uid === journey.uid &&
        (isEditing ? (
          <img
            className={iconStyle}
            src="../../public/images/save_icon.png"
            alt="Save"
            onClick={() => {
              setIsEditing(false);
              saveChanges(journey);
            }}
          />
        ) : (
          <img
            className={iconStyle}
            src="../../public/images/edit_icon.png"
            alt="Edit"
            onClick={() => {
              setIsEditing(true);
            }}
          />
        ))}
    </div>
  );
}

const iconStyle = "h-5 absolute right-7 top-[70px]";

export default EditText;
