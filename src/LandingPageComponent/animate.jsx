"use client";
import React, { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

const HTMLContent = () => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, 100, { duration: 7});
        return () => controls.stop();
    }, [count]);

    return <motion.pre style={text}>{rounded}</motion.pre>;
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