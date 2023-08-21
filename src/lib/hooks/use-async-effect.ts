import { useEffect } from "react";

export function useAsyncEffect(asyncEffect: () => Promise<void>, deps: any[]) {
    useEffect(() => {
        asyncEffect();
    }, deps);
}
