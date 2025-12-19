'use client';

import { useEffect, useState } from 'react';

export function useScrollSpy(ids: string[] = [], offset = 80) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                // This is the magic logic:
                // -offset: ignores headers hidden behind a sticky nav
                // -50%: triggers when the element is in the middle of the screen (not just bottom)
                rootMargin: `-${offset}px 0px -50% 0px`,
            },
        );

        ids.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            ids.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [ids, offset]);

    return activeId;
}
