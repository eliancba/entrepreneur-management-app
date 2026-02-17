/**
 * Calculation helper functions for KPIs
 */

import { filterByThisMonth, filterByThisWeek } from './dateHelpers.js';

/**
 * Sum movimientos by type
 * @param {Array} movimientos - Array of movimiento objects
 * @param {string} tipo - "ingreso" or "egreso"
 * @returns {number} Total sum
 */
export const sumByType = (movimientos, tipo) => {
    return movimientos
        .filter(mov => mov.tipo === tipo)
        .reduce((sum, mov) => sum + mov.total, 0);
};

/**
 * Calculate KPIs from movimientos with filters
 * @param {Array} movimientos - All movimientos
 * @param {string} dateFilter - "todo" | "mes" | "semana"
 * @returns {Object} { ventas, gastos, ganancia, hasMovimientos }
 */
export const calculateKPIsFromMovimientos = (movimientos, dateFilter = 'todo') => {
    let filteredMovimientos = movimientos;

    // Apply date filter
    if (dateFilter === 'mes') {
        filteredMovimientos = filterByThisMonth(movimientos);
    } else if (dateFilter === 'semana') {
        filteredMovimientos = filterByThisWeek(movimientos);
    }

    const ventas = sumByType(filteredMovimientos, 'ingreso');
    const gastos = sumByType(filteredMovimientos, 'egreso');
    const ganancia = ventas - gastos;

    return {
        ventas,
        gastos,
        ganancia,
        hasMovimientos: filteredMovimientos.length > 0
    };
};
