"use client";
import React, { useEffect, useState } from "react";

const HTMLContent = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 70); // Roughly 7 seconds for 100 counts

        return () => clearInterval(timer);
    }, []);

    return <pre style={text}>{count}</pre>;
};

/**
 * ==============   Styles   ================
 */

const text = {
    fontSize: 44,
    color: "#fff",
    marginLeft: 90
};

export default HTMLContent;