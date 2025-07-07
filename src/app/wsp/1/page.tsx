'use client';

import { useState, useRef, useEffect } from 'react';

export default function DecimalAdditionCanvas() {
    const [number1, setNumber1] = useState('3.00');
    const [number2, setNumber2] = useState('2.567');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawAddition = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set font and styles
        ctx.font = '24px monospace';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'right';

        // Calculate the sum
        const sum = (parseFloat(number1) + parseFloat(number2)).toFixed(3);

        // Format numbers to show decimal alignment
        const formatNumber = (num: string) => {
            const parts = num.split('.');
            const wholePart = parts[0] || '0';
            const decimalPart = parts[1] || '000';
            return `${wholePart.padStart(3)} . ${decimalPart.padEnd(3)}`;
        };

        const formattedNum1 = formatNumber(number1);
        const formattedNum2 = formatNumber(number2);
        const formattedSum = formatNumber(sum);

        // Calculate positions
        const x = canvas.width - 50;
        let y = 80;
        const lineHeight = 40;

        // Draw first number
        ctx.fillText(formattedNum1, x, y);
        y += lineHeight;

        // Draw second number with plus sign
        ctx.fillText(formattedNum2, x, y);
        ctx.textAlign = 'left';
        ctx.fillText('+', 50, y);
        ctx.textAlign = 'right';
        y += lineHeight;

        // Draw line
        ctx.beginPath();
        ctx.moveTo(50, y - 10);
        ctx.lineTo(x + 10, y - 10);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
        y += 10;

        // Draw sum
        ctx.fillText(formattedSum, x, y);
        y += 20;

        // Draw bottom line
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
    };

    useEffect(() => {
        drawAddition();
    }, [number1, number2]);

    const generateRandomNumbers = () => {
        const num1 = (Math.random() * 10).toFixed(2);
        const num2 = (Math.random() * 10).toFixed(3);
        setNumber1(num1);
        setNumber2(num2);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-4xl px-4">
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
                    Decimal Addition Canvas
                </h1>

                <div className="mb-6 rounded-lg bg-white p-6 shadow-lg">
                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="number1"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                First Number:
                            </label>
                            <input
                                id="number1"
                                type="number"
                                step="0.001"
                                value={number1}
                                onChange={(e) => setNumber1(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter first decimal number"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="number2"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Second Number:
                            </label>
                            <input
                                id="number2"
                                type="number"
                                step="0.001"
                                value={number2}
                                onChange={(e) => setNumber2(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter second decimal number"
                            />
                        </div>
                    </div>

                    <div className="mb-6 flex justify-center">
                        <button
                            onClick={generateRandomNumbers}
                            className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                        >
                            Generate Random Numbers
                        </button>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">
                        Addition Summary
                    </h2>
                    <div className="flex justify-center">
                        <canvas
                            ref={canvasRef}
                            width={400}
                            height={300}
                            className="rounded-md border border-gray-300 bg-white"
                        />
                    </div>

                    <div className="mt-4 text-center text-gray-600">
                        <p>
                            Result:{' '}
                            {(
                                parseFloat(number1) + parseFloat(number2)
                            ).toFixed(3)}
                        </p>
                    </div>
                </div>

                <div className="mt-6 rounded-lg bg-blue-50 p-4">
                    <h3 className="mb-2 text-lg font-medium text-blue-800">
                        How it works:
                    </h3>
                    <ul className="space-y-1 text-blue-700">
                        <li>• Enter two decimal numbers in the input fields</li>
                        <li>
                            • The canvas shows the traditional addition format
                            with decimal alignment
                        </li>
                        <li>
                            • Numbers are aligned by decimal point for proper
                            addition
                        </li>
                        <li>
                            • Click "Generate Random Numbers" for practice
                            examples
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
