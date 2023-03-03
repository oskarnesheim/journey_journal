import { MultiValue, ActionMeta, InputActionMeta } from "react-select";
import {Countries} from "../../public/Countries";
import Multiselect from 'multiselect-react-dropdown';
import { useEffect } from "react";

type selectedType = {
    countries : string[]
}

const SelectedCountries = () => {
    const [selected, setSelected] = useEffect<selectedType.countries>([''])

    const onSelect = (e : any,b : any) => {
        console.log(e)
        console.log(b.name)
    }

    const onRemove = () => {

    }
    
    return(
        <div>
            <Multiselect

            isObject={false}
            onKeyPressFn={function noRefCheck(){}}
            onRemove={function noRefCheck(){}}
            onSearch={function noRefCheck(){}}
            onSelect={(e,b) => onSelect(e,b)}
            options={Countries}
            />
        </div>
        )
}

export default SelectedCountries;