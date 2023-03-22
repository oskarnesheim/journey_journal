import { useEffect, useState } from "react";
import GeneralButton from "../GeneralButton";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, firestoreAutoId } from "../../firebase-config";
import { Ijourney } from "../../interfaces/Interfaces";
import { newImages } from "./CreateJourney";

type UploadPicturesProps = {
  journey: Ijourney;
  setJourney: React.Dispatch<React.SetStateAction<Ijourney>>;
  setImages: React.Dispatch<React.SetStateAction<newImages[]>>;
  images: newImages[];
};

export function UploadPictures({
  journey,
  setJourney,
  setImages,
  images,
}: UploadPicturesProps) {
  const [localImageUrls, setLocalImageUrls] = useState<string[]>([]);

  // const imagesListRef = ref(storage, `images/${journey.journeyID}`);

  function handleNewPicture(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const id = firestoreAutoId();
    setJourney((prev) => {
      return {
        ...prev,
        pictures: [...prev.pictures, id],
      };
    });
    setImages([...images, { id: id, file: event.target.files[0] }]);
    var selectedFile = event.target.files[0];
    var url = URL.createObjectURL(selectedFile); // <-- create a local URL
    setLocalImageUrls((prev) => [...prev, url]);
  }

  return (
    <div>
      <h1>Upload Pictures</h1>

      <input
        className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5 dark:text-theme-dark"
        type="file"
        onChange={(event) => handleNewPicture(event)}
      />
      <div className="flex flex-row flex-wrap">
        {localImageUrls.map((image) => {
          return (
            <img
              className="h-52 p-2"
              src={image}
              onClick={() =>
                setLocalImageUrls((prev) =>
                  prev.filter((item) => item !== image)
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}
