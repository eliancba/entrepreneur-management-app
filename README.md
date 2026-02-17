# 📊 Entrepreneur Management App

Aplicación web tipo mini SaaS desarrollada con **React + Vite** para la gestión de pequeños emprendimientos.

Permite administrar productos, registrar ingresos y egresos, visualizar métricas clave (KPIs) y analizar la evolución financiera mediante gráficos dinámicos con filtros por período.

---

## 🚀 Demo

🔗 https://entrepreneur-management-apps.vercel.app/

---

## ✨ Características principales

- ✔ Creación y gestión de emprendimientos  
- ✔ Gestión de productos  
- ✔ Registro de movimientos (Ingresos / Egresos)  
- ✔ Historial con fecha y hora  
- ✔ Filtros por período:
  - Todo el tiempo
  - Este mes
  - Esta semana  
- ✔ Cálculo automático de KPIs:
  - Ventas
  - Gastos
  - Ganancia  
- ✔ Gráfico de líneas con evolución diaria  
- ✔ Persistencia de datos con LocalStorage  
- ✔ Interfaz estilo dashboard profesional  

---

## 📈 Métricas dinámicas

Las métricas se calculan en tiempo real a partir de los movimientos registrados.

- **Ventas:** suma de ingresos  
- **Gastos:** suma de egresos  
- **Ganancia:** ventas - gastos  

---

## 🛠 Tecnologías utilizadas

- React  
- Vite  
- React Router  
- Recharts  
- LocalStorage  
- JavaScript (ES6+)  

---

## 📂 Estructura del proyecto

```text
src/
  components/
     KpiCard.jsx
     LineChart.jsx
  pages/
     dashboard/
        Dashboard.jsx
     Projects.jsx
     ProductsPage.jsx
  utils/
     dateHelpers.js
     calculations.js
  App.jsx
```
---

## 📦 Instalación

Clonar el repositorio:

git clone https://github.com/tu-usuario/entrepreneur-management-app.git


Instalar dependencias:

npm install


Ejecutar en entorno de desarrollo:

npm run dev

---

## 🎯 Objetivo del proyecto

Simular un sistema de gestión real aplicando buenas prácticas de arquitectura, manejo de estado, cálculo de métricas derivadas y visualización de datos.

Este proyecto forma parte de mi práctica avanzada en desarrollo frontend.

---

## 👨‍💻 Autor

Desarrollado por **Elian Alexander Pucheta**.
