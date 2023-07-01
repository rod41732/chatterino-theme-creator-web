import styles from "@/app/fake-uis/chatlist.module.css";

const HoverOverlay = () => {
    return <div className="absolute inset-0 bg-gray-100/20"></div>;
};

export function ChatterinoTabPreview() {
    const tb = styles.tabBase;
    const s = styles;
    return (
        // todo
        <div className="flex flex-col max-h-full min-h-0 overflow-auto space-y-4 bg-gray-800 text-white p-4">
            <p>
                you might not see the difference in default theme because the
                colors are the same across all states
            </p>
            <div className="">
                <h2 className="mb-2"> Normal </h2>
                <div
                    className={`flex flex-wrap ${s.tabContainer} w-full bg-black`}
                >
                    <div className={`${tb} ${s.tabSelected}`}>current tab</div>
                    <div className={`${tb} ${s.tabRegular}`}>unselected</div>
                    <div className={`${tb} ${s.tabNewMessage}`}>newMessage</div>
                    <div className={`${tb} ${s.tabRegular}`}>unselected</div>
                    <div className={`${tb} ${s.tabHighlighted}`}>pinged</div>
                    <div className={`${tb} ${s.tabRegular}`}>unselected</div>
                    <div className={`${tb} ${s.tabRegular}`}>unselected</div>
                    <div className={`${tb} ${s.tabRegular}`}>unselected</div>
                    <div className={`${tb} ${s.tabRegular}`}>unselected</div>
                    <div className={`${tb} ${s.tabRegular}`}>unselected</div>
                </div>
                {/*// todo color */}
                <div className="bg-black py-4  text-center text-white ">
                    {" "}
                    chat{" "}
                </div>
            </div>

            <div className="">
                <h2 className="mb-2"> Hover (bugged) </h2>
                <p className="text-gray-500">
                    Due to a &quot;bug&quot; hover color is NOT used for
                    background. the color of background is simply lighten up.{" "}
                </p>
                <div
                    className={`flex flex-wrap ${s.tabContainer} w-full bg-black`}
                >
                    <div className={`${tb} ${s.tabSelected}`}>
                        current tab <HoverOverlay />
                    </div>
                    <div className={`${tb} ${s.tabRegular}`}>
                        unselected <HoverOverlay />
                    </div>
                    <div className={`${tb} ${s.tabNewMessage}`}>
                        newMessage <HoverOverlay />
                    </div>
                    <div className={`${tb} ${s.tabRegular}`}>
                        unselected <HoverOverlay />
                    </div>
                    <div className={`${tb} ${s.tabHighlighted}`}>
                        pinged <HoverOverlay />
                    </div>
                    <div className={`${tb} ${s.tabRegular}`}>
                        unselected <HoverOverlay />
                    </div>
                    <div className={`${tb} ${s.tabRegular}`}>
                        unselected <HoverOverlay />
                    </div>
                    <div className={`${tb} ${s.tabRegular}`}>
                        unselected <HoverOverlay />
                    </div>
                    <div className={`${tb} ${s.tabRegular}`}>
                        unselected <HoverOverlay />
                    </div>
                    <div className={`${tb} ${s.tabRegular}`}>
                        unselected <HoverOverlay />
                    </div>
                </div>
                <div className="bg-black py-4  text-center text-white ">
                    {" "}
                    chat{" "}
                </div>
            </div>

            <div className="">
                <h2 className="mb-2"> Hover (potential) </h2>
                <div
                    className={`flex flex-wrap ${s.tabContainer} w-full bg-black`}
                >
                    <div className={`${tb} ${s.tabSelectedForceHover}`}>
                        current tab
                    </div>
                    <div className={`${tb} ${s.tabRegularForceHover}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabNewMessageForceHover}`}>
                        newMessage
                    </div>
                    <div className={`${tb} ${s.tabRegularForceHover}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabHighlightedForceHover}`}>
                        pinged
                    </div>
                    <div className={`${tb} ${s.tabRegularForceHover}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabRegularForceHover}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabRegularForceHover}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabRegularForceHover}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabRegularForceHover}`}>
                        unselected
                    </div>
                </div>
                <div className="bg-black py-4  text-center text-white ">
                    {" "}
                    chat{" "}
                </div>
            </div>

            <div className="">
                <h2 className="mb-2"> Window Unfocused </h2>
                <div
                    className={`flex flex-wrap ${s.tabContainer} w-full bg-black`}
                >
                    <div className={`${tb} ${s.tabSelectedUnfocused}`}>
                        current tab
                    </div>
                    <div className={`${tb} ${s.tabRegularUnfocused}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabNewMessageUnfocused}`}>
                        newMessage
                    </div>
                    <div className={`${tb} ${s.tabRegularUnfocused}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabHighlightedUnfocused}`}>
                        pinged
                    </div>
                    <div className={`${tb} ${s.tabRegularUnfocused}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabRegularUnfocused}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabRegularUnfocused}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabRegularUnfocused}`}>
                        unselected
                    </div>
                    <div className={`${tb} ${s.tabRegularUnfocused}`}>
                        unselected
                    </div>
                </div>
                <div className="bg-black py-4  text-center text-white">
                    {" "}
                    chat{" "}
                </div>
            </div>
        </div>
    );
}
