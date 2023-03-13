import { Stack, Checkbox, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { filterType } from "../pages/Home";
type SearchBoxProps = {
  sortJourneysByNumberOfCountriesVisited: () => void;
  sortJourneysByPrice: () => void;
  sortJourneysByNumberOfLikes: () => void;
};

const SortingBox = ({
  sortJourneysByNumberOfCountriesVisited,
  sortJourneysByPrice,
  sortJourneysByNumberOfLikes,
}: SearchBoxProps) => {
  const priceChecked = () => {
    sortJourneysByPrice();
  };

  const likesChecked = () => {
    sortJourneysByNumberOfLikes();
  };

  const countriesChecked = () => {
    sortJourneysByNumberOfCountriesVisited();
  };

  return (
    <div className="mt-8">
      <Heading size={"md"}>Sort by</Heading>
      <Stack spacing={5} direction="column">
        <Stack spacing={5} direction="row">
          <Checkbox
            onChange={priceChecked}
            colorScheme="yellow"
            // checked={sortingInput.price}
            // disabled={
            //   sortingInput.countriesVisited || sortingInput.numberOfLikes
            // }
          >
            Price
          </Checkbox>
        </Stack>
        <Checkbox
          onChange={countriesChecked}
          colorScheme="yellow"
          // checked={sortingInput.countriesVisited}
          // disabled={sortingInput.price || sortingInput.numberOfLikes}
        >
          Number Of Countries
        </Checkbox>
        <Checkbox
          onChange={likesChecked}
          colorScheme="yellow"
          // checked={sortingInput.numberOfLikes}
          // disabled={sortingInput.price || sortingInput.countriesVisited}
        >
          Number Of Likes
        </Checkbox>
      </Stack>
    </div>
  );
};

export default SortingBox;
