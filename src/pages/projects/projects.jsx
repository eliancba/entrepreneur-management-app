import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Projects({ emprendimientos, setEmprendimientos }) {
    const navigate = useNavigate();

    // Estado para el formulario (solo nombre)
    const [nombreEmprendimiento, setNombreEmprendimiento] = useState('');

    // Función para agregar un emprendimiento
    const handleAddProject = (e) => {
        e.preventDefault();

        // Validación
        if (nombreEmprendimiento.trim() === '') {
            alert('Por favor ingresa un nombre para el emprendimiento');
            return;
        }

        const newProject = {
            id: Date.now(),
            nombre: nombreEmprendimiento.trim(),
            productos: [] // Inicialmente sin productos
        };

        setEmprendimientos([...emprendimientos, newProject]);

        // Redirigir a la página de productos del nuevo emprendimiento
        navigate(`/emprendimientos/${newProject.id}/productos`);
    };

    // Función para eliminar un emprendimiento
    const handleDeleteProject = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este emprendimiento? Se eliminarán todos sus productos.')) {
            setEmprendimientos(emprendimientos.filter(project => project.id !== id));
        }
    };

    // Función para ir a productos
    const handleViewProducts = (id) => {
        navigate(`/emprendimientos/${id}/productos`);
    };

    // Estilos inline
    const containerStyle = {
        padding: '20px',
    };

    const headerStyle = {
        marginBottom: '24px',
        color: '#111827',
    };

    const formStyle = {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
    };

    const inputStyle = {
        padding: '10px 15px',
        fontSize: '14px',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        flex: '1',
        maxWidth: '400px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: '#3b82f6',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    };

    const listStyle = {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    };

    const listItemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        marginBottom: '10px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    };

    const projectInfoStyle = {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flex: 1,
    };

    const projectNameStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#374151',
        minWidth: '150px',
    };

    const projectDetailStyle = {
        fontSize: '14px',
        color: '#6b7280',
    };

    const actionsStyle = {
        display: 'flex',
        gap: '10px',
    };

    const viewButtonStyle = {
        padding: '8px 16px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: '#10b981',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    };

    const deleteButtonStyle = {
        padding: '8px 16px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: '#ef4444',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '40px 20px',
        color: '#9ca3af',
        fontSize: '14px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Emprendimientos</h1>

            {/* Formulario para agregar emprendimiento */}
            <form onSubmit={handleAddProject} style={formStyle}>
                <input
                    type="text"
                    placeholder="Nombre del emprendimiento (ej: Remisería Centro)"
                    value={nombreEmprendimiento}
                    onChange={(e) => setNombreEmprendimiento(e.target.value)}
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                    Crear Emprendimiento
                </button>
            </form>

            {/* Lista de emprendimientos */}
            {emprendimientos.length === 0 ? (
                <div style={emptyStateStyle}>
                    No hay emprendimientos. Crea uno para comenzar.
                </div>
            ) : (
                <ul style={listStyle}>
                    {emprendimientos.map((project) => (
                        <li key={project.id} style={listItemStyle}>
                            <div style={projectInfoStyle}>
                                <span style={projectNameStyle}>{project.nombre}</span>
                                <span style={projectDetailStyle}>
                                    {project.productos.length} producto{project.productos.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div style={actionsStyle}>
                                <button
                                    onClick={() => handleViewProducts(project.id)}
                                    style={viewButtonStyle}
                                >
                                    Ver Productos
                                </button>
                                <button
                                    onClick={() => handleDeleteProject(project.id)}
                                    style={deleteButtonStyle}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Projects;



