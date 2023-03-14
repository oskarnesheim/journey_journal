import Countries from "../../public/text/Countries";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { Ijourney } from "../interfaces/Interfaces";

type SelectedCountriesProps = {
  setSelected: React.Dispatch<React.SetStateAction<Ijourney>>;
};

const SelectedCountries = (props: SelectedCountriesProps) => {
  const [selected, setSelected] = useState<string[]>([""]);

  const onSelect = (e: any, b: any) => {
    setSelected(e);
    props.setSelected((prev) => ({ ...prev, countries: selected }));
  };

  const onRemove = (e: any, b: any) => {
    setSelected(e);
    props.setSelected((prev) => ({ ...prev, countries: selected }));
  };

  return (
    <Multiselect
      className="w-4/5 max-w-[4/5]"
      isObject={false}
      onKeyPressFn={function noRefCheck() {}}
      onRemove={(e, b) => onRemove(e, b)}
      onSearch={function noRefCheck() {}}
      onSelect={(e, b) => onSelect(e, b)}
      options={Countries.map((item) => item.name)}
    />
  );
};

export default SelectedCountries;
