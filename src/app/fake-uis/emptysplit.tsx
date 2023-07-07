import styles from "@/app/fake-uis/chatlist.module.css";
import { ChatterinoFakeTab } from "@/app/fake-uis/chatterinoFakeTab";
import clsx from "clsx";

export function ChatterinoEmptySplit({
    extraClasses = "",
}: {
    extraClasses?: string;
}) {
    return (
        <div
            className={`${extraClasses} ${styles.window} ${styles.chatterinoWindow}`}
        >
            <ChatterinoFakeTab />
            <div
                className={clsx(
                    "h-full flex flex-col justify-center items-center overflow-hidden cursor-pointer",
                    styles.split
                )}
            >
                <div className={clsx(styles.emptySplitText, "mb-8")}>
                    Click to add a split.
                </div>

                <div className={styles.emptySplitText}>
                    After adding hold &lt;Ctrl+Alt&gt; to move or split it.
                </div>
            </div>
        </div>
    );
}
