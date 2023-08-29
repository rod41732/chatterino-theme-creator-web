"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalStateProvider, useGlobalState } from "@/app/GlobalContext";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function UserLoader() {
    const { state, dispatch } = useGlobalState();
    useEffect(() => {
        if (state.auth == null) {
            dispatch({ type: "refresh" });
        }
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
            <body
                // need overflow-hidden to make antd tooltip re-position properly
                className={`${inter.className} overflow-hidden`}
            >
                <GlobalStateProvider>
                    <UserLoader />
                    <div className="w-screen h-screen">{children}</div>
                </GlobalStateProvider>
            </body>
        </html>
    );
}
