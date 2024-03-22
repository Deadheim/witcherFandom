import {FC} from "react";
import cl from './SearchInput.module.css'
import {searchInput} from "../../types/Types.ts";


const SearchInput: FC<searchInput> = ({placeholder,onChange, value}) => {
    return (
        <input
            className={cl.searchInput}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type="text"
        />
    );
};

export default SearchInput;