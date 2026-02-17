/**
 * Date helper functions for filtering and formatting
 */

/**
 * Format ISO date string to readable format
 * @param {string} isoDateString - ISO date string
 * @returns {string} Formatted date (DD/MM/YYYY HH:mm)
 */
export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Filter movimientos from this month
 * @param {Array} movimientos - Array of movimiento objects
 * @returns {Array} Filtered movimientos
 */
export const filterByThisMonth = (movimientos) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return movimientos.filter(mov => {
        const movDate = new Date(mov.fecha);
        return movDate.getMonth() === currentMonth && movDate.getFullYear() === currentYear;
    });
};

/**
 * Filter movimientos from this week (last 7 days)
 * @param {Array} movimientos - Array of movimiento objects
 * @returns {Array} Filtered movimientos
 */
export const filterByThisWeek = (movimientos) => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return movimientos.filter(mov => {
        const movDate = new Date(mov.fecha);
        return movDate >= sevenDaysAgo;
    });
};

/**
 * Group movimientos by day
 * @param {Array} movimientos - Array of movimiento objects
 * @returns {Array} Array of {date, ingresos, egresos}
 */
export const groupByDay = (movimientos) => {
    const grouped = {};

    movimientos.forEach(mov => {
        const date = new Date(mov.fecha);
        const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        if (!grouped[dateKey]) {
            grouped[dateKey] = {
                date: dateKey,
                ingresos: 0,
                egresos: 0
            };
        }

        if (mov.tipo === 'ingreso') {
            grouped[dateKey].ingresos += mov.total;
        } else {
            grouped[dateKey].egresos += mov.total;
        }
    });

    // Convert to array and sort by date
    return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * Format date for chart display (short format)
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {string} Formatted date (DD/MM)
 */
export const formatChartDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}`;
};
