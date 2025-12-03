import { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'https://xisazrvyvezhaymelmyq.supabase.co/functions/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpc2F6cnZ5dmV6aGF5bWVsbXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjI3MjQsImV4cCI6MjA3OTIzODcyNH0.TBehcHxWUVoamO3mwmfV6ncDD_6QUEA9I2D5Xp4IFXE';

const POLIZAS_POR_PAGINA = 10;

// Componente reutilizable para las cards de acceso rápido
function AccesoCard({ href, icon, title, text, ctaText, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
    // Si no hay onClick, el href normal funcionará
  };

  return (
    <a href={href} className="pb-card" onClick={handleClick}>
      <div className="pb-card__icon">
        <i className={icon}></i>
      </div>
      <div className="pb-card__title">{title}</div>
      <div className="pb-card__text">{text}</div>
      <div className="pb-card__cta">
        {ctaText} <i className="fas fa-chevron-right"></i>
      </div>
    </a>
  );
}

// Componente de Sección de Escritorio
function EscritorioSection() {
  // Función para navegar a una sección
  const navegarASeccion = (seccion) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('section', seccion);
      window.location.href = url.toString();
    } catch (e) {
      // Fallback si new URL falla (ej: en Zoho Creator)
      const separator = window.location.search ? '&' : '?';
      window.location.href = window.location.pathname + window.location.search + separator + 'section=' + seccion + window.location.hash;
    }
  };

  // Datos de las cards de acceso rápido
  const accesosRapidos = [
    {
      href: "?section=polizas",
      icon: "fas fa-file-contract",
      title: "Ver mis pólizas",
      text: "Consultá las pólizas vigentes, coberturas, sumas aseguradas y vencimientos.",
      ctaText: "Ver detalle",
      onClick: () => navegarASeccion('polizas')
    },
    {
      href: "?section=siniestros",
      icon: "fas fa-car-crash",
      title: "Reportar un siniestro",
      text: "Cargá un siniestro nuevo y adjuntá la información necesaria para agilizar la gestión.",
      ctaText: "Iniciar reporte",
      onClick: () => navegarASeccion('siniestros')
    },
    {
      href: "https://polobroker.zohocreatorportal.com/#Perfil_usuario",
      icon: "fas fa-user",
      title: "Mi perfil",
      text: "Revisá y actualizá tus datos personales y de contacto para que podamos asistirte mejor.",
      ctaText: "Editar datos"
    },
    {
      href: "#Page:Contacto",
      icon: "fas fa-headset",
      title: "Contacto y ayuda",
      text: "Encontrá los canales de atención de Polo Broker para consultas, dudas o emergencias.",
      ctaText: "Ver canales"
    }
  ];

  return (
    <div className="pb-portal">
      <div className="pb-portal__wrapper">

        {/* HERO PRINCIPAL */}
        <section className="pb-hero">
          <div className="pb-hero__text">
            <div className="pb-hero__eyebrow">
              <i className="fas fa-shield-alt"></i>
              <span>Portal de asegurados</span>
            </div>
            <h1 className="pb-hero__title">Escritorio Polo Conecta</h1>
            <p className="pb-hero__subtitle">
              Gestioná tus pólizas, reportá siniestros y mantené tus datos al día, todo en un mismo lugar y con el respaldo de Polo Broker.
            </p>

            <div className="pb-hero__pill">
              <i className="fas fa-bolt"></i>
              <span>Atención inmediata • Autonomía • Trayectoria</span>
            </div>
            <div className="pb-hero__note">
              Conectado a tus coberturas para que tengas siempre a mano la información que necesitás.
            </div>
          </div>

          <aside className="pb-hero__panel">
            <div className="pb-hero__panel-title">
              <span>Tu resumen rápido de gestiones</span>
              <span className="pb-hero__pill-mini">Siempre disponible</span>
            </div>
            <ul className="pb-hero__list">
              <li>
                <i className="fas fa-file-alt"></i>
                <div>
                  <strong>Revisá tus pólizas</strong>
                  <span>Accedé al detalle de tus coberturas y verificá vencimientos.</span>
                </div>
              </li>
              <li>
                <i className="fas fa-exclamation-triangle"></i>
                <div>
                  <strong>Reportá un siniestro</strong>
                  <span>Cargá el evento en minutos y seguí el estado de tu gestión.</span>
                </div>
              </li>
              <li>
                <i className="fas fa-user-check"></i>
                <div>
                  <strong>Mantené tus datos actualizados</strong>
                  <span>Actualizá teléfonos, emails y datos de contacto para una mejor atención.</span>
                </div>
              </li>
            </ul>
          </aside>
        </section>

        {/* ACCESOS RÁPIDOS */}
        <section className="pb-actions">
          <div className="pb-section-title">Accesos rápidos</div>
          <div className="pb-section-subtitle">
            Elegí qué querés hacer hoy. Todo está pensado para que lo resuelvas de forma simple y segura.
          </div>

          <div className="pb-actions__grid">
            {accesosRapidos.map((acceso, index) => (
              <AccesoCard
                key={index}
                href={acceso.href}
                icon={acceso.icon}
                title={acceso.title}
                text={acceso.text}
                ctaText={acceso.ctaText}
                onClick={acceso.onClick}
              />
            ))}
          </div>
        </section>

        {/* AYUDA RÁPIDA */}
        <section className="pb-help">
          <div className="pb-help__text">
            <strong>¿Necesitás ayuda con tu seguro?</strong><br />
            Nuestro equipo está para acompañarte en cada paso: contratación, seguimiento de siniestros y consultas generales.
          </div>
          <div className="pb-help__cta">
            <span className="pb-help__pill">
              <i className="fas fa-phone-alt"></i> 011 7079-3090
            </span>
            <a href="mailto:contacto@polobroker.com.ar" className="pb-help__pill">
              <i className="fas fa-envelope"></i> contacto@polobroker.com.ar
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

// Componente de Sección de Siniestros
function SiniestrosSection() {
  const handleFormularioClick = () => {
    const formularioUrl = 'https://forms.polobroker.com.ar/polobroker1/form/FORMULARIODESINIESTROS/formperma/AlNVHalw2OZBfxiLuHN7miZ2Xn5xWOLqnn3n9Q8kRZc';
    window.open(formularioUrl, '_blank');
  };

  return (
    <div className="pb-portal">
      <div className="pb-portal__wrapper">
        <div className="pb-siniestros">
          <h1 className="pb-hero__title">Siniestros</h1>
          
          <div className="pb-siniestros__content">
            <p className="pb-hero__subtitle">
              En Polo Broker te acompañamos en cada paso. Puedes ingresar y ver el formulario que necesitas para registrar tu siniestro, puedes comenzar completándolo, con la información de tu siniestro y nuestro equipo se pondrá en contacto para brindarte la asistencia necesaria y acompañarte en el proceso.
            </p>
            <p className="pb-hero__note">
              Tu denuncia será analizada a la brevedad para ofrecerte una respuesta personalizada y resolver tu situación con la mayor rapidez posible.
            </p>
          </div>
          
          <button 
            className="pb-btn-siniestro"
            onClick={handleFormularioClick}
          >
            <i className="fas fa-file-alt"></i>
            FORMULARIO DE SINIESTRO
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente de Sección de Pólizas (código actual refactorizado)
function PolizasSection() {
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false);
  const [polizasData, setPolizasData] = useState([]);
  const [polizasFiltered, setPolizasFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [resultado, setResultado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroVigentes, setFiltroVigentes] = useState(true);
  const [filtroNoVigentes, setFiltroNoVigentes] = useState(true);
  const [loadingButtons, setLoadingButtons] = useState({});
  const [noResults, setNoResults] = useState(false);

  // Aplicar filtros cuando cambien los datos o los filtros
  useEffect(() => {
    if (!polizasData.length) {
      setPolizasFiltered([]);
      return;
    }

    if (!filtroVigentes && !filtroNoVigentes) {
      setPolizasFiltered([]);
      return;
    }
    
    if (filtroVigentes && filtroNoVigentes) {
      setPolizasFiltered(polizasData);
      return;
    }
    
    const filtered = polizasData.filter(p => {
      const esVigente = p.estado === 'vigente';
      return (filtroVigentes && esVigente) || (filtroNoVigentes && !esVigente);
    });
    
    setPolizasFiltered(filtered);
    setCurrentPage(1); // Reset a la primera página cuando cambien los filtros
  }, [polizasData, filtroVigentes, filtroNoVigentes]);

  const buscarPolizas = async () => {
    if (!dni.trim()) {
      alert('Por favor ingrese un DNI o CUIT');
      return;
    }

    setLoading(true);
    setError(null);
    setPolizasData([]);
    setPolizasFiltered([]);
    setResultado('');
    setNoResults(false);

    try {
      const response = await fetch(`${API_BASE}/polizas-buscar?dni=${dni.trim()}`, {
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.data) {
        throw new Error('Respuesta inesperada del backend');
      }

      const results = data.data.results || [];
      const polizasArray = [];

      const companyUrlMap = {
        'mercantilandina': 'mercantil',
        'provinciaseguros': 'provincia',
        'sancorseguros': 'sancor',
        'experta': 'experta'
      };

      results.forEach(entry => {
        if (!entry || !entry.success || !Array.isArray(entry.polizas)) return;
        
        entry.polizas.forEach(p => {
          const companyKeyRaw = (entry.company || entry.companyName || entry.companyKey || '');
          const companyKey = companyKeyRaw.toLowerCase().replace(/\s+/g, '');
          const aseguradoraKey = companyUrlMap[companyKey] || companyKey;

          const certificateNumber = p?.metadata?.certificateNumber ?? null;
          const bien = p?.metadata?.bien ?? null;
          const numeroParaDocumento = p.numeroPolizaConMetadata || p.numeroPoliza || p.numeroPolizaOriginal || p.numero || p.poliza;
          const numeroParaMostrar = p.numeroPoliza || p.numeroPolizaOriginal || p.numero || p.poliza;

          polizasArray.push({
            numero: numeroParaMostrar,
            numeroConMetadata: numeroParaDocumento,
            aseguradora: aseguradoraKey,
            aseguradoraNombre: entry.company || entry.companyName || p.companyName || '',
            tipo: p.tipo || (p.cobertura && p.cobertura.plan) || '-',
            descripcion: p.descripcion || (p.cobertura && p.cobertura.plan) || (p.vehiculo && (p.vehiculo.version || p.vehiculo.modelo)) || '-',
            cobertura: p.cobertura || null,
            vigenciaDesde: (p.vigencia && (p.vigencia.fechaInicio || p.vigencia.vigenciaDesde)) || p.vigenciaDesde || '-',
            vigenciaHasta: (p.vigencia && (p.vigencia.fechaFin || p.vigencia.vigenciaHasta)) || p.vigenciaHasta || '-',
            certificateNumber,
            bien,
            estado: (p.vigencia && typeof p.vigencia.vigente !== 'undefined')
              ? (p.vigencia.vigente ? 'vigente' : 'vencida')
              : (p.estado && (p.estado.toUpperCase() === 'VIGENTE' || p.estado === 'vigente')
                ? 'vigente'
                : 'vencida')
          });
        });
      });

      setPolizasData(polizasArray);
      if (polizasArray.length === 0) {
        setNoResults(true);
      }
    } catch (err) {
      setError('Error al cargar: ' + (err.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentRequest = async ({ company, numero, tipo, certificateNumber, buttonKey }) => {
    setLoadingButtons(prev => ({ ...prev, [buttonKey]: true }));
    setResultado('Solicitando documento...');

    const params = new URLSearchParams({ company, numero, tipo });
    if (certificateNumber) params.set('certificateNumber', certificateNumber);

    try {
      const response = await fetch(`${API_BASE}/poliza-documento?${params.toString()}`, {
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const text = await response.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (parseError) {
        if (!response.ok) throw new Error('No se pudo obtener el documento solicitado');
        throw parseError;
      }

      if (!response.ok || !json.success) {
        const msg = (json && (json.error || json.message)) || 'No se pudo obtener el documento solicitado';
        throw new Error(msg);
      }

      const docUrl = json?.data?.documentUrl || json?.data?.pdfUrl;
      if (!docUrl) {
        throw new Error('No se encontró documento en el backend.');
      }

      setResultado('');
      window.open(docUrl, '_blank');
    } catch (err) {
      setResultado('Error: ' + (err.message || 'Error inesperado'));
    } finally {
      setLoadingButtons(prev => ({ ...prev, [buttonKey]: false }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarPolizas();
    }
  };

  // Aplicar filtros cuando cambien los checkboxes
  const handleFiltroChange = (tipoFiltro) => {
    if (tipoFiltro === 'vigentes') {
      setFiltroVigentes(!filtroVigentes);
    } else {
      setFiltroNoVigentes(!filtroNoVigentes);
    }
  };

  // Renderizar botones de documentos
  const renderBotonesDocumentos = (poliza) => {
    const esMercantil = poliza.aseguradoraNombre && poliza.aseguradoraNombre.toLowerCase().includes('mercantil');
    const esProvincia = poliza.aseguradoraNombre && poliza.aseguradoraNombre.toLowerCase().includes('provincia');
    const tipoUpper = poliza.tipo ? poliza.tipo.toUpperCase() : '';
    const mostrarSoloPoliza = esMercantil && (
      tipoUpper.includes('RESPONSABILIDAD CIVIL') ||
      tipoUpper.includes('INCENDIO') ||
      tipoUpper.includes('COMBINADO FAMILIAR') ||
      tipoUpper.includes('ACCIDENTES PERSONALES')
    );

    const numeroParaDocumento = poliza.numeroConMetadata || poliza.numero;
    
    const botones = [];
    
    // Botón Ver Póliza (siempre)
    const keyVerPoliza = `${poliza.numero}-poliza`;
    botones.push(
      <button
        key="ver-poliza"
        className="btn-poliza"
        onClick={() => handleDocumentRequest({
          company: poliza.aseguradora,
          numero: numeroParaDocumento,
          tipo: 'poliza',
          certificateNumber: poliza.certificateNumber || '',
          buttonKey: keyVerPoliza
        })}
        disabled={loadingButtons[keyVerPoliza]}
      >
        {loadingButtons[keyVerPoliza] ? <span className="spinner"></span> : 'Ver Póliza'}
      </button>
    );

    // Botones adicionales (no para Provincia)
    if (!esProvincia) {
      if (!mostrarSoloPoliza) {
        const keyTarjeta = `${poliza.numero}-tarjeta`;
        botones.push(
          <button
            key="tarjeta"
            className="btn-poliza"
            onClick={() => handleDocumentRequest({
              company: poliza.aseguradora,
              numero: numeroParaDocumento,
              tipo: 'tarjeta',
              certificateNumber: poliza.certificateNumber || '',
              buttonKey: keyTarjeta
            })}
            disabled={loadingButtons[keyTarjeta]}
          >
            {loadingButtons[keyTarjeta] ? <span className="spinner"></span> : 'Tarjeta de Circulación'}
          </button>
        );
      }

      const keyMercosur = `${poliza.numero}-mercosur`;
      botones.push(
        <button
          key="mercosur"
          className="btn-poliza"
          onClick={() => handleDocumentRequest({
            company: poliza.aseguradora,
            numero: numeroParaDocumento,
            tipo: 'mercosur',
            certificateNumber: poliza.certificateNumber || '',
            buttonKey: keyMercosur
          })}
          disabled={loadingButtons[keyMercosur]}
        >
          {loadingButtons[keyMercosur] ? <span className="spinner"></span> : (esMercantil ? 'Certificado de Cobertura' : 'Certificado Mercosur')}
        </button>
      );
    }

    return botones;
  };

  // Paginación
  const totalPages = Math.max(1, Math.ceil(polizasFiltered.length / POLIZAS_POR_PAGINA));
  const startIndex = (currentPage - 1) * POLIZAS_POR_PAGINA;
  const endIndex = startIndex + POLIZAS_POR_PAGINA;
  const polizasPagina = polizasFiltered.slice(startIndex, endIndex);

  return (
    <div className="pb-portal">
      <div className="pb-portal__wrapper">
        <div className="pb-polizas" id="polizas-container">
          <h1 className="pb-hero__title">Mis Pólizas</h1>
          
          <div className="pb-polizas__content">
            <p className="pb-hero__subtitle">
              En este sector podés ver tus pólizas y descargar los documentos.
            </p>
          </div>

      <div className="controls">
        <input
          id="dni"
          type="text"
          placeholder="Ingrese su DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button
          id="btn-load"
          className="btn-poliza"
          onClick={buscarPolizas}
          disabled={loading}
        >
          {loading ? <span className="spinner"></span> : 'Cargar pólizas'}
        </button>
      </div>

      {polizasData.length > 0 && (
        <div className="filtros-wrapper">
          <div className="filtros-estado">
            <label>
              <input
                type="checkbox"
                checked={filtroVigentes}
                onChange={() => handleFiltroChange('vigentes')}
              />
              <span>Vigente</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={filtroNoVigentes}
                onChange={() => handleFiltroChange('no-vigentes')}
              />
              <span>No Vigente</span>
            </label>
          </div>
        </div>
      )}

      <div id="polizas-lista">
        {!polizasData.length && !error && !loading && !noResults && (
          <p style={{ textAlign: 'center', color: '#666' }}>
            Ingrese su DNI y haga clic en "Cargar pólizas" para comenzar.
          </p>
        )}

        {error && (
          <p style={{ textAlign: 'center', color: '#c00' }}>{error}</p>
        )}

        {polizasData.length > 0 && polizasFiltered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
            No hay pólizas que coincidan con los filtros seleccionados.
          </p>
        )}

        {noResults && !loading && (
          <div>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
              No se encontraron pólizas con este número de DNI.
            </p>
            <div className="contacto-sin-polizas">
              <p>
                Si usted no encontró su póliza complete nuestro{' '}
                <a href="https://forms.polobroker.com.ar/polobroker1/form/Contacto/formperma/VSkV4YuMmodHmK8d21ZPAoEAsk4EReLjQZXsZN9VNuM" target="_blank" rel="noopener noreferrer">
                  formulario de contacto
                </a>{' '}
                y lo ayudaremos.
              </p>
            </div>
          </div>
        )}

        {polizasPagina.length > 0 && polizasPagina.map((poliza, idx) => {
          const badgeClass = poliza.estado === 'vigente' ? 'badge-vigente' : 'badge-vencida';
          const badgeTexto = poliza.estado === 'vigente' ? 'Vigente' : 'No Vigente';

          return (
            <div key={idx} className="poliza-card">
              <div className="poliza-header">
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#0073aa' }}>
                    Póliza N° {poliza.numero}
                  </h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                    {poliza.aseguradoraNombre || '-'}
                  </p>
                </div>
                <span className={badgeClass}>{badgeTexto}</span>
              </div>

              <div className="poliza-info">
                {poliza.bien && (
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Bien:</strong> {poliza.bien}
                  </p>
                )}
                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                  <strong>Tipo:</strong> {poliza.tipo || '-'}
                </p>
                {poliza.cobertura && poliza.cobertura.plan && poliza.cobertura.plan !== 0 && poliza.cobertura.plan !== '0' && String(poliza.cobertura.plan).trim() !== '' && (
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Plan:</strong> {poliza.cobertura.plan}
                  </p>
                )}
                {(poliza.certificateNumber !== null && poliza.certificateNumber !== undefined && poliza.certificateNumber !== '' && poliza.certificateNumber !== 0 && poliza.certificateNumber !== '0') ? (
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Número de certificado:</strong> {poliza.certificateNumber}
                  </p>
                ) : null}
                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                  <strong>Descripción:</strong> {poliza.descripcion || '-'}
                </p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                  <strong>Vigencia:</strong> {poliza.vigenciaDesde} - {poliza.vigenciaHasta}
                </p>
              </div>

              <div className="poliza-botones">
                {renderBotonesDocumentos(poliza)}
              </div>
            </div>
          );
        })}
      </div>

      {polizasFiltered.length > POLIZAS_POR_PAGINA && (
        <div id="polizas-pagination">
          <div className="pagination-controls">
            <button
              className="btn-poliza"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="page-info">
              Página {currentPage} de {totalPages}
            </span>
            <button
              className="btn-poliza"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {resultado && (
        <div id="resultado-global" style={{ display: 'block' }}>
          <strong style={{ color: '#2e7d32' }}>{resultado}</strong>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}

// Componente principal App
function App() {
  // Detectar sección desde query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('section') || 'escritorio';

  // Renderizar según la sección
  if (section === 'polizas') {
    return <PolizasSection />;
  }
  
  if (section === 'siniestros') {
    return <SiniestrosSection />;
  }

  // Por defecto: mostrar Escritorio
  return <EscritorioSection />;
}

export default App;

