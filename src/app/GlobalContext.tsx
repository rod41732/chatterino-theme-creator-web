import { User } from "@/db/user";
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from "react";

type AuthorizationState =
    | {
          authorized: true;
          user: User;
      }
    | {
          authorized: false;
      };

interface _GlobalState {
    auth: AuthorizationState | null;
}

type ValueOrFactory<T> = T | ((old: T) => T);
type SetState<T> = (v: ValueOrFactory<T>) => void;

interface GlobalState {
    state: _GlobalState;
    setState: Dispatch<SetStateAction<_GlobalState>>;
}

const GlobalStateContext = createContext<GlobalState>({
    state: { auth: null },
    setState: () => {},
});

export function GlobalStateProvider({ children }: PropsWithChildren<{}>) {
    const [state, setState] = useState<_GlobalState>({ auth: null });
    return (
        <GlobalStateContext.Provider value={{ state, setState }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

export function useGlobalState(): GlobalState {
    return useContext(GlobalStateContext);
}
