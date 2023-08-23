"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalStateProvider, useGlobalState } from "@/app/GlobalContext";
import { useEffect } from "react";
import { ApiResponse } from "@/lib/type";
import { User } from "@/lib/db/user";
import { getMe } from "@/lib/api/get-me";

const inter = Inter({ subsets: ["latin"] });

function UserLoader() {
    const { state, setState } = useGlobalState();
    useEffect(() => {
        (async () => {
            if (state.auth == null) {
                try {
                    const me = await getMe();
                    setState({ auth: { authorized: true, user: me } });
                } catch (err) {
                    setState({ auth: { authorized: false } });
                }
            }
        })();
    }, [state]);
    return <></>;
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <GlobalStateProvider>
                    <UserLoader />
                    <div className="w-screen h-screen">{children}</div>
                </GlobalStateProvider>
            </body>
        </html>
    );
}
