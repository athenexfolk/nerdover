'use client';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type AnimatedContentWrapperProps = {
    children: ReactNode;
    animationKey: string;
};

export default function AnimatedWrapper({
    children,
    animationKey,
}: AnimatedContentWrapperProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={animationKey}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 500 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
