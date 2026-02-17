import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { groupByDay, formatChartDate } from '../utils/dateHelpers';

function LineChart({ movimientos }) {
    // Agrupar movimientos por día
    const data = groupByDay(movimientos).map(item => ({
        ...item,
        fecha: formatChartDate(item.date)
    }));

    // Si no hay datos, mostrar mensaje
    if (data.length === 0) {
        return (
            <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                color: '#9ca3af'
            }}>
                No hay datos para mostrar en el gráfico
            </div>
        );
    }

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
        }}>
            <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '16px'
            }}>
                Evolución de Ingresos y Egresos
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="fecha"
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '14px'
                        }}
                        formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Legend
                        wrapperStyle={{ fontSize: '14px' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="ingresos"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Ingresos"
                        dot={{ fill: '#10b981', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="egresos"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="Egresos"
                        dot={{ fill: '#ef4444', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChart;
