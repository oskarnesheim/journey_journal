import { Stack, Checkbox, Heading, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { filterType } from "../../pages/Home";
import SearchBar from "./SearchBar";
import Slider from "./Slider";

type FilterBoxProps = {
  text: React.Dispatch<React.SetStateAction<filterType>>;
  minPrice: React.Dispatch<React.SetStateAction<filterType>>;
  maxPrice: React.Dispatch<React.SetStateAction<filterType>>;
  maxPriceActive: React.Dispatch<React.SetStateAction<filterType>>;
  minPriceActive: React.Dispatch<React.SetStateAction<filterType>>;
};

const FilterBox = (props: FilterBoxProps) => {
  const [minPriceActive, setMinPriceActive] = useState(false);
  const [maxPriceActive, setMaxPriceActive] = useState(false);

  const resetFilter = () => {
    props.text((prev) => ({ ...prev, text: "" }));
    props.minPrice((prev) => ({ ...prev, minPrice: 0 }));
    props.maxPrice((prev) => ({ ...prev, maxPrice: 0 }));
    setMinPriceActive(false);
    setMaxPriceActive(false);
  };

  return (
    <div>
      <SearchBar setSearch={props.text} />
      <Heading size={"md"}>Filter your search</Heading>
      <Stack spacing={5} direction="column">
        <Stack spacing={5} direction="row"></Stack>
        <Checkbox
          onChange={() => {
            setMinPriceActive(!minPriceActive);
            props.minPriceActive((prev) => ({
              ...prev,
              minPriceActive: !minPriceActive,
            }));
          }}
          colorScheme="green"
          checked={minPriceActive}
        >
          Min price
        </Checkbox>

        {minPriceActive && (
          <Slider
            initialValue={50}
            minOrMax="minPrice"
            sliderValue={props.minPrice}
          />
        )}
        <Checkbox
          onChange={(e) => {
            setMaxPriceActive(!maxPriceActive);
            props.maxPriceActive((prev) => ({
              ...prev,
              maxPriceActive: !maxPriceActive,
            }));
          }}
          colorScheme="green"
          checked={maxPriceActive}
        >
          Max price
        </Checkbox>
        {maxPriceActive && (
          <Slider
            initialValue={50}
            minOrMax="maxPrice"
            sliderValue={props.maxPrice}
          />
        )}
      </Stack>
    </div>
  );
};

export default FilterBox;
