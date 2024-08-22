import {
    createContext,
    Dispatch,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

export type InspectorWidgetDef =
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
    // widgets (editor/title/separator/etc. to show in pane)
    widgets: InspectorWidgetDef[];
    // whether inspector is on main page (select theme)
    // or editor page (editing element and (should) have "Done" button to go back)
    mode?: "editor" | "main";
}

interface InspectorContextState {
    state: InsEditState;
    setState: Dispatch<SetStateAction<InsEditState>>;
}
const InsEditContext = createContext<InspectorContextState | null>(null);

/** InspectorContext control state of "inspector" (the interactive theme editor UI in main tab).
 * list widgets and current mode
 */
export const InspectorContextProvider = ({
    children,
}: PropsWithChildren<{}>) => {
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

export function useInspectorContext(): InspectorContextState {
    const value = useContext(InsEditContext);
    if (value == null)
        throw new Error("Missing InsEditContextProvider in tree");
    return value;
}

export function useInspectorContextNullable(): InspectorContextState | null {
    return useContext(InsEditContext);
}
