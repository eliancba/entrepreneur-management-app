import React from 'react';

const KpiCard = ({ title, value, description }) => {
    const cardStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        textAlign: 'center',
        flex: '1',
        minWidth: '200px',
        margin: '10px',
        transition: 'transform 0.2s ease-in-out',
    };

    const titleStyle = {
        fontSize: '0.875rem',
        color: '#6b7280',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: '8px',
        letterSpacing: '0.025em',
    };

    const valueStyle = {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#111827',
        margin: '0',
    };

    const descriptionStyle = {
        fontSize: '0.750rem',
        color: '#9ca3af',
        marginTop: '8px',
    };

    return (
        <div style={cardStyle}>
            <h3 style={titleStyle}>{title}</h3>
            <p style={valueStyle}>{value}</p>
            {description && <p style={descriptionStyle}>{description}</p>}
        </div>
    );
};

export default KpiCard;
