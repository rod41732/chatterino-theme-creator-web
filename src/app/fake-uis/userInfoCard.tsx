import styles from "./chatlist.module.css";
import clsx from "clsx";
import { QtCheckbox, QtRadio } from "@/app/fake-uis/FakeQt.component";
import { ChatterinoSplit } from "@/app/fake-uis/chatterinoSplit.component";
import { fakeChatListSmall, fakeChatListVerySmall } from "@/app/data";
import { useConfigContext } from "@/app/color-context-provider";
import { useMemo, useState } from "react";
import { PiHouseSimpleThin } from "react-icons/pi";
import { Checkbox } from "antd";
export function UserCard() {
    const { data } = useConfigContext();
    const iconTheme = useMemo(() => {
        return data!.metadata.iconTheme;
    }, [data]);
    const [isPin, setIsPin] = useState(false);

    return (
        <div
            className={clsx(
                styles.window,
                styles.chatterinoWindow,
                "max-h-[500px] text-sm p-4"
            )}
        >
            <div className="flex h-full overflow-hidden flex-col space-y-4">
                <div className="flex space-x-4">
                    <img src="/pajlada.png" className="w-32 h-32" />
                    <div className="flex-grow">
                        <div className="flex space-x-2 items-center">
                            <div> Supibot </div>
                            <img
                                src={
                                    iconTheme == "light"
                                        ? "/chatterino-icons/copyLight.png"
                                        : "/chatterino-icons/copyDark.png"
                                }
                                className="opacity-[0.15] p-1 hover:opacity-100 hover:bg-black/50 w-[26px] h-[26px]"
                            />
                            <div className="flex-grow"></div>
                            <div> ID: 68136884 </div>
                            <img
                                src={
                                    iconTheme == "light"
                                        ? "/chatterino-icons/copyLight.png"
                                        : "/chatterino-icons/copyDark.png"
                                }
                                className="opacity-[0.15] p-1 hover:opacity-100 hover:bg-black/50 w-[26px] h-[26px]"
                            />
                            <img
                                src={
                                    isPin
                                        ? "/chatterino-icons/pinEnabled.png"
                                        : iconTheme == "light"
                                        ? "/chatterino-icons/pinDisabledLight.png"
                                        : "/chatterino-icons/pinDisabledDark.png"
                                }
                                className="w-[26px] h-[26px] p-1 cursor-pointer"
                                onClick={() => setIsPin((e) => !e)}
                            />
                        </div>
                        <div> Followers: 918 </div>
                        <div> Created: 2014-06-10 </div>

                        <div> ★ Previously subscribed for 14 months</div>
                    </div>
                </div>
                <hr />
                {/*action row*/}
                <div className="flex space-x-4 justify-center">
                    <div className="flex space-x-2">
                        <QtCheckbox selected={false} />
                        <div>Block</div>
                    </div>
                    <div className="flex space-x-2">
                        <QtCheckbox selected={true} />
                        <div>Ignore Highlights</div>
                    </div>
                    <div>Usercard</div>
                </div>
                <hr />
                <ChatterinoSplit
                    name=""
                    chatMessages={fakeChatListSmall}
                    chatOnly={true}
                />
            </div>
        </div>
    );
}
