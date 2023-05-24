import { createContext } from "react";
import { useState } from "react";

export const CustomContext = createContext();

export const Context = (props) => {
    const [admin, setAdmin] = useState(true);

    return (
        <CustomContext.Provider value={admin}>
            {props.children}
        </CustomContext.Provider>
    );
};
