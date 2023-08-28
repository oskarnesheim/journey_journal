import {
  Slider as ChakraSlider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import { Dispatch, useEffect, useState } from "react";
import { filterType } from "../../pages/Home";

type SliderProps = {
  sliderValue: Dispatch<React.SetStateAction<filterType>>;
  minOrMax: string;
  initialValue: number;
};

function Slider(props: SliderProps) {
  const [sliderValue, setSliderValue] = useState(props.initialValue);

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

  useEffect(() => {
    setSliderValue(props.initialValue);
    props.sliderValue((prev) => ({
      ...prev,
      [props.minOrMax]: sliderValue * 1000,
    }));
  }, []);

  return (
    <Box pt={6} pb={2}>
      <ChakraSlider
        aria-label="slider-ex-6"
        onChange={(val) => handleSliderChange(val)}
      >
        <SliderMark value={25} {...labelStyles}>
          25 000kr
        </SliderMark>
        <SliderMark value={50} {...labelStyles}>
          50 000kr
        </SliderMark>
        <SliderMark value={75} {...labelStyles}>
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
