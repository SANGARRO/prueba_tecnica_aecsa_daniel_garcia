// src/pages/Information.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

export default function Information() {
  const [financialData, setFinancialData] = useState({
    ingresos: 0,
    gastos: 0,
    capacidadPago: 0,
    plazo: 12,
    tasaInteres: 5,
    montoCredito: 0,
    totalIntereses: 0,
  });

  const handleInputChange = (e) => {
    setFinancialData({
      ...financialData,
      [e.target.name]: parseFloat(e.target.value) || 0,
    });
  };

  const calcularSimulacion = () => {
    const { ingresos, gastos, montoCredito, plazo, tasaInteres } =
      financialData;
    const capacidadPago = ingresos - gastos;
    const tasaDecimal = tasaInteres / 100;
    const totalIntereses = montoCredito * tasaDecimal * (plazo / 12);
    setFinancialData({ ...financialData, capacidadPago, totalIntereses });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Estados Financieros del Usuario</h2>
        <div className="card p-4 mb-4">
          <div className="card-body">
            <h3>Información Financiera</h3>
            <p>
              <strong>Ingresos:</strong> ${financialData.ingresos.toFixed(2)}
            </p>
            <p>
              <strong>Gastos:</strong> ${financialData.gastos.toFixed(2)}
            </p>
            <p>
              <strong>Capacidad de Pago:</strong> $
              {financialData.capacidadPago.toFixed(2)}
            </p>
          </div>
        </div>

        <h3>Simulación de Crédito</h3>
        <div className="form-group mb-3">
          <label htmlFor="ingresos">Ingresos Mensuales:</label>
          <input
            type="number"
            id="ingresos"
            name="ingresos"
            className="form-control"
            value={financialData.ingresos}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="gastos">Gastos Mensuales:</label>
          <input
            type="number"
            id="gastos"
            name="gastos"
            className="form-control"
            value={financialData.gastos}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="montoCredito">Monto del Crédito:</label>
          <input
            type="number"
            id="montoCredito"
            name="montoCredito"
            className="form-control"
            value={financialData.montoCredito}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="plazo">Plazo (meses):</label>
          <input
            type="number"
            id="plazo"
            name="plazo"
            className="form-control"
            value={financialData.plazo}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="tasaInteres">Tasa de Interés (% anual):</label>
          <input
            type="number"
            id="tasaInteres"
            name="tasaInteres"
            className="form-control"
            value={financialData.tasaInteres}
            onChange={handleInputChange}
          />
        </div>

        <button className="btn btn-primary mb-3" onClick={calcularSimulacion}>
          Calcular Simulación
        </button>

        {financialData.totalIntereses > 0 && (
          <div className="card p-3">
            <div className="card-body">
              <h4>Resultados de la Simulación</h4>
              <p>
                <strong>Capacidad de Pago:</strong> $
                {financialData.capacidadPago.toFixed(2)}
              </p>
              <p>
                <strong>Total de Intereses:</strong> $
                {financialData.totalIntereses.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
