import styles from "@/app/chatlist.module.css";

export function ChatterinoFakeTab() {
    return (
        <div
            className={`flex flex-wrap ${styles.tabContainer} w-full bg-black`}
        >
            <div className={`${styles.tabBase} ${styles.tabSelected}`}>
                current tab
            </div>
            <div className={`${styles.tabBase} ${styles.tabRegular}`}>
                unselected
            </div>
            <div className={`${styles.tabBase} ${styles.tabNewMessage}`}>
                newMessage
            </div>
            <div className={`${styles.tabBase} ${styles.tabRegular}`}>
                unselected
            </div>
            <div className={`${styles.tabBase} ${styles.tabHighlighted}`}>
                pinged
            </div>
            <div className={`${styles.tabBase} ${styles.tabRegular}`}>
                unselected
            </div>
            <div className={`${styles.tabBase} ${styles.tabRegular}`}>
                unselected
            </div>
            <div className={`${styles.tabBase} ${styles.tabRegular}`}>
                unselected
            </div>
            <div className={`${styles.tabBase} ${styles.tabRegular}`}>
                unselected
            </div>
            <div className={`${styles.tabBase} ${styles.tabRegular}`}>
                unselected
            </div>
        </div>
    );
}
