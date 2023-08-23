"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiResponse } from "@/lib/type";
import { User } from "@/lib/db/user";
import { useAsyncEffect } from "@/lib/hooks/use-async-effect";
import { useGlobalState } from "@/app/GlobalContext";
import { getMe } from "@/lib/api/get-me";

export default function Page() {
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

    const { state, setState } = useGlobalState();

    useAsyncEffect(async () => {
        if (!user) return;

        if (user) {
            let redirectTarget = "/create";
            const storedPath = localStorage.getItem("redirect-url");
            if (storedPath) {
                localStorage.removeItem("redirect-url");
                redirectTarget = storedPath;
            }
            // todo: copied code from app/layout.tsx

            try {
                const me = await getMe();
                setState({ auth: { authorized: true, user: me } });
            } catch (err) {
                setState({ auth: { authorized: false } });
            }

            await router.push(redirectTarget);
        }
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
