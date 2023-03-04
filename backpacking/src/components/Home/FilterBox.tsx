import { Stack, Checkbox, Heading, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { filterType } from "../../pages/Home";
import SearchBar from "./SearchBar";
import Slider from "./Slider";

type FilterBoxProps = {
  search: React.Dispatch<React.SetStateAction<filterType>>;
  activeFilter: React.Dispatch<React.SetStateAction<filterType>>;
  minPrice: React.Dispatch<React.SetStateAction<filterType>>;
  maxPrice: React.Dispatch<React.SetStateAction<filterType>>;
  maxPriceActive: React.Dispatch<React.SetStateAction<filterType>>;
  minPriceActive: React.Dispatch<React.SetStateAction<filterType>>;
};

const FilterBox = (props: FilterBoxProps) => {
  const [activeFilter, setActiveFilter] = useState(false);
  const [filter, setFilter] = useState("");
  const [costActive, setCostActive] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [minPriceActive, setMinPriceActive] = useState(false);
  const [maxPriceActive, setMaxPriceActive] = useState(false);

  const resetFilter = () => {
    props.search((prev) => ({ ...prev, text: "" }));
    props.activeFilter((prev) => ({ ...prev, activeFilter: false }));
    props.minPrice((prev) => ({ ...prev, minPrice: 0 }));
    props.maxPrice((prev) => ({ ...prev, maxPrice: 0 }));
    setActiveFilter(false);
    setMinPriceActive(false);
    setMaxPriceActive(false);
    // setMinPrice(50000);
    // setMaxPrice(50000);
  };

  useEffect(() => {
    // console.log(minPrice, "minPrice");
    // console.log(maxPrice, "maxPrice");
    // props.minPrice((prev) => ({ ...prev, minPrice: minPrice }));
    // props.maxPrice((prev) => ({ ...prev, maxPrice: maxPrice }));
  }, []);

  return (
    <div className="fixed top-36 right-20 shadow-2xl w-1/3 p-5 min-h-3/4">
      <SearchBar setSearch={props.search} />
      <Heading size={"md"}>Filter your search</Heading>
      <Stack spacing={5} direction="column">
        <Stack spacing={5} direction="row">
          <Checkbox
            onChange={(e) => {
              props.activeFilter((prev) => ({
                ...prev,
                activeFilter: !activeFilter,
              }));
              setActiveFilter(!activeFilter);
            }}
            colorScheme="red"
            checked={activeFilter}
          >
            Activate Filter
          </Checkbox>
          //! Denne funker ikke
          {/* <Button
            size={"sm"}
            background={"red"}
            position={"absolute"}
            right={5}
            onClick={resetFilter}
          >
            Reset Filter
          </Button> */}
          //!
        </Stack>
        <Checkbox
          onChange={() => {
            setMinPriceActive(!costActive);
            props.minPriceActive((prev) => ({
              ...prev,
              minPriceActive: !minPriceActive,
            }));
          }}
          colorScheme="green"
          disabled={!activeFilter}
          checked={minPriceActive}
        >
          Min price
        </Checkbox>

        {activeFilter && minPriceActive && (
          <Slider minOrMax="minPrice" sliderValue={props.minPrice} />
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
          disabled={!activeFilter}
          checked={maxPriceActive}
        >
          Max price
        </Checkbox>
        {activeFilter && maxPriceActive && (
          <Slider minOrMax="maxPrice" sliderValue={props.maxPrice} />
        )}
      </Stack>
    </div>
  );
};

export default FilterBox;
