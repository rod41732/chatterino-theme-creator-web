"use client";
import { GlobalStateProvider, useGlobalState } from "@/app/GlobalContext";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/** UserLoader is empty component that execute user fetching logic */
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
