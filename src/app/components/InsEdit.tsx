import {
    createContext,
    Dispatch,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

export type InsEditWidgetDef =
    | {
          type: "divider";
      }
    | {
          type: "title";
          title: string;
          subtitle?: string;
          size?: "small" | "large";
      }
    | {
          type: "colorPicker";
          name: string;
          path: string;
          alpha?: boolean;
          description: string;
      }
    | {
          type: "custom";
          children: ReactNode;
      };

export interface InsEditState {
    widgets: InsEditWidgetDef[];
    mode?: "editor" | "main";
}

interface InsEditContextState {
    state: InsEditState;
    setState: Dispatch<SetStateAction<InsEditState>>;
}
const InsEditContext = createContext<InsEditContextState | null>(null);

export const InsEditContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [state, setState] = useState<InsEditState>({
        widgets: [],
        mode: "main",
    });
    return (
        <InsEditContext.Provider value={{ state, setState }}>
            {children}
        </InsEditContext.Provider>
    );
};

export function useInsEditContext(): InsEditContextState {
    const value = useContext(InsEditContext);
    if (value == null)
        throw new Error("Missing InsEditContextProvider in tree");
    return value;
}

export function useInsEditContextNullable(): InsEditContextState | null {
    return useContext(InsEditContext);
}
