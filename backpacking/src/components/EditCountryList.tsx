import { Dispatch } from "react";

type EditCountryListType = {
  countries: string[];
  setCountries: Dispatch<React.SetStateAction<string[]>>;
};

function EditCountryList({ countries, setCountries }: EditCountryListType) {
  return (
    <div>
      <h1>Edit Country List</h1>
    </div>
  );
}
