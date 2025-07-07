'use client';

import CartesianGraph, { GraphFunction } from '@/components/CartesianGraph';

export default function ReusableGraphExamples() {
    // Example 1: Simple quadratic and linear functions (-5 to 5 range)
    const example1Functions: GraphFunction[] = [
        {
            type: 'linear',
            equation: 'y = 2x + 1',
            color: '#ff6b6b',
            slope: 2,
            yIntercept: 1,
            lineWidth: 2
        },
        {
            type: 'linear',
            equation: 'y = -x + 3',
            color: '#4ecdc4',
            slope: -1,
            yIntercept: 3,
            lineWidth: 2
        }
    ];

    // Example 2: Basic trigonometric-like patterns (-10 to 10 range)
    const example2Functions: GraphFunction[] = [
        {
            type: 'horizontal',
            equation: 'y = 5',
            color: '#45b7d1',
            yValue: 5,
            lineWidth: 2
        },
        {
            type: 'horizontal',
            equation: 'y = -3',
            color: '#f39c12',
            yValue: -3,
            lineWidth: 2
        },
        {
            type: 'vertical',
            equation: 'x = 0',
            color: '#e74c3c',
            xValue: 0,
            lineWidth: 2
        }
    ];

    // Example 3: Complex linear system (-20 to 20 range)
    const example3Functions: GraphFunction[] = [
        {
            type: 'linear',
            equation: 'y = 0.5x + 10',
            color: '#9b59b6',
            slope: 0.5,
            yIntercept: 10,
            lineWidth: 3
        },
        {
            type: 'linear',
            equation: 'y = -0.8x - 5',
            color: '#27ae60',
            slope: -0.8,
            yIntercept: -5,
            lineWidth: 3
        },
        {
            type: 'vertical',
            equation: 'x = 15',
            color: '#f1c40f',
            xValue: 15,
            lineWidth: 2
        },
        {
            type: 'horizontal',
            equation: 'y = 0',
            color: '#34495e',
            yValue: 0,
            lineWidth: 1
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-gray-800">
                        Reusable Cartesian Graph Component Examples
                    </h1>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        Demonstration of the flexible CartesianGraph component with different
                        axis ranges, functions, and styling options. Each graph can be customized
                        with different edge values to scope the boundary and axis translations.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Example 1: Small scale graph */}
                    <div>
                        <h2 className="mb-4 text-2xl font-semibold text-gray-800 text-center">
                            Example 1: Small Scale (-5 to 5)
                        </h2>
                        <CartesianGraph
                            xMin={-5}
                            xMax={5}
                            yMin={-5}
                            yMax={5}
                            width={600}
                            height={600}
                            functions={example1Functions}
                            title="Linear Functions - Small Scale"
                            description="Perfect for detailed analysis of simple linear relationships"
                        />
                    </div>

                    {/* Example 2: Medium scale graph */}
                    <div>
                        <h2 className="mb-4 text-2xl font-semibold text-gray-800 text-center">
                            Example 2: Medium Scale (-10 to 10)
                        </h2>
                        <CartesianGraph
                            xMin={-10}
                            xMax={10}
                            yMin={-10}
                            yMax={10}
                            width={700}
                            height={700}
                            functions={example2Functions}
                            title="Horizontal and Vertical Lines"
                            description="Demonstrating constant functions and reference lines"
                            gridColor="#f0f0f0"
                            axisColor="#333333"
                        />
                    </div>

                    {/* Example 3: Large scale graph */}
                    <div>
                        <h2 className="mb-4 text-2xl font-semibold text-gray-800 text-center">
                            Example 3: Large Scale (-20 to 20)
                        </h2>
                        <CartesianGraph
                            xMin={-20}
                            xMax={20}
                            yMin={-20}
                            yMax={20}
                            width={800}
                            height={800}
                            functions={example3Functions}
                            title="Complex Linear System - Large Scale"
                            description="Wide view for understanding broader mathematical relationships"
                            margin={30}
                        />
                    </div>

                    {/* Example 4: Custom asymmetric range */}
                    <div>
                        <h2 className="mb-4 text-2xl font-semibold text-gray-800 text-center">
                            Example 4: Custom Asymmetric Range
                        </h2>
                        <CartesianGraph
                            xMin={-15}
                            xMax={25}
                            yMin={-10}
                            yMax={30}
                            width={900}
                            height={700}
                            functions={[
                                {
                                    type: 'linear',
                                    equation: 'y = 1.2x + 5',
                                    color: '#e67e22',
                                    slope: 1.2,
                                    yIntercept: 5,
                                    lineWidth: 4
                                },
                                {
                                    type: 'horizontal',
                                    equation: 'y = 20',
                                    color: '#8e44ad',
                                    yValue: 20,
                                    lineWidth: 2
                                }
                            ]}
                            title="Asymmetric Range Graph"
                            description="Custom X(-15 to 25) and Y(-10 to 30) ranges for specialized use cases"
                            showGrid={true}
                            showTickMarks={true}
                            showLabels={true}
                        />
                    </div>
                </div>

                {/* Usage instructions */}
                <div className="mt-16 rounded-lg bg-blue-50 p-6">
                    <h3 className="mb-4 text-xl font-semibold text-blue-800">
                        How to Use the Reusable CartesianGraph Component
                    </h3>
                    <div className="space-y-4 text-blue-700">
                        <div>
                            <h4 className="font-semibold">Basic Props:</h4>
                            <ul className="ml-4 list-disc space-y-1">
                                <li><code>xMin, xMax, yMin, yMax</code>: Define the axis ranges (edge values)</li>
                                <li><code>width, height</code>: Canvas dimensions in pixels</li>
                                <li><code>margin</code>: Space around the graph area</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Styling Props:</h4>
                            <ul className="ml-4 list-disc space-y-1">
                                <li><code>gridColor, axisColor, labelColor</code>: Customize colors</li>
                                <li><code>showGrid, showTickMarks, showLabels</code>: Toggle elements</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Function Types:</h4>
                            <ul className="ml-4 list-disc space-y-1">
                                <li><strong>Linear:</strong> y = mx + b (provide slope and yIntercept)</li>
                                <li><strong>Horizontal:</strong> y = constant (provide yValue)</li>
                                <li><strong>Vertical:</strong> x = constant (provide xValue)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
