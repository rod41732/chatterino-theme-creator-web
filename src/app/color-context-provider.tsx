import { ColorScheme } from "@/app/model.types";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { COLOR, flattenKV } from "@/app/themes-data";

// used for generating theme
export interface ConfigData {
    color: ColorScheme;
}


type ValueOrFactory<T> = T | ((old: T) => T);

interface ConfigContext {
    data: ConfigData;
    setData: (newValue: ValueOrFactory<ConfigData>) => void;
}

const ConfigContext = createContext<ConfigContext>(null as any);

export const ConfigContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [data, setData] = useState<ConfigData>({
        color: COLOR,
    });
    useEffect(() => {
        // the convention used for generating
        const cssVariables = flattenKV("--", data.color, "-");
        for (const [variable, val] of cssVariables) {
            document.body.style.setProperty(variable, val);
        }
        // log css xd
        console.log(
            "set props",
            cssVariables.map((it) => it.join(": ") + ";").join("\n")
        );
    }, [data.color]);
    // const interceptedSetData = useCallback(
    //     (newValOrFact: ValueOrFactory<ConfigData>) => {
    //         setData(curData => {
    //             let newData: ConfigData;
    //             if (typeof newValOrFact == "function") {
    //                 newData = newValOrFact(curData)
    //             } else {
    //                 newData = newValOrFact
    //             }
    //
    //             return newData
    //         })
    //         const newState = typeof newValOrFact == "function" ? newValOrFact()
    //         const flattenedKV = flattenKV("--", );
    //         setData(newValOrFact);
    //     },
    //     [setData]
    // );

    return (
        <ConfigContext.Provider value={{ data, setData }}>
            {" "}
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfigContext = () => {
    const v = useContext(ConfigContext);
    if (v == null) throw new Error("Missing context provider");
    return v;
};
