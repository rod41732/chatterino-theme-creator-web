import styles from "@/app/fake-uis/chatlist.module.css";
import { FaCog, FaUserAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import clsx from "clsx";

export function ChatterinoFakeTab() {
    return (
        <div
            className={`flex flex-wrap ${styles.tabContainer} w-full ${styles.window}`}
        >
            <div className={clsx(styles.tabBase, styles.tabButton)}>
                <FaCog />
            </div>
            <div className={clsx(styles.tabBase, styles.tabButton)}>
                <FaUserAlt />
            </div>
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
            <div className={styles.tabButton}>
                <AiOutlinePlus />
            </div>
        </div>
    );
}
