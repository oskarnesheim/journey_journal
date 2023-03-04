import {
  Slider as ChakraSlider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import { Dispatch, useState } from "react";
import { filterType } from "../../pages/Home";

type SliderProps = {
  sliderValue: Dispatch<React.SetStateAction<filterType>>;
  minOrMax: string;
};

function Slider(props: SliderProps) {
  const [sliderValue, setSliderValue] = useState(50);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  const handleSliderChange = (sliderValue: number) => {
    props.sliderValue((prev) => ({
      ...prev,
      [props.minOrMax]: sliderValue * 1000,
    }));
    setSliderValue(sliderValue);
  };

  return (
    <Box pt={6} pb={2}>
      <ChakraSlider
        aria-label="slider-ex-6"
        onChange={(val) => handleSliderChange(val)}
      >
        <SliderMark value={25000} {...labelStyles}>
          25 000kr
        </SliderMark>
        <SliderMark value={50000} {...labelStyles}>
          50 000kr
        </SliderMark>
        <SliderMark value={75000} {...labelStyles}>
          75 000kr
        </SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-14"
          ml="-10"
          rounded={20}
          padding="2"
          // w="15"
        >
          {sliderValue} 000 kr
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </ChakraSlider>
    </Box>
  );
}

export default Slider;
