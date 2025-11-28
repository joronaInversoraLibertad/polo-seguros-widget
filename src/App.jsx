import { useState } from 'react';
import './App.css';

const API_BASE = 'https://xisazrvyvezhaymelmyq.supabase.co/functions/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpc2F6cnZ5dmV6aGF5bWVsbXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjI3MjQsImV4cCI6MjA3OTIzODcyNH0.TBehcHxWUVoamO3mwmfV6ncDD_6QUEA9I2D5Xp4IFXE';

function App() {
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false);
  const [polizas, setPolizas] = useState(null);
  const [error, setError] = useState(null);

  const buscarPolizas = async () => {
    if (!dni.trim()) {
      setError('Por favor ingrese un DNI o CUIT');
      return;
    }

    setLoading(true);
    setError(null);
    setPolizas(null);

    try {
      const response = await fetch(`${API_BASE}/polizas-buscar?dni=${dni.trim()}`, {
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setPolizas(data.data);
      } else {
        setError(data.error || 'Error al buscar pólizas');
      }
    } catch (err) {
      setError('Error de conexión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarPolizas();
    }
  };

  return (
    <div className="app-container">
      <div className="search-section">
        <h2>Consultar Pólizas</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Ingrese DNI o CUIT"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button onClick={buscarPolizas} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {polizas && polizas.summary.totalPolizas === 0 && (
        <div className="no-results">
          📋 No se encontraron pólizas para este DNI/CUIT
        </div>
      )}

      {polizas && polizas.summary.totalPolizas > 0 && (
        <div className="results-section">
          <h3>Se encontraron {polizas.summary.totalPolizas} póliza(s)</h3>
          
          {polizas.results.map((aseguradora, idx) => (
            <div key={idx} className="aseguradora-section">
              <h4 className="aseguradora-title">
                {aseguradora.company}
                {aseguradora.fromCache && <span className="cache-badge">📦 Caché</span>}
              </h4>

              <div className="polizas-grid">
                {aseguradora.polizas.map((poliza, pidx) => (
                  <div key={pidx} className={`poliza-card ${poliza.vigencia.vigente ? 'vigente' : 'no-vigente'}`}>
                    <div className="poliza-header">
                      <span className="poliza-numero">#{poliza.numeroPoliza}</span>
                      <span className={`poliza-estado ${poliza.vigencia.vigente ? 'estado-vigente' : 'estado-no-vigente'}`}>
                        {poliza.vigencia.vigente ? '✓ VIGENTE' : '✗ NO VIGENTE'}
                      </span>
                    </div>

                    <div className="poliza-body">
                      <div className="poliza-field">
                        <strong>Tipo:</strong> {poliza.tipo}
                      </div>
                      <div className="poliza-field">
                        <strong>Descripción:</strong> {poliza.descripcion || 'N/A'}
                      </div>
                      {poliza.vehiculo && (
                        <div className="poliza-field">
                          <strong>Vehículo:</strong> {poliza.vehiculo.marca} {poliza.vehiculo.modelo} - {poliza.vehiculo.patente}
                        </div>
                      )}
                      <div className="poliza-field">
                        <strong>Vigencia:</strong> {poliza.vigencia.fechaInicio} a {poliza.vigencia.fechaFin}
                      </div>
                      {poliza.asegurado && (
                        <div className="poliza-field">
                          <strong>Asegurado:</strong> {poliza.asegurado.nombre}
                        </div>
                      )}
                    </div>

                    {poliza.documentos && poliza.documentos.length > 0 && (
                      <div className="poliza-footer">
                        <strong>Documentos:</strong>
                        <div className="documentos-list">
                          {poliza.documentos.map((doc, didx) => (
                            <a
                              key={didx}
                              href={`${API_BASE}/poliza-documento?company=${aseguradora.company}&poliza=${poliza.numeroPoliza}&tipo=${doc.tipo}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="documento-link"
                            >
                              📄 {doc.nombre}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

