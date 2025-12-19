import { useState, useEffect } from 'react';
import './App.css';

// Deploy: Actualización para forzar nuevo hash

const API_BASE = 'https://xisazrvyvezhaymelmyq.supabase.co/functions/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpc2F6cnZ5dmV6aGF5bWVsbXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjI3MjQsImV4cCI6MjA3OTIzODcyNH0.TBehcHxWUVoamO3mwmfV6ncDD_6QUEA9I2D5Xp4IFXE';

const POLIZAS_POR_PAGINA = 10;

// Componente reutilizable para las cards de acceso rápido
function AccesoCard({ href, icon, title, text, ctaText, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      return;
    }

    // Si es una URL externa (no relativa), abrir en la misma ventana
    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      e.preventDefault();
      window.top.location.href = href; // Usar window.top para salir del iframe si está embebido
    }
    // Si no hay onClick y es URL relativa, el href normal funcionará
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
const navegarASeccion = (seccion) => {
  console.log('🟢 navegarASeccion: Sección solicitada:', seccion);
  
  // Si la sección es "polizas", redirigir directamente a la página de Polizas en Zoho Creator
  if (seccion === 'polizas') {
    console.log('🟢 navegarASeccion: Redirigiendo a página de Polizas en Zoho Creator');
    const targetUrl = 'https://polobroker.zohocreatorportal.com/#Page:Polizas';
    
    // Redirigir directamente a la página de Polizas en Zoho Creator
    if (window.parent && window.parent !== window) {
      try {
        console.log('🟢 navegarASeccion: Intentando redirigir via window.parent');
        window.parent.location.href = targetUrl;
        return;
      } catch (e) {
        console.warn('⚠️ navegarASeccion: No se pudo redirigir via parent:', e);
        // Fallback: intentar con window.top
        try {
          console.log('🟢 navegarASeccion: Intentando redirigir via window.top');
          window.top.location.href = targetUrl;
          return;
        } catch (e2) {
          console.warn('⚠️ navegarASeccion: No se pudo redirigir via top:', e2);
        }
      }
    } else {
      // Si no hay parent, redirigir directamente
      console.log('🟢 navegarASeccion: No hay parent, redirigiendo directamente');
      window.location.href = targetUrl;
      return;
    }
  }

  // Para otras secciones o fallback, usar la navegación normal
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('section', seccion);
    window.location.href = url.toString();
  } catch (e) {
    const separator = window.location.search ? '&' : '?';
    window.location.href = window.location.pathname + window.location.search + separator + 'section=' + seccion + window.location.hash;
  }
};

// Componente de Sección de Escritorio
function EscritorioSection() {
  // Datos de las cards de acceso rápido
  const accesosRapidos = [
    {
      href: "#",
      icon: "fas fa-file-contract",
      title: "Ver mis pólizas",
      text: "Consultá las pólizas vigentes, coberturas, sumas aseguradas y vencimientos.",
      ctaText: "Ver detalle",
      onClick: () => {
        console.log('🟢 EscritorioSection: Click en "Ver mis pólizas", llamando navegarASeccion("polizas")');
        navegarASeccion('polizas');
      }
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
  const formularios = [
    {
      href: "https://forms.polobroker.com.ar/polobroker1/form/DenunciadeSiniestroHogar/formperma/UrEQklXhzTi2vw7aleh-5nquor9Bfyvcy6Z5FtYG8dA",
      icon: "fas fa-house-damage",
      title: "Formulario de Hogar",
      text: "Declaración de siniestros en tu vivienda: incendio, daños por agua, robo y otros eventos amparados en tu seguro de hogar.",
      ctaText: "Completar denuncia"
    },
    {
      href: "https://forms.polobroker.com.ar/polobroker1/form/FORMULARIODESINIESTROS/formperma/AlNVHalw2OZBfxiLuHN7miZ2Xn5xWOLqnn3n9Q8kRZc",
      icon: "fas fa-clipboard-list",
      title: "Formulario general de siniestros",
      text: "Utilizá este formulario cuando tu siniestro no encaje en otro tipo específico o según te indique tu productor.",
      ctaText: "Iniciar trámite"
    },
    {
      href: "https://forms.polobroker.com.ar/polobroker1/form/DENUNCIADEFALLECIMIENTOHAYQUEEDITAR/formperma/OlYiEh3wWuRQLfA7eXz7t8emJVX5jBLh-n3wfhmosVA",
      icon: "fas fa-user-minus",
      title: "Denuncia de fallecimiento",
      text: "Informá el fallecimiento del asegurado y cargá la documentación necesaria para la gestión del siniestro de vida.",
      ctaText: "Denunciar fallecimiento"
    },
    {
      href: "https://forms.polobroker.com.ar/polobroker1/form/Denunciachoqueconpeatn/formperma/LmW8LLk1C1hG138lrujW5ch0EJEuN0dNpvhnjLVkqms",
      icon: "fas fa-person-walking",
      title: "Choque con peatón",
      text: "Registro de siniestros donde interviene un peatón. Detallá cómo ocurrió el hecho y los datos de las personas involucradas.",
      ctaText: "Denunciar siniestro"
    },
    {
      href: "https://forms.polobroker.com.ar/polobroker1/form/DenunciaIncendioparcialtotal/formperma/r5g61yonBOt2owXJCw5CuS0ZFG-wcqM8tPD-JEE5kX4",
      icon: "fas fa-fire",
      title: "Incendio parcial / total",
      text: "Denunciá daños por incendio en tu vehículo o unidad asegurada, indicando alcance del daño y participación de bomberos.",
      ctaText: "Registrar incendio"
    },
    {
      href: "https://forms.polobroker.com.ar/polobroker1/form/Denunciaparaunidadquesufrigranizo/formperma/C1Ll6GAW-pE9F_3u9lyrN7lm9P2K7lGENuTCtxcQhAY",
      icon: "fas fa-cloud-showers-heavy",
      title: "Unidad que sufrió granizo",
      text: "Informá los daños producidos por granizo en tu vehículo y adjuntá fotos para evaluar el impacto del evento climático.",
      ctaText: "Denunciar granizo"
    },
    {
      href: "https://forms.polobroker.com.ar/polobroker1/form/Reportaunincidenteconsupropiovehculo1/formperma/z5brhvF-k9BmOQruT08uVoxCo9DoNir_-oSKW2iDP4U",
      icon: "fas fa-car-burst",
      title: "Autochoque con unidad propia",
      text: "Siniestros en los que tu vehículo impacta contra un objeto fijo o se daña sin intervención de terceros.",
      ctaText: "Cargar autochoque"
    },
    {
      href: "https://forms.polobroker.com.ar/polobroker1/form/DenunciadeRoboParcialTotal/formperma/ZA--FO8RWoKbcgsvfqjJUD5o9_WtDq-9gWaSLDRKudk",
      icon: "fas fa-user-secret",
      title: "Denuncia por robo",
      text: "Comunicá robos o hurtos de tu vehículo o bienes asegurados, indicando fecha, lugar y denuncia policial realizada.",
      ctaText: "Denunciar robo"
    },
    {
      href: "https://forms.polobroker.com.ar/polobroker1/form/DenunciadeRoboParcialTotal/formperma/ZA--FO8RWoKbcgsvfqjJUD5o9_WtDq-9gWaSLDRKudk",
      icon: "fas fa-car-side",
      title: "Choque con tercero",
      text: "Registrá siniestros donde intervienen otros vehículos: datos del tercero, testigos, seguros y croquis del hecho.",
      ctaText: "Denunciar choque"
    },
    {
      href: "https://forms.polobroker.com.ar/polobroker1/form/Contacto/formperma/VSkV4YuMmodHmK8d21ZPAoEAsk4EReLjQZXsZN9VNuM",
      icon: "fas fa-headset",
      title: "Consulta sobre siniestros",
      text: "Si tenés dudas sobre qué formulario usar o necesitás asistencia, enviá tu consulta a nuestro equipo de siniestros.",
      ctaText: "Hacer una consulta"
    }
  ];

  return (
    <div className="pb-portal">
      <div className="pb-portal__wrapper">

        {/* HERO PRINCIPAL SINIESTROS */}
        <section className="pb-hero">
          <div className="pb-hero__text">
            <div className="pb-hero__eyebrow">
              <i className="fas fa-car-burst"></i>
              <span>Gestión de siniestros</span>
            </div>
            <h1 className="pb-hero__title">Siniestros Polo Conecta</h1>
            <p className="pb-hero__subtitle">
              Iniciá tu denuncia, subí la documentación y seguí cada paso del proceso de siniestros desde un solo lugar.
            </p>

            <div className="pb-hero__pill">
              <i className="fas fa-bolt"></i>
              <span>Atención inmediata • Acompañamiento • Transparencia</span>
            </div>
            <div className="pb-hero__note">
              Elegí el tipo de evento que tuviste y completá el formulario para que nuestro equipo pueda ayudarte más rápido.
            </div>
          </div>

          <aside className="pb-hero__panel">
            <div className="pb-hero__panel-title">
              <span>Tu resumen rápido de siniestros</span>
              <span className="pb-hero__pill-mini">Disponible 24/7</span>
            </div>
            <ul className="pb-hero__list">
              <li>
                <i className="fas fa-file-pen"></i>
                <div>
                  <strong>Iniciá una nueva denuncia</strong>
                  <span>Seleccioná el tipo de siniestro y cargá los datos básicos del hecho.</span>
                </div>
              </li>
              <li>
                <i className="fas fa-cloud-upload-alt"></i>
                <div>
                  <strong>Subí documentación</strong>
                  <span>Adjuntá fotos, presupuestos y archivos para agilizar la evaluación.</span>
                </div>
              </li>
              <li>
                <i className="fas fa-location-dot"></i>
                <div>
                  <strong>Seguimiento de tu caso</strong>
                  <span>Consultá el estado de tu siniestro y las próximas acciones.</span>
                </div>
              </li>
            </ul>
          </aside>
        </section>

        {/* ACCESOS RÁPIDOS A FORMULARIOS DE DENUNCIA */}
        <section className="pb-actions">
          <div className="pb-section-title">Elegí el tipo de siniestro</div>
          <div className="pb-section-subtitle">
            Accedé directamente al formulario que corresponde al evento que querés denunciar.
          </div>

          <div className="pb-actions__grid">
            {formularios.map((formulario, index) => (
              <AccesoCard
                key={index}
                href={formulario.href}
                icon={formulario.icon}
                title={formulario.title}
                text={formulario.text}
                ctaText={formulario.ctaText}
              />
            ))}
          </div>
        </section>

        {/* AYUDA RÁPIDA SINIESTROS */}
        <section className="pb-help">
          <div className="pb-help__text">
            <strong>¿Tenés una urgencia o no sabés qué formulario usar?</strong><br />
            Comunicate con el equipo de siniestros para recibir ayuda inmediata y orientación sobre el proceso.
          </div>
          <div className="pb-help__cta">
            <span className="pb-help__pill">
              <i className="fas fa-phone-alt"></i> 011 7079-3090
            </span>
            <a href="mailto:siniestros@polobroker.com.ar" className="pb-help__pill">
              <i className="fas fa-envelope"></i> siniestros@polobroker.com.ar
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

// Componente de Sección de Pólizas (código actual refactorizado)
function PolizasSection() {
  console.log('🔵 PolizasSection: Componente montado');

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
  const [emailUsuario, setEmailUsuario] = useState(null);


  // Función auxiliar para buscar pólizas con DNI (definida antes del useEffect)
  const buscarPolizasConDni = async (dniValue) => {
    if (!dniValue || !dniValue.trim()) {
      console.warn('⚠️ PolizasSection: buscarPolizasConDni llamado sin DNI válido');
      return;
    }

    setLoading(true);
    setError(null);
    setPolizasData([]);
    setPolizasFiltered([]);
    setResultado('');
    setNoResults(false);

    try {
      const response = await fetch(`${API_BASE}/polizas-buscar?dni=${dniValue.trim()}`, {
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
      console.error('❌ PolizasSection: Error al buscar pólizas con DNI:', err);
      setError('Error al cargar: ' + (err.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  // Función para buscar pólizas por crm_id (ID de Contacto de Zoho CRM)
  const buscarPolizasPorCrmId = async (crmId) => {
    console.log('🔵 PolizasSection: buscarPolizasPorCrmId llamado con crm_id:', crmId);
    setLoading(true);
    setError(null);
    setPolizasData([]);
    setPolizasFiltered([]);
    setResultado('');
    setNoResults(false);

    try {
      const url = `${API_BASE}/polizas-buscar-por-crm-id?crm_id=${encodeURIComponent(crmId)}`;
      console.log('🔵 PolizasSection: Haciendo fetch a:', url);

      const response = await fetch(url, {
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('🔵 PolizasSection: Response status:', response.status);
      console.log('🔵 PolizasSection: Response ok:', response.ok);

      if (!response.ok) {
        let errorData = null;
        try {
          errorData = await response.json();
          console.error('🔵 PolizasSection: Error response data:', errorData);
        } catch (e) {
          console.error('🔵 PolizasSection: No se pudo parsear error como JSON:', e);
        }

        if (response.status === 404) {
          if (errorData && errorData.error === 'CONTACTO_NO_ENCONTRADO') {
            // Redirigir a Perfil del Asegurado
            console.log('🔵 PolizasSection: Contacto no encontrado, redirigiendo...');
            try {
              if (window.top && window.top !== window) {
                window.top.location.href = 'https://polobroker.zohocreatorportal.com/#Perfil_usuario';
              } else {
                window.location.href = 'https://polobroker.zohocreatorportal.com/#Perfil_usuario';
              }
            } catch (e) {
              console.error('❌ PolizasSection: Error al redirigir:', e);
              setError('No se encontró tu contacto. Por favor, completa tu perfil primero.');
            }
            return;
          }
        }
        throw new Error(`HTTP ${response.status}: ${errorData?.error || errorData?.message || 'Error desconocido'}`);
      }

      const data = await response.json();
      console.log('🔵 PolizasSection: Response data:', data);

      if (!data.success || !data.data) {
        throw new Error('Respuesta inesperada del backend');
      }

      // Actualizar el estado del DNI si está disponible en la respuesta
      if (data.data.contacto && data.data.contacto.dni) {
        const dniObtenido = data.data.contacto.dni.toString().trim();
        console.log('🔵 PolizasSection: DNI obtenido de Supabase:', dniObtenido);
        setDni(dniObtenido);
      }

      // Procesar pólizas
      const polizasArray = (data.data.polizas || []).map(p => {
        const companyKey = (p.companyName || '').toLowerCase().replace(/\s+/g, '');
        const companyUrlMap = {
          'mercantilandina': 'mercantil',
          'provinciaseguros': 'provincia',
          'sancorseguros': 'sancor',
          'experta': 'experta'
        };
        const aseguradoraKey = companyUrlMap[companyKey] || companyKey;

        return {
          numero: p.numeroPoliza,
          numeroConMetadata: p.numeroPoliza,
          aseguradora: aseguradoraKey,
          aseguradoraNombre: p.companyName,
          tipo: p.tipo || '-',
          descripcion: p.descripcion || '-',
          cobertura: p.cobertura || null,
          vigenciaDesde: p.vigencia?.fechaInicio || '-',
          vigenciaHasta: p.vigencia?.fechaFin || '-',
          certificateNumber: p.metadata?.certificateNumber || null,
          bien: p.metadata?.bien || null,
          estado: p.vigencia?.vigente ? 'vigente' : 'vencida'
        };
      });

      setPolizasData(polizasArray);
      if (polizasArray.length === 0) {
        setNoResults(true);
      }

    } catch (err) {
      console.error('❌ PolizasSection: Error al buscar pólizas por crm_id:', err);

      let errorMessage = 'Error al cargar';
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet o que el servidor esté disponible.';
      } else if (err.message.includes('HTTP')) {
        errorMessage = `Error del servidor: ${err.message}`;
      } else {
        errorMessage = `Error: ${err.message || 'Error desconocido'}`;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Función auxiliar para intentar leer Email desde el formulario de Zoho Creator
  const obtenerEmailDesdeCreator = () => {
    try {
      // Intentar acceder al parent window (Zoho Creator)
      if (window.parent && window.parent !== window) {
        try {
          const parentDoc = window.parent.document;

          // Buscar el campo Email en el formulario de Creator
          const selectoresEmail = [
            'input[name*="Email" i]',
            'input[id*="Email" i]',
            'input[name*="email" i]',
            'input[id*="email" i]',
            'input[type="email"]',
            'input[data-field-name*="Email" i]',
            'input[data-field-name*="email" i]',
            // Selectores más específicos de Zoho Creator
            'input.zc-field-input[name*="Email" i]',
            'input.zc-field-input[id*="Email" i]',
            'input.zc-field-input[type="email"]'
          ];

          for (const selector of selectoresEmail) {
            try {
              const campoEmail = parentDoc.querySelector(selector);
              if (campoEmail && campoEmail.value && campoEmail.value.trim()) {
                const emailValue = campoEmail.value.trim();
                // Validar que sea un email válido
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
                  console.log('🔵 PolizasSection: Email encontrado en formulario Creator:', emailValue);
                  return emailValue;
                }
              }
            } catch (e) {
              // Continuar con el siguiente selector
            }
          }

          // Intentar buscar en todos los inputs de tipo email
          const todosLosInputsEmail = parentDoc.querySelectorAll('input[type="email"]');
          for (const input of todosLosInputsEmail) {
            const value = input.value ? input.value.trim() : '';
            if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              console.log('🔵 PolizasSection: Email encontrado en formulario Creator (input type="email"):', value);
              return value;
            }
          }
        } catch (parentError) {
          // En iframes con diferentes dominios, no podemos acceder al DOM del parent
          // Esto es normal y esperado por políticas de seguridad del navegador
          console.log('🔵 PolizasSection: No se puede acceder al parent document (cross-origin iframe)');
        }
      }
    } catch (err) {
      console.warn('⚠️ PolizasSection: Error al intentar leer Email desde Creator:', err);
    }
    return null;
  };

  // Obtener crm_id del usuario para consultar Supabase directamente (obtiene DNI y pólizas)
  useEffect(() => {
    console.log('🔵 PolizasSection: useEffect ejecutado');

    let crmIdObtenido = false;

    // PRIORIDAD 1: Escuchar mensajes postMessage desde el parent (Zoho Creator)
    const messageHandler = (event) => {
      console.log('🔵 PolizasSection: 📨 Mensaje recibido:', {
        type: event.data?.type,
        source: event.data?.source,
        email: event.data?.email ? 'presente: ' + event.data.email : 'no presente',
        crm_id: event.data?.crm_id ? 'presente: ' + event.data.crm_id : 'no presente',
        id: event.data?.id ? 'presente: ' + event.data.id : 'no presente',
        origin: event.origin,
        fullData: event.data
      });

      // Loggear TODOS los campos disponibles para debugging
      if (event.data && typeof event.data === 'object') {
        console.log('🔍 PolizasSection: Todos los campos disponibles en event.data:', Object.keys(event.data));
        console.log('🔍 PolizasSection: Valores completos de event.data:', JSON.stringify(event.data, null, 2));
      }

      // NOTA: La búsqueda por email NO funciona en Zoho Creator, por lo que se omite
      // Si llega un email, solo lo logueamos pero no lo usamos para buscar pólizas
      if (event.data && event.data.type === 'POLO_WIDGET_EMAIL' && event.data.email) {
        const email = event.data.email.trim();
        console.log('🔵 PolizasSection: Email recibido desde Creator (NO se usa para búsqueda):', email);
        // No usar email para búsqueda porque no funciona en Zoho Creator
      }

      // Intentar obtener crm_id si está disponible (PRIORIDAD ALTA - usar esto en lugar de email)
      if (event.data && (event.data.crm_id || event.data.id || event.data.CRM_ID)) {
        const crmId = event.data.crm_id || event.data.id || event.data.CRM_ID;
        console.log('🔵 PolizasSection: ✅✅✅ CRM_ID recibido desde Creator via postMessage:', crmId);
        // Buscar pólizas por crm_id inmediatamente
        buscarPolizasPorCrmId(crmId);
        return; // Salir temprano, ya estamos consultando por crm_id
      }
    };

    window.addEventListener('message', messageHandler);
    console.log('🔵 PolizasSection: ✅ Listener de postMessage configurado');

    // Solicitar email y crm_id al parent inmediatamente y también después de delays
    if (window.parent && window.parent !== window) {
      try {
        // Solicitar email
        const messageEmail = {
          type: 'POLO_WIDGET_REQUEST_EMAIL',
          source: 'polo-seguros-widget'
        };

        // Solicitar crm_id también
        const messageCrmId = {
          type: 'POLO_WIDGET_REQUEST_CRM_ID',
          source: 'polo-seguros-widget'
        };

        // Solicitar ambos inmediatamente
        window.parent.postMessage(messageEmail, '*');
        window.parent.postMessage(messageCrmId, '*');
        console.log('🔵 PolizasSection: ✅ Solicitando email y crm_id al parent (inmediato):', { messageEmail, messageCrmId });

        // Retry después de 500ms
        setTimeout(() => {
          window.parent.postMessage(messageEmail, '*');
          window.parent.postMessage(messageCrmId, '*');
          console.log('🔵 PolizasSection: ✅ Solicitando email y crm_id al parent (retry 500ms)');
        }, 500);

        // Retry después de 2000ms
        setTimeout(() => {
          window.parent.postMessage(messageEmail, '*');
          window.parent.postMessage(messageCrmId, '*');
          console.log('🔵 PolizasSection: ✅ Solicitando email y crm_id al parent (retry 2000ms)');
        }, 2000);
      } catch (e) {
        console.warn('⚠️ PolizasSection: Error al enviar postMessage:', e);
      }
    } else {
      console.warn('⚠️ PolizasSection: No hay window.parent disponible');
    }

    // DEBUG: Intentar acceder a variables de Zoho Creator directamente
    try {
      console.log('🔍 PolizasSection: Intentando acceder a variables de Zoho Creator...');
      if (window.parent && window.parent !== window) {
        // Intentar acceder a variables comunes de Zoho Creator
        const posiblesVariables = [
          'zoho',
          'Zoho',
          'ZOHO',
          'creator',
          'Creator',
          'currentUser',
          'CurrentUser',
          'user',
          'User',
          'session',
          'Session'
        ];
        
        posiblesVariables.forEach(varName => {
          try {
            if (window.parent[varName]) {
              console.log(`🔍 PolizasSection: Variable ${varName} encontrada:`, window.parent[varName]);
            }
          } catch (e) {
            // Ignorar errores de acceso
          }
        });
      }
    } catch (err) {
      console.warn('⚠️ PolizasSection: Error al intentar acceder a variables de Zoho:', err);
    }

    try {
      // PRIORIDAD 2: Intentar obtener email y crm_id desde URL (si se pasa como parámetro)
      const urlParams = new URLSearchParams(window.location.search);
      let email = urlParams.get('email');
      let crmId = urlParams.get('crm_id') || urlParams.get('crmId') || urlParams.get('id');
      
      // Si crm_id no está en los query params, puede estar en el hash (Zoho Creator a veces pone variables en el hash)
      // Esto pasa cuando Zoho genera: ?crm_id=#Page_Parameter.ID# y el navegador interpreta el # como hash
      if (!crmId) {
        // Caso 1: Intentar extraer de la URL completa antes del hash
        const fullURL = window.location.href;
        const urlWithoutHash = fullURL.split('#')[0]; // Quitar el hash para parsear correctamente
        const urlObj = new URL(urlWithoutHash);
        crmId = urlObj.searchParams.get('crm_id') || urlObj.searchParams.get('crmId') || urlObj.searchParams.get('id');
        
        // Caso 2: Si el hash contiene #Page_Parameter.ID_de_Contacto#, significa que el crm_id estaba ahí
        // En este caso, el valor real NO está disponible (es una variable sin resolver)
        // Pero podemos detectarlo y loguearlo
        if (!crmId && window.location.hash) {
          const hash = window.location.hash;
          // Si el hash es una variable de Zoho Creator sin resolver
          if (hash.includes('#Page_Parameter') || hash.includes('#Contactos')) {
            console.warn('⚠️ PolizasSection: CRM_ID está en el hash como variable sin resolver:', hash);
            console.log('🔵 PolizasSection: Zoho Creator no resolvió la variable, mostrando input DNI');
            // No intentar extraer, es una variable sin resolver
            crmId = null;
          } else {
            // Si el hash tiene otro formato, intentar extraer
            const hashMatch = hash.match(/crm_id[=:]([^&#]+)/i);
            if (hashMatch && hashMatch[1]) {
              crmId = decodeURIComponent(hashMatch[1]);
              console.log('🔵 PolizasSection: CRM_ID extraído del hash:', crmId);
            }
          }
        }
        
        if (crmId) {
          console.log('🔵 PolizasSection: CRM_ID extraído manualmente de URL:', crmId);
        }
      }
      
      console.log('🔵 PolizasSection: URL params:', {
        email: email,
        crm_id: crmId,
        allParams: Object.fromEntries(urlParams.entries()),
        fullURL: window.location.href,
        hash: window.location.hash,
        search: window.location.search
      });
      
      // DEBUG: Verificar si hay variables de Zoho Creator en el hash o URL
      console.log('🔍 PolizasSection: Analizando hash y URL para variables de Zoho:', {
        hash: window.location.hash,
        search: window.location.search,
        pathname: window.location.pathname
      });

      // PRIORIDAD 2A: Si hay crm_id en la URL, usarlo inmediatamente (más confiable que email)
      if (crmId && !crmIdObtenido) {
        // Detectar si es una variable de Zoho Creator sin resolver
        const esVariableSinResolver = crmId.includes('{{') || 
                                      crmId.includes('}}') || 
                                      crmId.includes('${') || 
                                      crmId.includes('#Page_Parameter') || 
                                      crmId.includes('#Contactos') ||
                                      (crmId.includes('#') && crmId.includes('_'));
        
        if (esVariableSinResolver) {
          console.warn('⚠️ PolizasSection: CRM_ID es una variable de Zoho Creator sin resolver:', crmId);
          console.log('🔵 PolizasSection: Esperando a que Zoho Creator resuelva la variable o mostrando input DNI');
          // No hacer nada, mostrar input DNI
        } else {
          // Validar que crm_id sea un número válido
          const crmIdNum = parseInt(crmId, 10);
          if (!isNaN(crmIdNum) && crmIdNum > 0) {
            console.log('🔵 PolizasSection: ✅ CRM_ID válido encontrado en URL:', crmIdNum);
            console.log('🔵 PolizasSection: Iniciando búsqueda de pólizas por crm_id...');
            crmIdObtenido = true;
            buscarPolizasPorCrmId(crmIdNum);
            return; // Salir temprano, ya estamos consultando por crm_id
          } else {
            console.warn('⚠️ PolizasSection: CRM_ID inválido en URL (no es un número):', crmId);
          }
        }
      }

      // NOTA: La búsqueda por email NO funciona en Zoho Creator, por lo que se omite
      // Si no hay crm_id, mostrar input manual para ingresar DNI
      setTimeout(() => {
        if (!crmIdObtenido && !crmId) {
          console.log('🔵 PolizasSection: No hay crm_id disponible, mostrando input DNI para búsqueda manual');
        }
      }, 2000); // Esperar 2 segundos por si llega el crm_id via postMessage

    } catch (err) {
      console.error('❌ PolizasSection: Error al obtener datos:', err);
      // Continuar con el comportamiento normal (mostrar input DNI)
    }

    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

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
      alert('Por favor ingrese su DNI');
      return;
    }
    // Reutilizar la función buscarPolizasConDni
    await buscarPolizasConDni(dni.trim());
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
      
      // Si es un data URI (base64), convertir a Blob URL para evitar problemas con URIs largos
      // Esto solo afecta a Provincia que devuelve base64, Sancor usa URLs HTTP normales
      if (docUrl.startsWith('data:application/pdf;base64,')) {
        try {
          const base64Data = docUrl.split(',')[1];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl, '_blank');
          // Limpiar la URL del objeto después de un tiempo (opcional, el navegador lo hace automáticamente)
          setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
        } catch (error) {
          console.error('Error al convertir base64 a Blob:', error);
          // Fallback: intentar abrir el data URI directamente
          window.open(docUrl, '_blank');
        }
      } else {
        // Para URLs HTTP normales (Sancor): usar directamente
        window.open(docUrl, '_blank');
      }
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
          <div className="pb-hero__text">
            <div className="pb-hero__eyebrow">
              <i className="fas fa-file-contract"></i>
              <span>Portal de Mis Pólizas</span>
            </div>
            <h1 className="pb-hero__title">Pólizas Polo Conecta</h1>
            <p className="pb-hero__subtitle">
              En este sector podés ver tus pólizas y descargar los documentos.
            </p>
          </div>

          {/* Mostrar input DNI solo si no hay email o si el usuario quiere buscar manualmente */}
          {(!emailUsuario || polizasData.length === 0) && (
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
          )}

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
            {loading && (
              <p style={{ textAlign: 'center', color: '#666' }}>
                {emailUsuario ? 'Cargando tus pólizas...' : 'Buscando pólizas...'}
              </p>
            )}

            {error && (
              <div style={{ textAlign: 'center', color: '#c00', padding: '20px' }}>
                <p style={{ marginBottom: '10px' }}>{error}</p>
                {emailUsuario && (
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    Puedes intentar buscar manualmente ingresando tu DNI.
                  </p>
                )}
              </div>
            )}

            {!polizasData.length && !error && !loading && !noResults && !emailUsuario && (
              <p style={{ textAlign: 'center', color: '#666' }}>
                Ingrese su DNI y haga clic en "Cargar pólizas" para comenzar.
              </p>
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
  console.log('🟢 App: Componente montado');

  // Detectar sección desde query parameters
  const urlParams = new URLSearchParams(window.location.search);
  let section = urlParams.get('section');

  console.log('🟢 App: section desde URL params:', section);

  // Si no hay parámetro section, intentar detectar desde el hash del parent (Zoho Creator)
  if (!section) {
    console.log('🟢 App: No hay section en URL params, intentando detectar desde parent...');

    // Si estamos en un iframe, intentar detectar desde el hash del parent
    try {
      if (window.parent && window.parent !== window) {
        const parentHash = window.parent.location.hash;
        const parentURL = window.parent.location.href;
        console.log('🟢 App: Parent URL:', parentURL);
        console.log('🟢 App: Parent hash:', parentHash);

        // Detectar sección desde el hash del parent (Zoho Creator usa #Page:NombrePagina)
        if (parentHash && (parentHash.includes('Polizas') || parentHash.includes('Page:Polizas'))) {
          section = 'polizas';
          console.log('🟢 App: ✅ Sección detectada desde parent: POLIZAS');
        } else if (parentHash && (parentHash.includes('Siniestro') || parentHash.includes('Page:Siniestro'))) {
          section = 'siniestros';
          console.log('🟢 App: ✅ Sección detectada desde parent: SINIESTROS');
        } else if (parentHash && (parentHash.includes('Escritorio') || parentHash.includes('Page:Escritorio'))) {
          section = 'escritorio';
          console.log('🟢 App: ✅ Sección detectada desde parent: ESCRITORIO');
        } else {
          console.log('🟢 App: ⚠️ No se pudo detectar sección desde parent hash');
        }
      }
    } catch (e) {
      console.log('🟢 App: ⚠️ No se puede acceder al parent (normal en iframes con diferentes dominios):', e.message);
      console.log('🟢 App: Error completo:', e);
    }

    // Si aún no hay sección, usar 'escritorio' por defecto (NO forzar polizas)
    if (!section) {
      section = 'escritorio'; // Por defecto: escritorio
      console.log('🟢 App: ✅ Usando sección por defecto: ESCRITORIO (sin parámetros)');
    }
  }

  console.log('🟢 App: ✅ Sección FINAL detectada:', section);
  console.log('🟢 App: URL completa:', window.location.href);
  console.log('🟢 App: Todos los parámetros:', Object.fromEntries(urlParams.entries()));

  // Renderizar según la sección
  if (section === 'polizas') {
    console.log('🟢 App: ✅✅✅ RENDERIZANDO PolizasSection ✅✅✅');
    return <PolizasSection />;
  }

  if (section === 'siniestros') {
    return <SiniestrosSection />;
  }

  // Por defecto: mostrar Escritorio
  return <EscritorioSection />;
}

export default App;

