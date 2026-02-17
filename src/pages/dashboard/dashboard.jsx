import React, { useState } from 'react';
import KpiCard from '../../components/dashboard/KpiCard';
import LineChart from '../../components/LineChart';
import { calculateKPIsFromMovimientos } from '../../utils/calculations';
import { filterByThisMonth, filterByThisWeek } from '../../utils/dateHelpers';

function Dashboard({ emprendimientos }) {
    // Estado local para filtros
    const [selectedEmprendimiento, setSelectedEmprendimiento] = useState('Todos');
    const [selectedPeriodo, setSelectedPeriodo] = useState('todo');

    // Obtener todos los movimientos según filtros
    const getAllMovimientos = () => {
        let allMovimientos = [];

        if (selectedEmprendimiento === 'Todos') {
            emprendimientos.forEach(emp => {
                if (emp.movimientos) {
                    allMovimientos = [...allMovimientos, ...emp.movimientos];
                }
            });
        } else {
            const emp = emprendimientos.find(e => e.nombre === selectedEmprendimiento);
            if (emp && emp.movimientos) {
                allMovimientos = emp.movimientos;
            }
        }

        // Aplicar filtro de período
        if (selectedPeriodo === 'mes') {
            return filterByThisMonth(allMovimientos);
        } else if (selectedPeriodo === 'semana') {
            return filterByThisWeek(allMovimientos);
        }

        return allMovimientos;
    };

    const movimientos = getAllMovimientos();
    const kpis = calculateKPIsFromMovimientos(movimientos, 'todo'); // Ya filtrados arriba

    // Función para formatear números como moneda
    const formatCurrency = (value) => {
        return `$${value.toLocaleString('es-AR')}`;
    };

    const containerStyle = {
        padding: '20px',
    };

    const headerStyle = {
        marginBottom: '24px',
        color: '#111827',
    };

    const filterContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
    };

    const filterStyle = {
        padding: '15px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
    };

    const selectStyle = {
        padding: '10px 15px',
        fontSize: '14px',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        width: '100%',
        color: '#1f2937',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#374151',
    };

    const gridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        justifyContent: 'space-between',
        margin: '-10px', // Offset KpiCard margins
        marginBottom: '30px',
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        marginTop: '20px',
    };

    const emptyTextStyle = {
        color: '#9ca3af',
        fontSize: '16px',
        marginBottom: '8px',
    };

    const emptySubtextStyle = {
        color: '#6b7280',
        fontSize: '14px',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Dashboard Overview</h1>

            {/* Filtros */}
            <div style={filterContainerStyle}>
                <div style={filterStyle}>
                    <label htmlFor="emprendimiento-filter" style={labelStyle}>
                        Filtrar por Emprendimiento
                    </label>
                    <select
                        id="emprendimiento-filter"
                        value={selectedEmprendimiento}
                        onChange={(e) => setSelectedEmprendimiento(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="Todos">Todos los Emprendimientos</option>
                        {emprendimientos.map((emp) => (
                            <option key={emp.id} value={emp.nombre}>
                                {emp.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={filterStyle}>
                    <label htmlFor="periodo-filter" style={labelStyle}>
                        Filtrar por Período
                    </label>
                    <select
                        id="periodo-filter"
                        value={selectedPeriodo}
                        onChange={(e) => setSelectedPeriodo(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="todo">Todo el tiempo</option>
                        <option value="mes">Este mes</option>
                        <option value="semana">Esta semana</option>
                    </select>
                </div>
            </div>

            {/* KPI Cards o estado vacío */}
            {!kpis.hasMovimientos ? (
                <div style={emptyStateStyle}>
                    <p style={emptyTextStyle}>No hay movimientos en este período</p>
                    <p style={emptySubtextStyle}>
                        Registra movimientos en tus emprendimientos para ver las métricas y gráficos
                    </p>
                </div>
            ) : (
                <>
                    <div style={gridStyle}>
                        <KpiCard
                            title="Ventas Totales"
                            value={formatCurrency(kpis.ventas)}
                            description={selectedEmprendimiento === 'Todos' ? 'Todos los emprendimientos' : selectedEmprendimiento}
                        />
                        <KpiCard
                            title="Gastos Totales"
                            value={formatCurrency(kpis.gastos)}
                            description={selectedEmprendimiento === 'Todos' ? 'Suma de gastos' : 'Gastos del emprendimiento'}
                        />
                        <KpiCard
                            title="Ganancia Neta"
                            value={formatCurrency(kpis.ganancia)}
                            description={`Margen: ${kpis.ventas > 0 ? ((kpis.ganancia / kpis.ventas) * 100).toFixed(1) : 0}%`}
                        />
                    </div>

                    {/* Gráfico de líneas */}
                    <LineChart movimientos={movimientos} />
                </>
            )}
        </div>
    );
}

export default Dashboard;
