'use client';

import { useEffect, useRef } from 'react';

export interface GraphFunction {
    type: 'linear' | 'horizontal' | 'vertical';
    equation: string;
    color: string;
    lineWidth?: number;
    // For linear: y = mx + b
    slope?: number;
    yIntercept?: number;
    // For horizontal: y = constant
    yValue?: number;
    // For vertical: x = constant
    xValue?: number;
}

export interface CartesianGraphProps {
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
    width?: number;
    height?: number;
    margin?: number;
    gridColor?: string;
    axisColor?: string;
    labelColor?: string;
    showGrid?: boolean;
    showTickMarks?: boolean;
    showLabels?: boolean;
    functions?: GraphFunction[];
    title?: string;
    description?: string;
}

export default function CartesianGraph({
    xMin = -10,
    xMax = 10,
    yMin = -10,
    yMax = 10,
    width = 840,
    height = 840,
    margin = 20,
    gridColor = '#e0e0e0',
    axisColor = '#000000',
    labelColor = '#000',
    showGrid = true,
    showTickMarks = true,
    showLabels = true,
    functions = [],
    title = 'Cartesian Graph',
    description = 'Interactive graph with customizable functions'
}: CartesianGraphProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const exportAsWebP = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = 'cartesian-graph.webp';
        link.href = canvas.toDataURL('image/webp');
        link.click();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = 2.5 * window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        // Calculate graph dimensions
        const graphWidth = width - 2 * margin;
        const graphHeight = height - 2 * margin;
        
        // Calculate ranges and scaling
        const xRange = xMax - xMin;
        const yRange = yMax - yMin;
        const gridSizeX = graphWidth / xRange;
        const gridSizeY = graphHeight / yRange;

        // Calculate origin position
        const originX = margin + Math.abs(xMin) * gridSizeX;
        const originY = margin + yMax * gridSizeY;

        // Draw grid lines
        if (showGrid) {
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 0.5;

            // Vertical grid lines
            for (let i = xMin; i <= xMax; i++) {
                const x = originX + i * gridSizeX;
                if (x >= margin && x <= width - margin) {
                    ctx.beginPath();
                    ctx.moveTo(x, margin);
                    ctx.lineTo(x, height - margin);
                    ctx.stroke();
                }
            }

            // Horizontal grid lines
            for (let i = yMin; i <= yMax; i++) {
                const y = originY - i * gridSizeY;
                if (y >= margin && y <= height - margin) {
                    ctx.beginPath();
                    ctx.moveTo(margin, y);
                    ctx.lineTo(width - margin, y);
                    ctx.stroke();
                }
            }
        }

        // Draw main axes
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 2;

        // X-axis
        ctx.beginPath();
        ctx.moveTo(margin, originY);
        ctx.lineTo(width - margin, originY);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(originX, margin);
        ctx.lineTo(originX, height - margin);
        ctx.stroke();

        // Draw axis arrows
        const arrowSize = 10;

        // X-axis arrows
        ctx.beginPath();
        ctx.moveTo(width - margin - arrowSize, originY - arrowSize / 2);
        ctx.lineTo(width - margin, originY);
        ctx.lineTo(width - margin - arrowSize, originY + arrowSize / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(margin + arrowSize, originY - arrowSize / 2);
        ctx.lineTo(margin, originY);
        ctx.lineTo(margin + arrowSize, originY + arrowSize / 2);
        ctx.stroke();

        // Y-axis arrows
        ctx.beginPath();
        ctx.moveTo(originX - arrowSize / 2, margin + arrowSize);
        ctx.lineTo(originX, margin);
        ctx.lineTo(originX + arrowSize / 2, margin + arrowSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(originX - arrowSize / 2, height - margin - arrowSize);
        ctx.lineTo(originX, height - margin);
        ctx.lineTo(originX + arrowSize / 2, height - margin - arrowSize);
        ctx.stroke();

        // Add axis labels
        if (showLabels) {
            ctx.fillStyle = labelColor;
            ctx.font = '14px cambria-math';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.fillText('X', width - margin - 15, originY - 15);
            ctx.fillText('Y', originX + 15, margin + 15);
            ctx.fillText('O', originX + 10, originY + 10);
        }

        // Set up clipping region
        ctx.save();
        ctx.beginPath();
        ctx.rect(margin, margin, width - 2 * margin, height - 2 * margin);
        ctx.clip();

        // Draw functions
        functions.forEach((func) => {
            ctx.strokeStyle = func.color;
            ctx.lineWidth = func.lineWidth || 3;
            ctx.beginPath();

            switch (func.type) {
                case 'horizontal':
                    if (func.yValue !== undefined) {
                        const plotY = originY - func.yValue * gridSizeY;
                        ctx.moveTo(margin, plotY);
                        ctx.lineTo(width - margin, plotY);
                    }
                    break;

                case 'vertical':
                    if (func.xValue !== undefined) {
                        const plotX = originX + func.xValue * gridSizeX;
                        ctx.moveTo(plotX, margin);
                        ctx.lineTo(plotX, height - margin);
                    }
                    break;

                case 'linear':
                    if (func.slope !== undefined && func.yIntercept !== undefined) {
                        let firstPoint = true;
                        for (let x = xMin; x <= xMax; x += 0.1) {
                            const y = func.slope * x + func.yIntercept;
                            const plotX = originX + x * gridSizeX;
                            const plotY = originY - y * gridSizeY;

                            if (firstPoint) {
                                ctx.moveTo(plotX, plotY);
                                firstPoint = false;
                            } else {
                                ctx.lineTo(plotX, plotY);
                            }
                        }
                    }
                    break;
            }
            ctx.stroke();
        });

        ctx.restore();

        // Add tick marks and numbers
        if (showTickMarks) {
            ctx.font = '12px cambria-math';
            ctx.fillStyle = labelColor;

            // X-axis tick marks and labels
            for (let i = xMin; i <= xMax; i++) {
                if (i === 0 || i === xMin || i === xMax) continue;

                const x = originX + i * gridSizeX;
                if (x >= margin && x <= width - margin) {
                    ctx.beginPath();
                    ctx.moveTo(x, originY - 5);
                    ctx.lineTo(x, originY + 5);
                    ctx.strokeStyle = axisColor;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(i.toString(), x, originY + 8);
                }
            }

            // Y-axis tick marks and labels
            for (let i = yMin; i <= yMax; i++) {
                if (i === 0 || i === yMin || i === yMax) continue;

                const y = originY - i * gridSizeY;
                if (y >= margin && y <= height - margin) {
                    ctx.beginPath();
                    ctx.moveTo(originX - 5, y);
                    ctx.lineTo(originX + 5, y);
                    ctx.strokeStyle = axisColor;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(i.toString(), originX - 8, y);
                }
            }
        }

        // Add function labels
        if (showLabels) {
            ctx.font = 'bold 14px cambria-math';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            functions.forEach((func, index) => {
                let labelX = 0, labelY = 0, plotX = 0, plotY = 0;

                switch (func.type) {
                    case 'horizontal':
                        if (func.yValue !== undefined) {
                            labelX = 2;
                            labelY = func.yValue;
                            plotX = originX + labelX * gridSizeX;
                            plotY = originY - labelY * gridSizeY;
                        }
                        break;

                    case 'vertical':
                        if (func.xValue !== undefined) {
                            labelX = func.xValue;
                            labelY = -2;
                            plotX = originX + labelX * gridSizeX;
                            plotY = originY - labelY * gridSizeY;
                        }
                        break;

                    case 'linear':
                        if (func.slope !== undefined && func.yIntercept !== undefined) {
                            labelX = index === 0 ? 1 : -1;
                            labelY = func.slope * labelX + func.yIntercept;
                            plotX = originX + labelX * gridSizeX;
                            plotY = originY - labelY * gridSizeY;
                        }
                        break;
                }

                // Draw label background
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                const textWidth = ctx.measureText(func.equation).width;
                ctx.fillRect(plotX - textWidth/2 - 5, plotY - 10, textWidth + 10, 20);

                // Draw label text
                ctx.fillStyle = func.color;
                ctx.fillText(func.equation, plotX, plotY);
            });
        }
    }, [xMin, xMax, yMin, yMax, width, height, margin, gridColor, axisColor, labelColor, showGrid, showTickMarks, showLabels, functions]);

    return (
        <div className="flex justify-center">
            <div className="rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {title}
                    </h2>
                    <button
                        onClick={exportAsWebP}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        Export WebP
                    </button>
                </div>
                <canvas
                    ref={canvasRef}
                    className="rounded border border-gray-300"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>• X-axis range: {xMin} to {xMax}</p>
                    <p>• Y-axis range: {yMin} to {yMax}</p>
                    {functions.map((func, index) => (
                        <p key={index} style={{ color: func.color }}>
                            • {func.equation}
                        </p>
                    ))}
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}
