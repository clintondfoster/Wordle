import React, { useEffect, useState} from "react";
import "../less/index.less";

function Popup ({ message }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1000);
        return () => clearTimeout(timer)
    }, []);

    if (!isVisible) return null;

    return (
        <div className="popup">{message}</div>
    )
};

export default Popup;