"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiResponse } from "@/lib/type";
import { GitHubUser } from "@/pages/api/github-auth";

export default function Page() {
    const hasLogin = useRef(false);
    const params = useSearchParams();

    const [user, setUser] = useState<GitHubUser | null>(null);
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
                setUser((res.data as any).user as GitHubUser);
            });
    }, [params]);
    return (
        <div className="w-full h-full flex items-center justify-center">
            {params && params.get("code") ? (
                user ? (
                    <>
                        {error && <p className="text-red-500">{error}</p>}
                        {user && (
                            <p className="text-green-500">
                                Authorized as: {user.login}
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
