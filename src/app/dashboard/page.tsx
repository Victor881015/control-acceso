'use client';

import { useState, useEffect } from 'react';
 import { useRouter } from 'next/navigation';

// Tipos de datos
type TipoPersona = 'empleado' | 'visitante' | 'contratista' | 'proveedor';
type TipoPuerta = 'principal' | 'parqueadero' | 'emergencia' | 'carga' | 'lateral';
type EstadoAcceso = 'ingreso' | 'salida';
type NivelSeguridad = 'publico' | 'restringido' | 'confidencial' | 'critico';

interface RegistroAcceso {
  id: string;
  nombre: string;
  tipo: TipoPersona;
  documento: string;
  empresa?: string;
  estado: EstadoAcceso;
  puerta: TipoPuerta;
  horaIngreso?: Date;
  horaSalida?: Date;
  foto: string;
  registradoPor: string;
  autorizadoPor?: string;
  areaDestino?: string;
  observaciones?: string;
  temperatura?: number;
  nivelSeguridad?: NivelSeguridad;
  vehiculo?: string;
  placaVehiculo?: string;
  elementosIngreso?: string[];
}

interface Alarma {
  id: string;
  tipo: 'acceso_denegado' | 'puerta_forzada' | 'tiempo_excedido' | 'zona_restringida' | 'temperatura_alta' | 'intrusion' | 'objeto_sospechoso';
  descripcion: string;
  ubicacion: string;
  coordenadas?: { lat: number; lng: number };
  fecha: Date;
  severidad: 'baja' | 'media' | 'alta' | 'critica';
  atendida: boolean;
  personaInvolucrada?: string;
  accionTomada?: string;
  camaraAsociada?: string;
}

interface ContactoEmergencia {
  area: string;
  responsable: string;
  telefono: string;
  extension?: string;
  email: string;
  icono: string;
  disponibilidad: '24/7' | 'Horario laboral';
}

interface NuevoRegistro {
  nombre: string;
  documento: string;
  tipo: TipoPersona;
  empresa: string;
  areaDestino: string;
  autorizadoPor: string;
  observaciones: string;
  temperatura: string;
  nivelSeguridad: NivelSeguridad;
  vehiculo: string;
  placaVehiculo: string;
  elementosIngreso: string;
  puerta: TipoPuerta;
}

export default function DashboardPage() {
  const [registros, setRegistros] = useState<RegistroAcceso[]>([]);
  const [alarmas, setAlarmas] = useState<Alarma[]>([]);
  const router = useRouter();
  
 
  
  // Filtros avanzados
  const [filtroTipo, setFiltroTipo] = useState<'todos' | TipoPersona>('todos');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | EstadoAcceso>('todos');
  const [filtroPuerta, setFiltroPuerta] = useState<'todos' | TipoPuerta>('todos');
  const [filtroNivel, setFiltroNivel] = useState<'todos' | NivelSeguridad>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [fechaFiltro, setFechaFiltro] = useState('');
  
  const [seccionActiva, setSeccionActiva] = useState<'dashboard' | 'registro' | 'tips' | 'alarmas' | 'reportes'>('dashboard');
  
  // Estado del formulario de nuevo registro
  const [nuevoRegistro, setNuevoRegistro] = useState<NuevoRegistro>({
    nombre: '',
    documento: '',
    tipo: 'visitante',
    empresa: '',
    areaDestino: '',
    autorizadoPor: '',
    observaciones: '',
    temperatura: '',
    nivelSeguridad: 'publico',
    vehiculo: '',
    placaVehiculo: '',
    elementosIngreso: '',
    puerta: 'principal'
  });

  // Contactos de emergencia
  const contactosEmergencia: ContactoEmergencia[] = [
    {
      area: 'Seguridad Física',
      responsable: 'Juan Pérez',
      telefono: '+57 300 123 4567',
      extension: '101',
      email: 'seguridad@empresa.com',
      icono: '🛡️',
      disponibilidad: '24/7'
    },
    {
      area: 'Gerencia General',
      responsable: 'María García',
      telefono: '+57 310 234 5678',
      extension: '200',
      email: 'gerencia@empresa.com',
      icono: '👔',
      disponibilidad: 'Horario laboral'
    },
    {
      area: 'RRHH',
      responsable: 'Carlos Martínez',
      telefono: '+57 320 345 6789',
      extension: '150',
      email: 'rrhh@empresa.com',
      icono: '👥',
      disponibilidad: 'Horario laboral'
    },
    {
      area: 'Sistemas e IT',
      responsable: 'Ana López',
      telefono: '+57 315 456 7890',
      extension: '180',
      email: 'it@empresa.com',
      icono: '💻',
      disponibilidad: '24/7'
    },
    {
      area: 'Salud Ocupacional',
      responsable: 'Dr. Roberto Silva',
      telefono: '+57 318 567 8901',
      extension: '120',
      email: 'salud@empresa.com',
      icono: '🏥',
      disponibilidad: 'Horario laboral'
    },
    {
      area: 'Mantenimiento',
      responsable: 'Luis Ramírez',
      telefono: '+57 312 678 9012',
      extension: '160',
      email: 'mantenimiento@empresa.com',
      icono: '🔧',
      disponibilidad: '24/7'
    },
    {
      area: 'Policía Nacional',
      responsable: 'Línea Emergencias',
      telefono: '123',
      email: 'emergencias@policia.gov.co',
      icono: '👮',
      disponibilidad: '24/7'
    },
    {
      area: 'Bomberos',
      responsable: 'Línea Emergencias',
      telefono: '119',
      email: 'atencion@bomberos.gov.co',
      icono: '🚒',
      disponibilidad: '24/7'
    }
  ];

  // Datos de ejemplo más completos
  useEffect(() => {
  cargarDatos();
}, []);

// Función para cargar datos desde MongoDB
const cargarDatos = async () => {
  try {
    // Cargar registros
    const resRegistros = await fetch('/api/registros');
    const dataRegistros = await resRegistros.json();
    setRegistros(dataRegistros.map((r: any) => ({
      ...r,
      id: r._id,
      horaIngreso: r.horaIngreso ? new Date(r.horaIngreso) : undefined,
      horaSalida: r.horaSalida ? new Date(r.horaSalida) : undefined
    })));

    // Cargar alarmas
    const resAlarmas = await fetch('/api/alarmas');
    const dataAlarmas = await resAlarmas.json();
    setAlarmas(dataAlarmas.map((a: any) => ({
      ...a,
      id: a._id,
      fecha: new Date(a.fecha)
    })));
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
};

   
  // Estadísticas detalladas
  const stats = {
    enInstalaciones: registros.filter(r => r.estado === 'ingreso').length,
    ingresosHoy: registros.length,
    empleados: registros.filter(r => r.tipo === 'empleado' && r.estado === 'ingreso').length,
    visitantes: registros.filter(r => r.tipo === 'visitante' && r.estado === 'ingreso').length,
    contratistas: registros.filter(r => r.tipo === 'contratista' && r.estado === 'ingreso').length,
    proveedores: registros.filter(r => r.tipo === 'proveedor' && r.estado === 'ingreso').length,
    alarmasActivas: alarmas.filter(a => !a.atendida).length,
    alarmasCriticas: alarmas.filter(a => (a.severidad === 'critica' || a.severidad === 'alta') && !a.atendida).length,
    salidasHoy: registros.filter(r => r.estado === 'salida').length,
    vehiculosParqueadero: registros.filter(r => r.vehiculo && r.estado === 'ingreso').length,
    zonasRestringidas: registros.filter(r => r.nivelSeguridad === 'confidencial' || r.nivelSeguridad === 'critico').length
  };

  // Filtrado avanzado de registros
  const registrosFiltrados = registros.filter(registro => {
    const matchTipo = filtroTipo === 'todos' || registro.tipo === filtroTipo;
    const matchEstado = filtroEstado === 'todos' || registro.estado === filtroEstado;
    const matchPuerta = filtroPuerta === 'todos' || registro.puerta === filtroPuerta;
    const matchNivel = filtroNivel === 'todos' || registro.nivelSeguridad === filtroNivel;
    const matchBusqueda = busqueda === '' || 
      registro.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      registro.documento.includes(busqueda) ||
      registro.empresa?.toLowerCase().includes(busqueda.toLowerCase()) ||
      registro.placaVehiculo?.toLowerCase().includes(busqueda.toLowerCase());
    
    return matchTipo && matchEstado && matchPuerta && matchNivel && matchBusqueda;
  });

  // Función para manejar el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNuevoRegistro(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRegistro = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/registros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nuevoRegistro.nombre,
        documento: nuevoRegistro.documento,
        tipo: nuevoRegistro.tipo,
        empresa: nuevoRegistro.empresa,
        estado: 'ingreso',
        puerta: nuevoRegistro.puerta,
        foto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nuevoRegistro.nombre}`,
        registradoPor: 'Portería - Control Manual',
        autorizadoPor: nuevoRegistro.autorizadoPor,
        areaDestino: nuevoRegistro.areaDestino,
        observaciones: nuevoRegistro.observaciones,
        temperatura: parseFloat(nuevoRegistro.temperatura) || 36.5,
        nivelSeguridad: nuevoRegistro.nivelSeguridad,
        vehiculo: nuevoRegistro.vehiculo || undefined,
        placaVehiculo: nuevoRegistro.placaVehiculo || undefined,
        elementosIngreso: nuevoRegistro.elementosIngreso 
          ? nuevoRegistro.elementosIngreso.split(',').map(e => e.trim()) 
          : []
      }),
    });

    if (response.ok) {
      // Recargar datos
      await cargarDatos();
      
      // Limpiar formulario
      setNuevoRegistro({
        nombre: '',
        documento: '',
        tipo: 'visitante',
        empresa: '',
        areaDestino: '',
        autorizadoPor: '',
        observaciones: '',
        temperatura: '',
        nivelSeguridad: 'publico',
        vehiculo: '',
        placaVehiculo: '',
        elementosIngreso: '',
        puerta: 'principal'
      });

      alert('✅ Registro de ingreso creado exitosamente');
      setSeccionActiva('dashboard');
    } else {
      alert('❌ Error al crear el registro');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Error de conexión');
  }
};
  const registrarSalida = async (id: string) => {
  try {
    const response = await fetch(`/api/registros/${id}/salida`, {
      method: 'PATCH',
    });

    if (response.ok) {
      // Recargar datos
      await cargarDatos();
      alert('✅ Salida registrada exitosamente');
    } else {
      alert('❌ Error al registrar salida');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Error de conexión');
  }
};

  const atenderAlarma = async (id: string) => {
  const accion = prompt('Ingrese la acción tomada para resolver esta alarma:');
  if (accion) {
    try {
      const response = await fetch(`/api/alarmas/${id}/atender`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accionTomada: accion }),
      });

      if (response.ok) {
        // Recargar datos
        await cargarDatos();
        alert('✅ Alarma atendida exitosamente');
      } else {
        alert('❌ Error al atender alarma');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error de conexión');
    }
  }
};

  const exportarDatos = () => {
    const csv = registrosFiltrados.map(r => 
      `${r.nombre},${r.tipo},${r.documento},${r.empresa || ''},${r.estado},${r.puerta},${r.horaIngreso?.toLocaleString() || ''},${r.horaSalida?.toLocaleString() || ''},${r.temperatura || ''},${r.areaDestino || ''},${r.vehiculo || ''},${r.placaVehiculo || ''}`
    ).join('\n');
    
    const blob = new Blob([`Nombre,Tipo,Documento,Empresa,Estado,Puerta,Hora Ingreso,Hora Salida,Temperatura,Área Destino,Vehículo,Placa\n${csv}`], 
      { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accesos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const limpiarFiltros = () => {
    setFiltroTipo('todos');
    setFiltroEstado('todos');
    setFiltroPuerta('todos');
    setFiltroNivel('todos');
    setBusqueda('');
    setFechaFiltro('');
  };

  const getSeveridadColor = (severidad: string) => {
    switch(severidad) {
      case 'critica': return 'bg-red-500';
      case 'alta': return 'bg-orange-500';
      case 'media': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getSeveridadBorder = (severidad: string) => {
    switch(severidad) {
      case 'critica': return 'border-red-500';
      case 'alta': return 'border-orange-500';
      case 'media': return 'border-yellow-500';
      default: return 'border-blue-500';
    }
  };

  const getNivelColor = (nivel?: NivelSeguridad) => {
    switch(nivel) {
      case 'critico': return 'text-red-400 bg-red-500/20';
      case 'confidencial': return 'text-orange-400 bg-orange-500/20';
      case 'restringido': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-green-400 bg-green-500/20';
    }
  };

  const tipsSeguridadFisica = [
    {
      icono: '🔐',
      titulo: 'Verificación de Identidad',
      descripcion: 'Siempre verificar documento de identidad original y comparar con el registro fotográfico.',
      categoria: 'Verificación'
    },
    {
      icono: '📹',
      titulo: 'Monitoreo CCTV',
      descripcion: 'Revisar periódicamente las cámaras en puntos críticos: entradas, salidas y áreas restringidas.',
      categoria: 'Vigilancia'
    },
    {
      icono: '🚪',
      titulo: 'Control de Puertas',
      descripcion: 'Verificar que puertas de emergencia estén cerradas y solo se abran en caso necesario.',
      categoria: 'Perímetro'
    },
    {
      icono: '👥',
      titulo: 'Identificación Visible',
      descripcion: 'Todo personal debe portar escarapela o identificación visible a la altura del pecho.',
      categoria: 'Protocolos'
    },
    {
      icono: '🌡️',
      titulo: 'Control de Temperatura',
      descripcion: 'Registrar temperatura corporal. Si supera 37.5°C, aplicar protocolo de salud.',
      categoria: 'Salud'
    },
    {
      icono: '📝',
      titulo: 'Registro Completo',
      descripcion: 'Documentar: nombre, empresa, área destino, hora entrada/salida y autorización.',
      categoria: 'Documentación'
    },
    {
      icono: '🚗',
      titulo: 'Control Vehicular',
      descripcion: 'Registrar placas de vehículos, inspeccionar maleteros en acceso y salida.',
      categoria: 'Vehículos'
    },
    {
      icono: '📦',
      titulo: 'Revisión de Elementos',
      descripcion: 'Inspeccionar bolsos, paquetes y elementos que ingresan/salen de las instalaciones.',
      categoria: 'Inspección'
    },
    {
      icono: '⏰',
      titulo: 'Control de Horarios',
      descripcion: 'Registrar accesos fuera de horario laboral y validar autorización especial.',
      categoria: 'Horarios'
    },
    {
      icono: '🔔',
      titulo: 'Atención a Alarmas',
      descripcion: 'Responder inmediatamente a cualquier alerta y documentar la acción tomada.',
      categoria: 'Emergencias'
    },
    {
      icono: '🔒',
      titulo: 'Zonas Restringidas',
      descripcion: 'Acompañar siempre a visitantes en zonas de acceso restringido o confidencial.',
      categoria: 'Acceso'
    },
    {
      icono: '📞',
      titulo: 'Comunicación Constante',
      descripcion: 'Mantener radio de comunicación activo y reportar novedades al supervisor.',
      categoria: 'Comunicación'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header Fijo */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl sticky top-0 z-50 shadow-xl">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="text-4xl">🛡️</div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Sistema de Control de Acceso</h1>
                <p className="text-sm text-slate-400">Seguridad Física Empresarial · Monitoreo en Tiempo Real</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer group">
                <span className="text-2xl">🔔</span>
                {stats.alarmasActivas > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold animate-pulse">
                    {stats.alarmasActivas}
                  </span>
                )}
                <div className="absolute right-0 top-10 hidden group-hover:block bg-slate-800 rounded-lg p-3 shadow-xl border border-slate-700 w-64 z-50">
                  <p className="text-xs font-semibold text-white mb-1">{stats.alarmasActivas} Alarmas Activas</p>
                  <p className="text-xs text-slate-400">{stats.alarmasCriticas} requieren atención inmediata</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
                <span className="text-green-400 text-xl animate-pulse">●</span>
                <span className="text-sm text-slate-300 font-medium">Sistema Operativo</span>
              </div>
              <div className="text-sm text-slate-400 bg-slate-800/30 px-3 py-2 rounded-lg">
                <div className="font-semibold text-white">{new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-xs">{new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto px-6 py-6">
        {/* Navegación de secciones */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSeccionActiva('dashboard')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
              seccionActiva === 'dashboard'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span className="text-lg">📊</span>
            Panel Principal
          </button>
          <button
            onClick={() => setSeccionActiva('registro')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
              seccionActiva === 'registro'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span className="text-lg">➕</span>
            Registrar Acceso
          </button>
          <button
            onClick={() => setSeccionActiva('tips')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
              seccionActiva === 'tips'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span className="text-lg">💡</span>
            Protocolos de Seguridad
          </button>
          <button
            onClick={() => setSeccionActiva('alarmas')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
              seccionActiva === 'alarmas'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/50'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span className="text-lg">🚨</span>
            Alertas de Seguridad
            {stats.alarmasActivas > 0 && (
              <span className="bg-white text-red-500 px-2 py-0.5 rounded-full text-xs font-bold">
                {stats.alarmasActivas}
              </span>
            )}
          </button>
          <button
    onClick={() => router.push('dashboard/reportes')} // ← CAMBIO AQUÍ
    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap bg-slate-800/50 text-slate-400 hover:bg-slate-800"
  >
    <span className="text-lg">📈</span>
    Reportes
  </button>
        </div>

        {/* SECCIÓN: DASHBOARD - Layout de dos columnas */}
        {seccionActiva === 'dashboard' && (
          <div className="grid grid-cols-12 gap-6">
            {/* COLUMNA IZQUIERDA - Formulario y Controles (8 columnas) */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              
              {/* Estadísticas Principales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">👥</span>
                    <span className="text-xs text-cyan-400 font-bold">ACTIVOS</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.enInstalaciones}</p>
                  <p className="text-xs text-slate-400">En instalaciones</p>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-xl p-4 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">📥</span>
                    <span className="text-xs text-green-400 font-bold">INGRESOS</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.ingresosHoy}</p>
                  <p className="text-xs text-slate-400">Total hoy</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/20 rounded-xl p-4 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">📤</span>
                    <span className="text-xs text-orange-400 font-bold">SALIDAS</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.salidasHoy}</p>
                  <p className="text-xs text-slate-400">Total hoy</p>
                </div>

                <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl border border-red-500/20 rounded-xl p-4 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">🚨</span>
                    <span className="text-xs text-red-400 font-bold">ALARMAS</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.alarmasActivas}</p>
                  <p className="text-xs text-slate-400">Activas</p>
                </div>
              </div>

              {/* Desglose Detallado */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">👔</span>
                    <span className="text-xs text-slate-400 font-medium">EMPLEADOS</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-400">{stats.empleados}</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">👥</span>
                    <span className="text-xs text-slate-400 font-medium">VISITANTES</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-400">{stats.visitantes}</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔧</span>
                    <span className="text-xs text-slate-400 font-medium">CONTRATISTAS</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-400">{stats.contratistas}</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📦</span>
                    <span className="text-xs text-slate-400 font-medium">PROVEEDORES</span>
                  </div>
                  <p className="text-2xl font-bold text-green-400">{stats.proveedores}</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🚗</span>
                    <span className="text-xs text-slate-400 font-medium">VEHÍCULOS</span>
                  </div>
                  <p className="text-2xl font-bold text-cyan-400">{stats.vehiculosParqueadero}</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔒</span>
                    <span className="text-xs text-slate-400 font-medium">ZONAS SEGURAS</span>
                  </div>
                  <p className="text-2xl font-bold text-red-400">{stats.zonasRestringidas}</p>
                </div>
              </div>

              {/* Panel de Filtros Avanzados */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>🎯</span>
                    Filtros de Búsqueda
                  </h3>
                  <button
                    onClick={limpiarFiltros}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <span>🔄</span>
                    Limpiar Filtros
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Búsqueda General */}
                  <div className="lg:col-span-3">
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Búsqueda General
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🔍</span>
                      <input
                        type="text"
                        placeholder="Nombre, documento, empresa o placa..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Tipo de Persona */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Tipo de Persona
                    </label>
                    <select
                      value={filtroTipo}
                      onChange={(e) => setFiltroTipo(e.target.value as any)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                    >
                      <option value="todos">Todos</option>
                      <option value="empleado">👔 Empleados</option>
                      <option value="visitante">👥 Visitantes</option>
                      <option value="contratista">🔧 Contratistas</option>
                      <option value="proveedor">📦 Proveedores</option>
                    </select>
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Estado de Acceso
                    </label>
                    <select
                      value={filtroEstado}
                      onChange={(e) => setFiltroEstado(e.target.value as any)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                    >
                      <option value="todos">Todos</option>
                      <option value="ingreso">✅ En Instalaciones</option>
                      <option value="salida">❌ Salidas Registradas</option>
                    </select>
                  </div>

                  {/* Puerta de Acceso */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Puerta de Acceso
                    </label>
                    <select
                      value={filtroPuerta}
                      onChange={(e) => setFiltroPuerta(e.target.value as any)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                    >
                      <option value="todos">Todas</option>
                      <option value="principal">🚪 Principal</option>
                      <option value="parqueadero">🚗 Parqueadero</option>
                      <option value="carga">📦 Carga/Descarga</option>
                      <option value="emergencia">🚨 Emergencia</option>
                      <option value="lateral">🔀 Lateral</option>
                    </select>
                  </div>

                  {/* Nivel de Seguridad */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Nivel de Seguridad
                    </label>
                    <select
                      value={filtroNivel}
                      onChange={(e) => setFiltroNivel(e.target.value as any)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                    >
                      <option value="todos">Todos</option>
                      <option value="publico">🟢 Público</option>
                      <option value="restringido">🟡 Restringido</option>
                      <option value="confidencial">🟠 Confidencial</option>
                      <option value="critico">🔴 Crítico</option>
                    </select>
                  </div>

                  {/* Fecha */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Filtrar por Fecha
                    </label>
                    <input
                      type="date"
                      value={fechaFiltro}
                      onChange={(e) => setFechaFiltro(e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-slate-800">
                  <button
                    onClick={exportarDatos}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/30 text-sm"
                  >
                    <span>📥</span>
                    Exportar Datos ({registrosFiltrados.length})
                  </button>
                  <button className="flex items-center gap-2 bg-slate-800 text-slate-300 px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-700 transition-colors text-sm">
                    <span>🖨️</span>
                    Imprimir
                  </button>
                </div>
              </div>

              {/* Información de resultados */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Mostrando {registrosFiltrados.length} de {registros.length} registros
                      </p>
                      <p className="text-xs text-slate-400">
                        {stats.enInstalaciones} personas actualmente en instalaciones · {stats.vehiculosParqueadero} vehículos en parqueadero
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Última actualización</p>
                    <p className="text-sm font-semibold text-cyan-400">
                      {new Date().toLocaleTimeString('es-CO')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA - Lista de Accesos (4 columnas) */}
            <div className="col-span-12 lg:col-span-4">
              <div className="sticky top-24">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>👁️</span>
                      Registros en Vivo
                    </h3>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-semibold">
                      LIVE
                    </span>
                  </div>

                  {/* Lista scrolleable de accesos */}
                  <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
                    {registrosFiltrados.length === 0 ? (
                      <div className="text-center py-12">
                        <span className="text-6xl">🔍</span>
                        <p className="text-slate-400 mt-4">No hay registros</p>
                        <p className="text-slate-600 text-sm mt-1">Ajusta los filtros de búsqueda</p>
                      </div>
                    ) : (
                      registrosFiltrados.map((registro) => (
                        <div
                          key={registro.id}
                          className={`bg-slate-800/40 backdrop-blur-sm border-l-4 ${
                            registro.estado === 'ingreso' ? 'border-green-500' : 'border-slate-600'
                          } rounded-lg p-3 hover:bg-slate-800/60 transition-all`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative flex-shrink-0">
                              <img
                                src={registro.foto}
                                alt={registro.nombre}
                                className="w-12 h-12 rounded-lg object-cover ring-2 ring-slate-700"
                              />
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${
                                registro.estado === 'ingreso' ? 'bg-green-500' : 'bg-slate-500'
                              } rounded-full border-2 border-slate-900`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-sm font-bold text-white truncate">{registro.nombre}</h4>
                                <span className={`px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0 ${
                                  registro.tipo === 'empleado' ? 'bg-blue-500/20 text-blue-400' :
                                  registro.tipo === 'visitante' ? 'bg-purple-500/20 text-purple-400' :
                                  registro.tipo === 'contratista' ? 'bg-amber-500/20 text-amber-400' :
                                  'bg-green-500/20 text-green-400'
                                }`}>
                                  {registro.tipo === 'empleado' ? '👔' :
                                   registro.tipo === 'visitante' ? '👥' :
                                   registro.tipo === 'contratista' ? '🔧' : '📦'}
                                </span>
                              </div>

                              <p className="text-xs text-slate-400 truncate mb-1">{registro.documento}</p>
                              
                              {registro.empresa && (
                                <p className="text-xs text-slate-500 truncate">🏢 {registro.empresa}</p>
                              )}

                              {registro.areaDestino && (
                                <p className="text-xs text-cyan-400 truncate mb-1">📍 {registro.areaDestino}</p>
                              )}

                              {/* INFORMACIÓN DEL VEHÍCULO - AHORA VISIBLE */}
                              {registro.vehiculo && (
                                <div className="bg-slate-900/50 rounded p-2 mt-2 border border-slate-700">
                                  <p className="text-xs text-amber-400 font-semibold mb-1">🚗 Vehículo Registrado</p>
                                  <p className="text-xs text-slate-300">{registro.vehiculo}</p>
                                  {registro.placaVehiculo && (
                                    <p className="text-xs text-slate-400 mt-0.5">
                                      Placa: <span className="font-bold text-white">{registro.placaVehiculo}</span>
                                    </p>
                                  )}
                                </div>
                              )}

                              <div className="flex items-center gap-3 text-xs mt-2">
                                <span className="text-slate-500">
                                  🚪 {
                                    registro.puerta === 'principal' ? 'Principal' :
                                    registro.puerta === 'parqueadero' ? 'Parqueadero' :
                                    registro.puerta === 'carga' ? 'Carga' :
                                    registro.puerta === 'emergencia' ? 'Emergencia' : 'Lateral'
                                  }
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-700">
                                <span className="text-green-400 font-semibold">
                                  ⏰ {registro.horaIngreso?.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {registro.temperatura && (
                                  <span className={`font-semibold ${registro.temperatura > 37.5 ? 'text-red-400' : 'text-green-400'}`}>
                                    🌡️ {registro.temperatura}°C
                                  </span>
                                )}
                              </div>

                              {registro.nivelSeguridad && (
                                <div className="mt-2">
                                  <span className={`text-xs px-2 py-0.5 rounded ${getNivelColor(registro.nivelSeguridad)} font-semibold`}>
                                    🔒 {registro.nivelSeguridad.toUpperCase()}
                                  </span>
                                </div>
                              )}

                              {registro.estado === 'ingreso' && (
                                <button
                                  onClick={() => registrarSalida(registro.id)}
                                  className="w-full mt-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                                >
                                  📤 Registrar Salida
                                </button>
                              )}

                              {registro.horaSalida && (
                                <div className="mt-2 text-xs text-red-400 font-semibold">
                                  📤 Salida: {registro.horaSalida?.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN: NUEVO REGISTRO - Continúa igual */}
        {seccionActiva === 'registro' && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">📝</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">Registro de Nuevo Acceso</h2>
                  <p className="text-sm text-slate-400">Complete toda la información requerida para registrar el ingreso</p>
                </div>
              </div>

              <form onSubmit={handleSubmitRegistro} className="space-y-6">
                {/* Sección: Información Personal */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span>👤</span>
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={nuevoRegistro.nombre}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: Juan Pérez García"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Número de Documento *
                      </label>
                      <input
                        type="text"
                        name="documento"
                        value={nuevoRegistro.documento}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: 1234567890"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Tipo de Persona *
                      </label>
                      <select
                        name="tipo"
                        value={nuevoRegistro.tipo}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option value="visitante">👥 Visitante</option>
                        <option value="empleado">👔 Empleado</option>
                        <option value="contratista">🔧 Contratista</option>
                        <option value="proveedor">📦 Proveedor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Empresa / Organización *
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={nuevoRegistro.empresa}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: TechCorp S.A.S."
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Sección: Datos de Acceso */}
                <div className="pt-6 border-t border-slate-800">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span>🚪</span>
                    Datos de Acceso
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Área de Destino *
                      </label>
                      <input
                        type="text"
                        name="areaDestino"
                        value={nuevoRegistro.areaDestino}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: Piso 3 - Sala de Juntas"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Autorizado Por *
                      </label>
                      <input
                        type="text"
                        name="autorizadoPor"
                        value={nuevoRegistro.autorizadoPor}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: Gerente - Roberto Silva"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Puerta de Acceso *
                      </label>
                      <select
                        name="puerta"
                        value={nuevoRegistro.puerta}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option value="principal">🚪 Puerta Principal</option>
                        <option value="parqueadero">🚗 Parqueadero</option>
                        <option value="carga">📦 Carga/Descarga</option>
                        <option value="emergencia">🚨 Emergencia</option>
                        <option value="lateral">🔀 Lateral</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Nivel de Seguridad *
                      </label>
                      <select
                        name="nivelSeguridad"
                        value={nuevoRegistro.nivelSeguridad}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option value="publico">🟢 Público</option>
                        <option value="restringido">🟡 Restringido</option>
                        <option value="confidencial">🟠 Confidencial</option>
                        <option value="critico">🔴 Crítico</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Sección: Control de Salud */}
                <div className="pt-6 border-t border-slate-800">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span>🌡️</span>
                    Control de Salud
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Temperatura Corporal (°C) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="temperatura"
                        value={nuevoRegistro.temperatura}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: 36.5"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                      <p className="text-xs text-slate-500 mt-1">⚠️ Si es mayor a 37.5°C, aplicar protocolo especial</p>
                    </div>
                  </div>
                </div>

                {/* Sección: Datos del Vehículo (Opcional) */}
                <div className="pt-6 border-t border-slate-800">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span>🚗</span>
                    Datos del Vehículo (Opcional)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Tipo de Vehículo
                      </label>
                      <input
                        type="text"
                        name="vehiculo"
                        value={nuevoRegistro.vehiculo}
                        onChange={handleInputChange}
                        placeholder="Ej: Automóvil Toyota Corolla"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Placa del Vehículo
                      </label>
                      <input
                        type="text"
                        name="placaVehiculo"
                        value={nuevoRegistro.placaVehiculo}
                        onChange={handleInputChange}
                        placeholder="Ej: ABC123"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Sección: Elementos de Ingreso */}
                <div className="pt-6 border-t border-slate-800">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span>📦</span>
                    Elementos de Ingreso
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      Elementos que Ingresan
                    </label>
                    <input
                      type="text"
                      name="elementosIngreso"
                      value={nuevoRegistro.elementosIngreso}
                      onChange={handleInputChange}
                      placeholder="Ej: Laptop, Celular, Documentos (separar por comas)"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <p className="text-xs text-slate-500 mt-1">📋 Listar todos los elementos separados por comas</p>
                  </div>
                </div>

                {/* Observaciones */}
                <div className="pt-6 border-t border-slate-800">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span>📝</span>
                    Observaciones Adicionales
                  </h3>
                  <div>
                    <textarea
                      name="observaciones"
                      value={nuevoRegistro.observaciones}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Información adicional relevante sobre el acceso..."
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex gap-4 pt-6 border-t border-slate-800">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/30 text-lg flex items-center justify-center gap-2"
                  >
                    <span>✅</span>
                    Registrar Ingreso
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeccionActiva('dashboard')}
                    className="px-8 bg-slate-800 text-slate-300 py-4 rounded-xl font-bold hover:bg-slate-700 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SECCIÓN: TIPS DE SEGURIDAD */}
        {seccionActiva === 'tips' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">💡</span>
              <div>
                <h2 className="text-2xl font-bold text-white">Protocolos de Seguridad Física</h2>
                <p className="text-sm text-slate-400">Mejores prácticas y procedimientos para el control de acceso empresarial</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tipsSeguridadFisica.map((tip, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-5 hover:border-purple-500/30 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{tip.icono}</span>
                    <div className="flex-1">
                      <span className="text-xs text-purple-400 font-bold uppercase tracking-wide">{tip.categoria}</span>
                      <h3 className="text-sm font-bold text-white mt-1">{tip.titulo}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{tip.descripcion}</p>
                </div>
              ))}
            </div>

            {/* Información Normativa */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-5xl">📚</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Normativas y Estándares</h3>
                    <p className="text-sm text-slate-400 mb-3">
                      Cumplir con las normativas vigentes de seguridad física y protección de datos.
                    </p>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>✓ ISO 27001 - Gestión de Seguridad de la Información</li>
                      <li>✓ ISO 45001 - Seguridad y Salud Ocupacional</li>
                      <li>✓ Normativa local de seguridad empresarial</li>
                      <li>✓ Protocolos de emergencia y evacuación</li>
                      <li>✓ GDPR/LOPDGDD - Protección de datos personales</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-red-500/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-5xl">🚨</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Protocolos de Emergencia</h3>
                    <p className="text-sm text-slate-400 mb-3">
                      Procedimientos a seguir en caso de situaciones críticas de seguridad.
                    </p>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>🔴 Alerta de intrusión - Contactar seguridad inmediatamente</li>
                      <li>🟠 Puerta forzada - Verificar cámaras y acudir al punto</li>
                      <li>🟡 Acceso no autorizado - Solicitar identificación</li>
                      <li>🔵 Temperatura elevada - Aplicar protocolo de salud</li>
                      <li>⚪ Objeto sospechoso - No tocar, aislar área y reportar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN: ALARMAS MEJORADA CON MAPA Y CONTACTOS */}
        {seccionActiva === 'alarmas' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-5xl">🚨</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">Sistema de Alertas de Seguridad</h2>
                  <p className="text-sm text-slate-400">Monitoreo y gestión de eventos de seguridad críticos</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/50 px-5 py-3 rounded-lg border border-slate-800">
                <span className={`w-3 h-3 rounded-full ${stats.alarmasActivas > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                <span className="text-sm text-slate-300 font-semibold">
                  {stats.alarmasActivas > 0 ? `${stats.alarmasActivas} alarmas activas` : 'Sistema seguro'}
                </span>
              </div>
            </div>

            {/* Layout de 2 columnas para alarmas */}
            <div className="grid grid-cols-12 gap-6">
              {/* COLUMNA IZQUIERDA - Mapa e información (8 columnas) */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Mapa de ubicaciones */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>🗺️</span>
                      Mapa de Ubicaciones - Alarmas Activas
                    </h3>
                    <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-semibold">
                      {alarmas.filter(a => !a.atendida).length} ACTIVAS
                    </span>
                  </div>
                  
                  {/* Mapa simulado */}
                  <div className="relative bg-slate-800/50 rounded-xl overflow-hidden" style={{ height: '400px' }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-6xl mb-4 block">🗺️</span>
                        <p className="text-slate-400 text-lg font-semibold">Mapa Interactivo de Instalaciones</p>
                        <p className="text-slate-600 text-sm mt-2">Ubicación de alarmas en tiempo real</p>
                      </div>
                    </div>
                    
                    {/* Marcadores de alarmas en el mapa */}
                    {alarmas.filter(a => !a.atendida).map((alarma, index) => (
                      <div
                        key={alarma.id}
                        className={`absolute ${getSeveridadColor(alarma.severidad)} w-6 h-6 rounded-full animate-ping opacity-75`}
                        style={{
                          top: `${20 + index * 15}%`,
                          left: `${30 + index * 20}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Leyenda del mapa */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-slate-400">Crítica</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      <span className="text-slate-400">Alta</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="text-slate-400">Media</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-slate-400">Baja</span>
                    </div>
                  </div>
                </div>

                {/* Lista de alarmas detalladas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>📋</span>
                    Registro Detallado de Alertas
                  </h3>
                  
                  {alarmas.map((alarma) => (
                    <div
                      key={alarma.id}
                      className={`bg-slate-900/50 backdrop-blur-xl border-2 ${getSeveridadBorder(alarma.severidad)} rounded-xl p-5 hover:shadow-xl transition-all ${
                        !alarma.atendida && 'ring-2 ring-red-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 ${getSeveridadColor(alarma.severidad)}/20 rounded-xl ${!alarma.atendida && 'animate-pulse'}`}>
                          <span className="text-3xl">⚠️</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-bold text-white">{alarma.descripcion}</h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeveridadColor(alarma.severidad)} text-white uppercase tracking-wide`}>
                                  {alarma.severidad}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-400">
                                <span className="flex items-center gap-2">
                                  <span>📍</span> <strong className="text-slate-300">{alarma.ubicacion}</strong>
                                </span>
                                <span className="flex items-center gap-2">
                                  <span>⏰</span> {alarma.fecha.toLocaleString('es-CO')}
                                </span>
                                {alarma.personaInvolucrada && (
                                  <span className="flex items-center gap-2">
                                    <span>👤</span> {alarma.personaInvolucrada}
                                  </span>
                                )}
                                {alarma.camaraAsociada && (
                                  <span className="flex items-center gap-2">
                                    <span>📹</span> {alarma.camaraAsociada}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {alarma.accionTomada && (
                            <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
                              <p className="text-xs text-green-400 mb-1 font-semibold">✅ Acción Tomada:</p>
                              <p className="text-sm text-slate-300">{alarma.accionTomada}</p>
                            </div>
                          )}

                          <div className="flex items-center gap-3 flex-wrap">
                            {!alarma.atendida ? (
                              <>
                                <button
                                  onClick={() => atenderAlarma(alarma.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                                >
                                  <span>✅</span>
                                  Atender Alarma
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors">
                                  <span>📋</span>
                                  Ver Detalles
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors">
                                  <span>📹</span>
                                  Ver Cámaras
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors">
                                  <span>🚨</span>
                                  Escalar Alarma
                                </button>
                              </>
                            ) : (
                              <span className="flex items-center gap-2 text-green-400 font-bold text-lg">
                                <span>✓</span> Alarma Atendida y Resuelta
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {alarmas.length === 0 && (
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-16 text-center">
                      <div className="text-8xl mb-4">🛡️</div>
                      <p className="text-slate-400 text-xl font-semibold">No hay alarmas registradas</p>
                      <p className="text-green-400 text-lg mt-2">✓ Todas las áreas bajo control</p>
                    </div>
                  )}
                </div>
              </div>

              {/* COLUMNA DERECHA - Contactos de Emergencia (4 columnas) */}
              <div className="col-span-12 lg:col-span-4">
                <div className="sticky top-24">
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                      <span>📞</span>
                      Contactos de Emergencia
                    </h3>

                    <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
                      {contactosEmergencia.map((contacto, index) => (
                        <div
                          key={index}
                          className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 hover:bg-slate-800/60 transition-all border border-slate-700"
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <span className="text-3xl">{contacto.icono}</span>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-white">{contacto.area}</h4>
                              <p className="text-xs text-slate-400">{contacto.responsable}</p>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                              contacto.disponibilidad === '24/7'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {contacto.disponibilidad}
                            </span>
                          </div>

                          <div className="space-y-1 pl-11">
                            <a
                              href={`tel:${contacto.telefono}`}
                              className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                              <span>📱</span>
                              <span className="font-semibold">{contacto.telefono}</span>
                            </a>
                            {contacto.extension && (
                              <p className="text-xs text-slate-500">Ext. {contacto.extension}</p>
                            )}
                            <a
                              href={`mailto:${contacto.email}`}
                              className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              <span>✉️</span>
                              <span>{contacto.email}</span>
                            </a>
                          </div>

                          <button className="w-full mt-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2">
                            <span>📞</span>
                            Llamar Ahora
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Botón de emergencia principal */}
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 animate-pulse">
                        <span className="text-2xl">🚨</span>
                        EMERGENCIA 123
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN: REPORTES */}
        {seccionActiva === 'reportes' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">📈</span>
              <div>
                <h2 className="text-2xl font-bold text-white">Reportes y Estadísticas</h2>
                <p className="text-sm text-slate-400">Análisis detallado de accesos y métricas de seguridad</p>
              </div>
            </div>

            <div className="text-center py-20">
              <span className="text-8xl">🚧</span>
              <p className="text-2xl text-slate-400 mt-6 font-semibold">Sección en Desarrollo</p>
              <p className="text-slate-500 mt-2">Próximamente: Reportes detallados, gráficas y análisis históricos</p>
            </div>
          </div>
        )}
      </div>

      {/* CSS personalizado para scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }
      `}</style>
    </div>
  );
}