import { Stack, Checkbox, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { filterType, sortingType } from "../pages/Home";
type SearchBoxProps = {
  price: React.Dispatch<React.SetStateAction<sortingType>>;
  countriesVisited: React.Dispatch<React.SetStateAction<sortingType>>;
  numberOfLikes: React.Dispatch<React.SetStateAction<sortingType>>;
};

const SortingBox = (props: SearchBoxProps) => {
  const [priceChecked, setPriceChecked] = useState(false);
  const [numberOfCountriesChecked, setnumberOfCountries] = useState(false);
  const [numberOfLikesChecked, setnumberOfLikesChecked] = useState(false);

  const handlePriceChecked = () => {
    props.price((prev) => ({ ...prev, price: !priceChecked }));
    setPriceChecked(!priceChecked);
  };

  const handeleNumberOfLikesChecked = () => {
    console.log(numberOfLikesChecked);
    props.numberOfLikes((prev) => ({
      ...prev,
      numberOfLikes: !numberOfLikesChecked,
    }));
    setnumberOfLikesChecked(!numberOfLikesChecked);
  };

  const handleNumberOfCountriesChecked = () => {
    props.countriesVisited((prev) => ({
      ...prev,
      countriesVisited: !numberOfCountriesChecked,
    }));
    setnumberOfCountries(!numberOfCountriesChecked);
  };

  return (
    <div className="mt-8">
      <Heading size={"md"}>Sort by</Heading>
      <Stack spacing={5} direction="column">
        <Stack spacing={5} direction="row">
          <Checkbox
            onChange={handlePriceChecked}
            colorScheme="yellow"
            checked={priceChecked}
            disabled={numberOfCountriesChecked || numberOfLikesChecked}
          >
            Price
          </Checkbox>
        </Stack>
        <Checkbox
          onChange={handleNumberOfCountriesChecked}
          colorScheme="yellow"
          checked={numberOfCountriesChecked}
          disabled={priceChecked || numberOfLikesChecked}
        >
          Number Of Countries
        </Checkbox>
        <Checkbox
          onChange={handeleNumberOfLikesChecked}
          colorScheme="yellow"
          checked={numberOfLikesChecked}
          disabled={priceChecked || numberOfCountriesChecked}
        >
          Number Of Likes
        </Checkbox>
      </Stack>
    </div>
  );
};

export default SortingBox;
