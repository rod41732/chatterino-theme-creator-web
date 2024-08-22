import { getMe } from "@/lib/api/get-me";
import { User } from "@/lib/db/user";
import { produce } from "immer";
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useCallback,
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

type GlobalStateAction = {
    type: "refresh";
};

interface GlobalState {
    state: _GlobalState;
    setState: Dispatch<SetStateAction<_GlobalState>>;
    dispatch: (action: GlobalStateAction) => Promise<void>;
}

const GlobalStateContext = createContext<GlobalState>({
    state: { auth: null },
    setState: () => {},
    dispatch: async () => {},
});

const reducer = async (
    prev: _GlobalState,
    action: GlobalStateAction,
): Promise<_GlobalState> => {
    switch (action.type) {
        case "refresh":
            try {
                const me = await getMe();
                return produce(prev, (draft) => {
                    draft.auth = { authorized: true, user: me };
                });
            } catch (err) {
                return produce(prev, (draft) => {
                    draft.auth = { authorized: false };
                });
            }
            break;
        default:
            throw new Error("Unhandled action");
    }
};

/** Global state for global app logic: currently { auth } */
export function GlobalStateProvider({ children }: PropsWithChildren<{}>) {
    const [state, setState] = useState<_GlobalState>({ auth: null });
    const dispatch = useCallback(
        async (action: GlobalStateAction) => {
            const next = await reducer(state, action);
            setState(next);
        },
        [state],
    );
    return (
        <GlobalStateContext.Provider value={{ state, setState, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

export function useGlobalState(): GlobalState {
    return useContext(GlobalStateContext);
}
