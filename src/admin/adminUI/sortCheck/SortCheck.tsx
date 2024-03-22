import classes from "./SortCheck.module.css";
import React, {FC} from "react";
import {Environment} from "../../types/Types.ts";


type SortType = {
    defaultValue: string,
    onChange: (sort: keyof Pick<Environment, "name" | 'category'>) => void,
    options: {value:string, name: string}[],
    value: string,

}
const SortCheck: FC<SortType> = ({onChange, options, defaultValue}) => {

    return (
        <select className={classes.sortSelect}  defaultValue={defaultValue} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            if (event.target.value === 'name') {
                onChange("name")
            } else {
                onChange("category")
            }

        }} name="" id="">
            <option className={classes.sortOption} disabled>{defaultValue}</option>
            {options? options.map((option): React.ReactNode => {
                return (
                    <option className={classes.sortOption} value={option.value} key={option.value}>{option.name}</option>
                )
            }) : null}
        </select>
    );
};

export default SortCheck;

