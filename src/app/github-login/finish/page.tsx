"use client";
import { useGlobalState } from "@/app/GlobalContext";
import { User } from "@/lib/db/user";
import { useAsyncEffect } from "@/lib/hooks/use-async-effect";
import { getLocalStorage } from "@/lib/local-storage";
import { ApiResponse } from "@/lib/type";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

export default function Page() {
    return (
        <Suspense>
            <GithubAuth />
        </Suspense>
    );
}
function GithubAuth() {
    const router = useRouter();
    const hasLogin = useRef(false);
    const params = useSearchParams();

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (hasLogin.current) {
            return;
        }
        if (!params?.get("code")) {
            return;
        }
        hasLogin.current = true;
        fetch("/api/github-auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: params.get("code"),
            }),
        })
            .then((res) => res.json())
            .then((res) => res as ApiResponse<unknown>)
            .then((res) => {
                if (res.status != 200) {
                    console.error(`Auth failed: status ${res.status}`, res);
                    setError(res.message);
                    return;
                }
                setUser((res.data as any).user as User);
            });
    }, [params]);

    const { dispatch } = useGlobalState();

    useAsyncEffect(async () => {
        if (!user) return;
        await dispatch({ type: "refresh" });

        let redirectTarget = "/create";
        const storedPath = getLocalStorage().getItem("redirect-url");
        if (storedPath) {
            getLocalStorage().removeItem("redirect-url");
            redirectTarget = storedPath;
        }
        await router.push(redirectTarget);
    }, [user]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            {params && params.get("code") ? (
                user ? (
                    <>
                        {error && <p className="text-red-500">{error}</p>}
                        {user && (
                            <p className="text-green-500">
                                {/*{JSON.stringify(user)}*/}
                                Authorized as: {user.handle}
                            </p>
                        )}
                    </>
                ) : (
                    "Logging in..."
                )
            ) : (
                "Missing `code` parameter"
            )}
        </div>
    );
}
