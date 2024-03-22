import React, {FC} from "react";
import cl from './CatSelect.module.css'
import {CatSelectType} from "../../types/Types.ts";


const CatSelect: FC<CatSelectType> = ({onChange, options, defaultValue}) => {
    return (

        <select defaultValue={defaultValue} name="" id="" onChange={onChange} className={cl.catSelect}>
            <option disabled>{defaultValue}</option>
            {options ? options.map((item, index): React.ReactNode => {
                    return <option key={index} id={item.id}>{item.name}</option>
                }) : null}
        </select>

    );
};

export default CatSelect;