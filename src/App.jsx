import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";
import ProductsPage from "./pages/productsPage/ProductsPage";




// Mock data para inicialización
const mockData = [
  {
    id: 1,
    nombre: 'Remisería Centro',
    productos: [
      { id: 1, nombre: 'Viaje corto', precio: 2000, costo: 1200, cantidad: 150 },
      { id: 2, nombre: 'Viaje largo', precio: 4000, costo: 2500, cantidad: 50 }
    ],
    movimientos: [
      {
        id: 1,
        tipo: 'ingreso',
        productoId: 1,
        nombreProducto: 'Viaje corto',
        cantidad: 50,
        precioUnitario: 2000,
        total: 100000,
        fecha: new Date(2026, 1, 10, 9, 30).toISOString(),
        timestamp: new Date(2026, 1, 10, 9, 30).getTime()
      },
      {
        id: 2,
        tipo: 'egreso',
        productoId: 1,
        nombreProducto: 'Viaje corto',
        cantidad: 30,
        precioUnitario: 1200,
        total: 36000,
        fecha: new Date(2026, 1, 12, 14, 15).toISOString(),
        timestamp: new Date(2026, 1, 12, 14, 15).getTime()
      }
    ]
  },
  {
    id: 2,
    nombre: 'Delivery Express',
    productos: [
      { id: 1, nombre: 'Envío local', precio: 1500, costo: 800, cantidad: 200 },
      { id: 2, nombre: 'Envío zona', precio: 2500, costo: 1500, cantidad: 80 }
    ],
    movimientos: [
      {
        id: 1,
        tipo: 'ingreso',
        productoId: 1,
        nombreProducto: 'Envío local',
        cantidad: 100,
        precioUnitario: 1500,
        total: 150000,
        fecha: new Date(2026, 1, 13, 11, 0).toISOString(),
        timestamp: new Date(2026, 1, 13, 11, 0).getTime()
      }
    ]
  }
];

function App() {
  // Cargar desde localStorage o usar mockData
  const loadInitialData = () => {
    try {
      const stored = localStorage.getItem("emprendimientos");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
    return mockData;
  };

  // Estado centralizado para emprendimientos con productos y movimientos
  const [emprendimientos, setEmprendimientos] = useState(loadInitialData);

  // Auto-guardar en localStorage cuando cambian los emprendimientos
  useEffect(() => {
    try {
      localStorage.setItem("emprendimientos", JSON.stringify(emprendimientos));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [emprendimientos]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard emprendimientos={emprendimientos} />} />
          <Route path="/projects" element={<Projects emprendimientos={emprendimientos} setEmprendimientos={setEmprendimientos} />} />
          <Route path="/emprendimientos/:id/productos" element={<ProductsPage emprendimientos={emprendimientos} setEmprendimientos={setEmprendimientos} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;




