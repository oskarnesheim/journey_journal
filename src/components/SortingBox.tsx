import { Stack, Checkbox, Heading } from "@chakra-ui/react";
import { useState } from "react";

type SearchBoxProps = {
  whatToSortBy: string;
  setWhatToSortBy: React.Dispatch<React.SetStateAction<string>>;
};

const SortingBox = ({ whatToSortBy, setWhatToSortBy }: SearchBoxProps) => {
  const priceChecked = () => {
    if (whatToSortBy === "price") {
      setWhatToSortBy("");
      return;
    }
    setWhatToSortBy("price");
  };

  const likesChecked = () => {
    if (whatToSortBy === "likes") {
      setWhatToSortBy("");
      return;
    }
    setWhatToSortBy("likes");
  };

  const countriesChecked = () => {
    if (whatToSortBy === "countries") {
      setWhatToSortBy("");
      return;
    }
    setWhatToSortBy("countries");
  };

  function ratingChecked() {
    if (whatToSortBy === "rating") {
      setWhatToSortBy("");
      return;
    }
    setWhatToSortBy("rating");
  }

  return (
    <div className="mt-8">
      <Heading size={"md"}>Sort by</Heading>
      <Stack spacing={5} direction="column">
        <Stack spacing={5} direction="row">
          <Checkbox
            onChange={() => {
              priceChecked();
            }}
            colorScheme="yellow"
            disabled={whatToSortBy !== "price" && whatToSortBy !== ""}
          >
            Price
          </Checkbox>
        </Stack>
        <Checkbox
          onChange={() => {
            countriesChecked();
          }}
          colorScheme="yellow"
          disabled={whatToSortBy !== "countries" && whatToSortBy !== ""}
        >
          Number Of Countries
        </Checkbox>
        <Checkbox
          onChange={() => {
            likesChecked();
          }}
          colorScheme="yellow"
          disabled={whatToSortBy !== "likes" && whatToSortBy !== ""}
        >
          Number Of Likes
        </Checkbox>
        <Checkbox
          onChange={() => {
            ratingChecked();
          }}
          colorScheme="yellow"
          disabled={whatToSortBy !== "rating" && whatToSortBy !== ""}
        >
          Rating
        </Checkbox>
      </Stack>
    </div>
  );
};

export default SortingBox;
