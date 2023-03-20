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

type newImages = {
  id: string;
  file: File;
};

type UploadPicturesProps = {
  journey: Ijourney;
  setJourney: React.Dispatch<React.SetStateAction<Ijourney>>;
};

export function UploadPictures({ journey, setJourney }: UploadPicturesProps) {
  const [images, setImages] = useState<newImages[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const storage = getStorage();
  const imagesListRef = ref(storage, `images/${auth.currentUser?.uid}`);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const uploadImages = () => {
    if (images.length === 0) return;
    try {
      images.forEach((image) => {
        const imageRef = ref(
          storage,
          `images/${auth.currentUser?.uid}/${image.id}`
        );

        uploadBytes(imageRef, image.file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageURLs((prev) => [...prev, url]);
            alert("Image uploaded successfully");
          });
        });
        const ids = images.map((image) => image.id);
        setJourney({
          ...journey,
          pictures: ids,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleNewPicture(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const id = firestoreAutoId();
    setImages([...images, { id: id, file: event.target.files[0] }]);
  }

  return (
    <div>
      <h1>Upload Pictures</h1>

      <input
        className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5 dark:text-theme-dark"
        type="file"
        onChange={(event) => {
          handleNewPicture(event);
        }}
      />
      <GeneralButton
        description={"Upload"}
        onClick={uploadImages}
        type={"button"}
      />
      <div className="flex flex-row flex-wrap">
        {imageURLs.map((image) => {
          return <img className="w-80 p-2" src={image} />;
        })}
      </div>
    </div>
  );
}
