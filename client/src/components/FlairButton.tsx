import React from "react"

import styles from "../styles/flairButton.module.css"

function FlairButton({ isActive, toggle, index, text }: { isActive: boolean, toggle: Function, index: number, text: string }) {
    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        toggle(index);
    };

    return (isActive) ? (
        <button id={text} className={styles.active} onClick={handleToggle}>
            {text}
        </button>
    ) : (
        <button id={text} className={styles.inactive} onClick={handleToggle}>
            {text}
        </button>
    );
}

export default FlairButton