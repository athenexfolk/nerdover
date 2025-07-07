'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

const page = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const baseWidth = 1200;
    const baseHeight = 300;
    const [scale, setScale] = useState(1);

    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = 2.5 * window.devicePixelRatio || 1;

        const displayWidth = baseWidth;
        const displayHeight = baseHeight;
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;

        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, displayWidth, displayHeight);

        const width = displayWidth;
        const height = displayHeight;
        const centerY = height / 2;
        const lineStartX = 50;
        const lineEndX = width - 50;
        const lineLength = lineEndX - lineStartX - 50;

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(lineStartX, centerY);
        ctx.lineTo(lineEndX, centerY);
        ctx.stroke();

        const arrowSize = 12;

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(lineEndX + arrowSize, centerY);
        ctx.lineTo(lineEndX, centerY - arrowSize / 2);
        ctx.lineTo(lineEndX, centerY + arrowSize / 2);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(lineStartX - arrowSize, centerY);
        ctx.lineTo(lineStartX, centerY - arrowSize / 2);
        ctx.lineTo(lineStartX, centerY + arrowSize / 2);
        ctx.closePath();
        ctx.fill();

        const zeroX = lineStartX + ((0 + 10) / 20) * lineLength + 25;
        const negativeStartX = lineStartX + 25;
        const negativeEndX = zeroX - 50;
        const positiveStartX = zeroX + 50;
        const positiveEndX = lineEndX - 25;
        const arrowsY = centerY - 60;

        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(negativeStartX, arrowsY);
        ctx.lineTo(negativeEndX, arrowsY);
        ctx.stroke();

        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.moveTo(negativeStartX - 8, arrowsY);
        ctx.lineTo(negativeStartX, arrowsY - 4);
        ctx.lineTo(negativeStartX, arrowsY + 4);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#dc2626';
        ctx.font = '20px "Noto Sans Thai"';
        ctx.textAlign = 'center';
        ctx.fillText(
            'จำนวนลบ',
            (negativeStartX + negativeEndX) / 2,
            arrowsY - 20,
        );

        ctx.strokeStyle = '#20a34a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(positiveStartX, arrowsY);
        ctx.lineTo(positiveEndX, arrowsY);
        ctx.stroke();

        ctx.fillStyle = '#20a34a';
        ctx.beginPath();
        ctx.moveTo(positiveEndX + 8, arrowsY);
        ctx.lineTo(positiveEndX, arrowsY - 4);
        ctx.lineTo(positiveEndX, arrowsY + 4);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#20a34a';
        ctx.font = '20px "Noto Sans Thai"';
        ctx.textAlign = 'center';
        ctx.fillText(
            'จำนวนบวก',
            (positiveStartX + positiveEndX) / 2,
            arrowsY - 20,
        );

        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(zeroX, arrowsY, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2563eb';
        ctx.font = '20px "Noto Sans Thai"';
        ctx.textAlign = 'center';
        ctx.fillText('ศูนย์', zeroX, arrowsY - 25);

        for (let i = -5; i <= 5; i++) {
            const x = lineStartX + ((i + 5) / 10) * lineLength + 25;

            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            const tickHeight = 20;

            ctx.beginPath();
            ctx.moveTo(x, centerY - tickHeight / 2);
            ctx.lineTo(x, centerY + tickHeight / 2);
            ctx.stroke();

            ctx.fillStyle = '#000';
            ctx.font = '20px cambria-math';
            ctx.textAlign = 'center';
            ctx.fillText(i.toString(), x, centerY + 40);
        }
    }, [scale]);

    const exportCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = 'number-line.webp';
        link.href = canvas.toDataURL('image/webp');
        link.click();
    };

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth - 32;
                const newScale = Math.min(1, containerWidth / baseWidth);
                setScale(newScale);
            }
        };

        updateScale();

        const resizeObserver = new ResizeObserver(updateScale);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        drawCanvas();
    }, [drawCanvas]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <div
                ref={containerRef}
                className="w-full max-w-6xl rounded-lg bg-white p-4 shadow-lg sm:p-8"
            >
                <div className="mb-4 flex justify-end">
                    <button
                        onClick={exportCanvas}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Export WebP
                    </button>
                </div>
                <canvas
                    ref={canvasRef}
                    className="h-auto w-full rounded border border-gray-200"
                />
            </div>
        </div>
    );
};

export default page;
