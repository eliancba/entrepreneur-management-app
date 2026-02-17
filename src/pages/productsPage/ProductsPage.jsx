import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/dateHelpers';

function ProductsPage({ emprendimientos, setEmprendimientos }) {
    const { id } = useParams();
    const navigate = useNavigate();

    // Buscar el emprendimiento actual
    const emprendimiento = emprendimientos.find(e => e.id === parseInt(id));

    // Estado para el formulario de productos
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        costo: '',
        cantidad: ''
    });

    // Estado para el formulario de movimientos
    const [movimientoForm, setMovimientoForm] = useState({
        productoId: '',
        tipo: 'ingreso',
        cantidad: ''
    });

    // Si no se encuentra el emprendimiento, mostrar mensaje
    if (!emprendimiento) {
        return (
            <div style={{ padding: '20px' }}>
                <h1>Emprendimiento no encontrado</h1>
                <button onClick={() => navigate('/projects')}>
                    Volver a Emprendimientos
                </button>
            </div>
        );
    }

    // Manejador de cambios en inputs de productos
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejador de cambios en inputs de movimientos
    const handleMovimientoChange = (e) => {
        const { name, value } = e.target;
        setMovimientoForm({
            ...movimientoForm,
            [name]: value
        });
    };

    // Agregar producto
    const handleAddProduct = (e) => {
        e.preventDefault();

        // Validaciones
        if (formData.nombre.trim() === '') {
            alert('Por favor ingresa un nombre para el producto');
            return;
        }
        if (!formData.precio || formData.precio <= 0) {
            alert('Por favor ingresa un precio válido');
            return;
        }
        if (!formData.costo || formData.costo < 0) {
            alert('Por favor ingresa un costo válido');
            return;
        }
        if (!formData.cantidad || formData.cantidad <= 0) {
            alert('Por favor ingresa una cantidad válida');
            return;
        }

        const newProduct = {
            id: Date.now(),
            nombre: formData.nombre.trim(),
            precio: parseFloat(formData.precio),
            costo: parseFloat(formData.costo),
            cantidad: parseInt(formData.cantidad)
        };

        // Actualizar el emprendimiento con el nuevo producto
        const updatedEmprendimientos = emprendimientos.map(emp => {
            if (emp.id === emprendimiento.id) {
                return {
                    ...emp,
                    productos: [...emp.productos, newProduct]
                };
            }
            return emp;
        });

        setEmprendimientos(updatedEmprendimientos);

        // Limpiar formulario
        setFormData({
            nombre: '',
            precio: '',
            costo: '',
            cantidad: ''
        });
    };

    // Eliminar producto
    const handleDeleteProduct = (productId) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            const updatedEmprendimientos = emprendimientos.map(emp => {
                if (emp.id === emprendimiento.id) {
                    return {
                        ...emp,
                        productos: emp.productos.filter(p => p.id !== productId)
                    };
                }
                return emp;
            });

            setEmprendimientos(updatedEmprendimientos);
        }
    };

    // Registrar movimiento
    const handleAddMovimiento = (e) => {
        e.preventDefault();

        // Validaciones
        if (!movimientoForm.productoId) {
            alert('Por favor selecciona un producto');
            return;
        }
        if (!movimientoForm.cantidad || movimientoForm.cantidad <= 0) {
            alert('Por favor ingresa una cantidad válida');
            return;
        }

        const producto = emprendimiento.productos.find(p => p.id === parseInt(movimientoForm.productoId));
        if (!producto) {
            alert('Producto no encontrado');
            return;
        }

        const cantidad = parseInt(movimientoForm.cantidad);
        const precioUnitario = movimientoForm.tipo === 'ingreso' ? producto.precio : producto.costo;
        const total = precioUnitario * cantidad;

        const newMovimiento = {
            id: Date.now(),
            tipo: movimientoForm.tipo,
            productoId: producto.id,
            nombreProducto: producto.nombre,
            cantidad,
            precioUnitario,
            total,
            fecha: new Date().toISOString(),
            timestamp: Date.now()
        };

        // Actualizar emprendimiento con nuevo movimiento
        const updatedEmprendimientos = emprendimientos.map(emp => {
            if (emp.id === emprendimiento.id) {
                return {
                    ...emp,
                    movimientos: [newMovimiento, ...(emp.movimientos || [])]
                };
            }
            return emp;
        });

        setEmprendimientos(updatedEmprendimientos);

        // Limpiar formulario
        setMovimientoForm({
            productoId: '',
            tipo: 'ingreso',
            cantidad: ''
        });
    };

    // Eliminar movimiento
    const handleDeleteMovimiento = (movimientoId) => {
        if (window.confirm('¿Estás seguro de eliminar este movimiento?')) {
            const updatedEmprendimientos = emprendimientos.map(emp => {
                if (emp.id === emprendimiento.id) {
                    return {
                        ...emp,
                        movimientos: (emp.movimientos || []).filter(m => m.id !== movimientoId)
                    };
                }
                return emp;
            });

            setEmprendimientos(updatedEmprendimientos);
        }
    };

    // Estilos
    const containerStyle = {
        padding: '20px',
    };

    const headerStyle = {
        marginBottom: '8px',
        color: '#111827',
    };

    const subtitleStyle = {
        color: '#6b7280',
        fontSize: '14px',
        marginBottom: '24px',
    };

    const sectionTitleStyle = {
        fontSize: '20px',
        fontWeight: '600',
        color: '#111827',
        marginTop: '40px',
        marginBottom: '16px',
    };

    const formStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '10px',
        marginBottom: '20px',
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
        width: '100%',
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
        gridColumn: 'span 1',
    };

    const backButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#6b7280',
        marginBottom: '20px',
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

    const productInfoStyle = {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flex: 1,
    };

    const productNameStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#374151',
        minWidth: '150px',
    };

    const productDetailStyle = {
        fontSize: '14px',
        color: '#6b7280',
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

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
    };

    const thStyle = {
        padding: '12px 16px',
        textAlign: 'left',
        fontSize: '13px',
        fontWeight: '600',
        color: '#374151',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
    };

    const tdStyle = {
        padding: '12px 16px',
        fontSize: '14px',
        color: '#6b7280',
        borderBottom: '1px solid #e5e7eb',
    };

    const badgeIngresoStyle = {
        display: 'inline-block',
        padding: '4px 8px',
        fontSize: '12px',
        fontWeight: '600',
        color: '#047857',
        backgroundColor: '#d1fae5',
        borderRadius: '4px',
    };

    const badgeEgresoStyle = {
        display: 'inline-block',
        padding: '4px 8px',
        fontSize: '12px',
        fontWeight: '600',
        color: '#b91c1c',
        backgroundColor: '#fee2e2',
        borderRadius: '4px',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Productos de {emprendimiento.nombre}</h1>
            <p style={subtitleStyle}>Administra los productos o servicios de este emprendimiento</p>

            <button onClick={() => navigate('/projects')} style={backButtonStyle}>
                ← Volver a Emprendimientos
            </button>

            {/* Formulario para agregar producto */}
            <h2 style={sectionTitleStyle}>Agregar Producto</h2>
            <form onSubmit={handleAddProduct} style={formStyle}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>
                        Nombre del Producto
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Ej: Viaje corto"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>
                        Precio
                    </label>
                    <input
                        type="number"
                        name="precio"
                        placeholder="Ej: 2000"
                        value={formData.precio}
                        onChange={handleInputChange}
                        style={inputStyle}
                        min="0"
                        step="0.01"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>
                        Costo
                    </label>
                    <input
                        type="number"
                        name="costo"
                        placeholder="Ej: 1200"
                        value={formData.costo}
                        onChange={handleInputChange}
                        style={inputStyle}
                        min="0"
                        step="0.01"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>
                        Cantidad
                    </label>
                    <input
                        type="number"
                        name="cantidad"
                        placeholder="Ej: 150"
                        value={formData.cantidad}
                        onChange={handleInputChange}
                        style={inputStyle}
                        min="0"
                    />
                </div>
                <button type="submit" style={buttonStyle}>
                    Agregar Producto
                </button>
            </form>

            {/* Lista de productos */}
            {emprendimiento.productos.length === 0 ? (
                <div style={emptyStateStyle}>
                    No hay productos. Agrega uno para comenzar.
                </div>
            ) : (
                <ul style={listStyle}>
                    {emprendimiento.productos.map((producto) => (
                        <li key={producto.id} style={listItemStyle}>
                            <div style={productInfoStyle}>
                                <span style={productNameStyle}>{producto.nombre}</span>
                                <span style={productDetailStyle}>
                                    Precio: ${producto.precio.toLocaleString()}
                                </span>
                                <span style={productDetailStyle}>
                                    Costo: ${producto.costo.toLocaleString()}
                                </span>
                                <span style={productDetailStyle}>
                                    Cantidad: {producto.cantidad}
                                </span>
                            </div>
                            <button
                                onClick={() => handleDeleteProduct(producto.id)}
                                style={deleteButtonStyle}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Sección de movimientos */}
            {emprendimiento.productos.length > 0 && (
                <>
                    <h2 style={sectionTitleStyle}>Registrar Movimiento</h2>
                    <form onSubmit={handleAddMovimiento} style={formStyle}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>
                                Producto
                            </label>
                            <select
                                name="productoId"
                                value={movimientoForm.productoId}
                                onChange={handleMovimientoChange}
                                style={inputStyle}
                            >
                                <option value="">Seleccionar producto...</option>
                                {emprendimiento.productos.map(p => (
                                    <option key={p.id} value={p.id}>{p.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>
                                Tipo
                            </label>
                            <select
                                name="tipo"
                                value={movimientoForm.tipo}
                                onChange={handleMovimientoChange}
                                style={inputStyle}
                            >
                                <option value="ingreso">Ingreso</option>
                                <option value="egreso">Egreso</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>
                                Cantidad
                            </label>
                            <input
                                type="number"
                                name="cantidad"
                                placeholder="Ej: 10"
                                value={movimientoForm.cantidad}
                                onChange={handleMovimientoChange}
                                style={inputStyle}
                                min="1"
                            />
                        </div>
                        <button type="submit" style={buttonStyle}>
                            Registrar Movimiento
                        </button>
                    </form>

                    {/* Historial de movimientos */}
                    <h2 style={sectionTitleStyle}>Historial de Movimientos</h2>
                    {(!emprendimiento.movimientos || emprendimiento.movimientos.length === 0) ? (
                        <div style={emptyStateStyle}>
                            No hay movimientos registrados.
                        </div>
                    ) : (
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Fecha</th>
                                    <th style={thStyle}>Tipo</th>
                                    <th style={thStyle}>Producto</th>
                                    <th style={thStyle}>Cantidad</th>
                                    <th style={thStyle}>Total</th>
                                    <th style={thStyle}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emprendimiento.movimientos
                                    .sort((a, b) => b.timestamp - a.timestamp)
                                    .map((mov) => (
                                        <tr key={mov.id}>
                                            <td style={tdStyle}>{formatDate(mov.fecha)}</td>
                                            <td style={tdStyle}>
                                                <span style={mov.tipo === 'ingreso' ? badgeIngresoStyle : badgeEgresoStyle}>
                                                    {mov.tipo.toUpperCase()}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>{mov.nombreProducto}</td>
                                            <td style={tdStyle}>{mov.cantidad}</td>
                                            <td style={tdStyle}>${mov.total.toLocaleString()}</td>
                                            <td style={tdStyle}>
                                                <button
                                                    onClick={() => handleDeleteMovimiento(mov.id)}
                                                    style={{ ...deleteButtonStyle, padding: '4px 12px' }}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
}

export default ProductsPage;
