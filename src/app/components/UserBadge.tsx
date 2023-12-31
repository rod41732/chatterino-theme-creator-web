import { useRouter } from "next/navigation";
import { useGlobalState } from "@/app/GlobalContext";
import { Dropdown } from "antd";
import { MdPerson } from "react-icons/md";
import { ApiResponse } from "@/lib/type";
import { getLocalStorage } from "@/lib/local-storage";

export function UserBadge() {
    const router = useRouter();
    const {
        state: { auth },
        dispatch,
    } = useGlobalState();
    return auth?.authorized ? (
        <Dropdown
            menu={{
                items: [
                    {
                        key: "my-themes",
                        label: "My Themes",
                        onClick: async () => {
                            await router.push("/my-themes");
                        },
                    },
                    {
                        key: "logout",
                        label: "Logout",
                        onClick: async () => {
                            await fetch("/api/logout", {
                                method: "POST",
                                credentials: "include",
                            })
                                .then((res) => res.json())
                                .then(async (res: ApiResponse<null>) => {
                                    if (res.status != 200) {
                                        console.error("Error logging out", res);
                                        alert("Error logging out");
                                    } else {
                                        console.log("Logged out");
                                    }
                                    await dispatch({ type: "refresh" });
                                });
                        },
                    },
                ],
            }}
        >
            <div className="flex items-center gap-x-2">
                <div className="flex items-center justify-center w-9 h-9 bg-blue-500 rounded-full text-xl text-white">
                    {auth.user.handle.charAt(0).toUpperCase()}
                </div>
                <div className="font-bold text-gray-800">
                    @{auth.user.handle}
                </div>
            </div>
        </Dropdown>
    ) : (
        auth && (
            <Dropdown
                menu={{
                    items: [
                        {
                            key: "forsen",
                            label: "My Themes",
                            onClick: async () => {
                                await router.push("/my-themes");
                            },
                        },
                        {
                            type: "divider",
                        },
                        {
                            key: "hint",
                            label: (
                                <p>Login to Share your theme with others.</p>
                            ),
                            disabled: true,
                        },
                        {
                            type: "divider",
                        },
                        {
                            key: "login",
                            label: "Login with GitHub",
                            onClick: async () => {
                                const fullUrl = location.href;
                                const origin = new URL(fullUrl).origin;
                                const path = fullUrl.slice(origin.length);

                                getLocalStorage().setItem("redirect-url", path);
                                await router.push("/github-login/init");
                            },
                        },
                    ],
                }}
            >
                <div className="flex items-center gap-x-2 rounded-md hover:bg-gray-500/25 py-2 px-2 cursor-pointer">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full text-xl text-white">
                        <MdPerson />
                    </div>
                    <div className="text-gray-800">Not Logged in</div>
                </div>
            </Dropdown>
        )
    );
}
