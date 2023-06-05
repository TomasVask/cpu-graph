import React from "react";
import styles from "./style.module.css"

const AverageBox = ({ averageProv, averageReq }) => {
    return (
        <section className={styles.avgBox}>
            <div className={styles.avgProvGroup}>
                <div className={styles.provIcon}></div>
                <div className={styles.avgProvisioned}>
                    <p>AVERAGE PROVISIONED</p>
                    <span>{averageProv}</span> <span>CPU / d</span>
                </div>
            </div>
            <div className={styles.avgReqGroup}>
                <div className={styles.reqIcon}></div>
                <div className={styles.avgRequested}>
                    <p>AVERAGE REQUESTED</p>
                    <span>{averageReq}</span> <span>CPU / d</span>
                </div>
            </div>
        </section>
    )
};
export default AverageBox;