'use client';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function ReportesPage() {
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  

  // Datos de ejemplo
  const stats = {
    ingresos: { total: 342, cambio: +12.5 },
    salidas: { total: 318, cambio: +8.3 },
    alarmas: { total: 7, cambio: -15.2 },
    activos: { total: 24, cambio: +3.1 }
  };

  const recentEvents = [
    { id: 1, tipo: 'Ingreso', usuario: 'Carlos Mendez', zona: 'ENTRY-A', hora: '14:23:15', estado: 'autorizado', badge: 'A-2341' },
    { id: 2, tipo: 'Alarma', usuario: 'Sistema', zona: 'Zona 3-B', hora: '14:18:42', estado: 'resuelto', badge: 'N/A' },
    { id: 3, tipo: 'Salida', usuario: 'Ana Torres', zona: 'ENTRY-B', hora: '14:15:30', estado: 'autorizado', badge: 'A-1892' },
    { id: 4, tipo: 'Ingreso', usuario: 'Roberto Silva', zona: 'ENTRY-C', hora: '14:12:05', estado: 'autorizado', badge: 'A-3421' },
    { id: 5, tipo: 'Alarma', usuario: 'Sistema', zona: 'Perímetro Norte', hora: '14:08:22', estado: 'activo', badge: 'N/A' },
    { id: 6, tipo: 'Salida', usuario: 'María González', zona: 'ENTRY-A', hora: '14:05:18', estado: 'autorizado', badge: 'A-2108' },
    { id: 7, tipo: 'Ingreso', usuario: 'Luis Ramírez', zona: 'ENTRY-B', hora: '13:58:45', estado: 'autorizado', badge: 'A-2876' },
    { id: 8, tipo: 'Ingreso', usuario: 'Patricia Ruiz', zona: 'ENTRY-A', hora: '13:52:33', estado: 'denegado', badge: 'A-9999' },
  ];

  const handleExport = (format: string) => {
    console.log(`Exportando a ${format}...`);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 mb-2">
                CENTRO DE REPORTES
              </h1>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-cyan-400 font-mono">ANÁLISIS DE SEGURIDAD</span>
                <span className="text-slate-700">|</span>
                <span className="text-slate-400 font-mono">TIEMPO REAL</span>
                <span className="text-slate-700">|</span>
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-green-400 font-mono text-xs">ONLINE</span>
                </div>
              </div>
            </div>
            
            {/* Export buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/40 rounded-lg transition-all group"
              >
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-mono text-red-400 group-hover:text-red-300">PDF</span>
              </button>
              
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 border border-green-500/40 rounded-lg transition-all group"
              >
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-mono text-green-400 group-hover:text-green-300">EXCEL</span>
              </button>
              
              <button
                onClick={() => handleExport('csv')}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 rounded-lg transition-all group"
              >
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xs font-mono text-cyan-400 group-hover:text-cyan-300">CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Ingresos */}
          <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6 overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded ${stats.ingresos.cambio > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {stats.ingresos.cambio > 0 ? '+' : ''}{stats.ingresos.cambio}%
                </span>
              </div>
              <h3 className="text-sm font-mono text-slate-400 mb-2">INGRESOS</h3>
              <p className="text-3xl font-bold text-white mb-1">{stats.ingresos.total}</p>
              <p className="text-xs text-slate-500 font-mono">Últimas 24 horas</p>
            </div>
          </div>

          {/* Salidas */}
          <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-black/90 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 overflow-hidden group hover:border-blue-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded ${stats.salidas.cambio > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {stats.salidas.cambio > 0 ? '+' : ''}{stats.salidas.cambio}%
                </span>
              </div>
              <h3 className="text-sm font-mono text-slate-400 mb-2">SALIDAS</h3>
              <p className="text-3xl font-bold text-white mb-1">{stats.salidas.total}</p>
              <p className="text-xs text-slate-500 font-mono">Últimas 24 horas</p>
            </div>
          </div>

          {/* Alarmas */}
          <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-black/90 backdrop-blur-xl border border-red-500/30 rounded-xl p-6 overflow-hidden group hover:border-red-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-radial from-red-500/5 via-transparent to-transparent"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded ${stats.alarmas.cambio > 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {stats.alarmas.cambio > 0 ? '+' : ''}{stats.alarmas.cambio}%
                </span>
              </div>
              <h3 className="text-sm font-mono text-slate-400 mb-2">ALARMAS</h3>
              <p className="text-3xl font-bold text-white mb-1">{stats.alarmas.total}</p>
              <p className="text-xs text-slate-500 font-mono">Últimas 24 horas</p>
            </div>
          </div>

          {/* Activos en Instalaciones */}
          <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-black/90 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6 overflow-hidden group hover:border-purple-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded ${stats.activos.cambio > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {stats.activos.cambio > 0 ? '+' : ''}{stats.activos.cambio}%
                </span>
              </div>
              <h3 className="text-sm font-mono text-slate-400 mb-2">PERSONAL ACTIVO</h3>
              <p className="text-3xl font-bold text-white mb-1">{stats.activos.total}</p>
              <p className="text-xs text-slate-500 font-mono">En este momento</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Time Filter */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-cyan-400 tracking-wider font-mono mb-2">
                PERÍODO DE TIEMPO
              </label>
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500 transition-all"
              >
                <option value="today">Hoy</option>
                <option value="yesterday">Ayer</option>
                <option value="week">Última semana</option>
                <option value="month">Último mes</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-cyan-400 tracking-wider font-mono mb-2">
                TIPO DE EVENTO
              </label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500 transition-all"
              >
                <option value="all">Todos los eventos</option>
                <option value="ingreso">Solo Ingresos</option>
                <option value="salida">Solo Salidas</option>
                <option value="alarma">Solo Alarmas</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-cyan-400 tracking-wider font-mono mb-2">
                BUSCAR
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Usuario, zona, badge..."
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-cyan-500 transition-all"
                />
                <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex items-end">
              <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-mono text-sm font-bold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/30 whitespace-nowrap">
                APLICAR
              </button>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-slate-800/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-cyan-400 font-mono">REGISTRO DE EVENTOS</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Actualizando cada 5 segundos</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 tracking-wider font-mono">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 tracking-wider font-mono">TIPO</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 tracking-wider font-mono">USUARIO</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 tracking-wider font-mono">BADGE</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 tracking-wider font-mono">ZONA</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 tracking-wider font-mono">HORA</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 tracking-wider font-mono">ESTADO</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 tracking-wider font-mono">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {recentEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-400 font-mono">#{event.id.toString().padStart(4, '0')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        event.tipo === 'Ingreso' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                        event.tipo === 'Salida' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {event.tipo === 'Ingreso' && '→'}
                        {event.tipo === 'Salida' && '←'}
                        {event.tipo === 'Alarma' && '⚠'}
                        {event.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white font-mono">{event.usuario}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400 font-mono">{event.badge}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-cyan-400 font-mono">{event.zona}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-300 font-mono">{event.hora}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        event.estado === 'autorizado' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        event.estado === 'denegado' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        event.estado === 'resuelto' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                      }`}>
                        {event.estado.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors group/btn border border-transparent hover:border-cyan-500/30">
                        <svg className="w-4 h-4 text-slate-400 group-hover/btn:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-6 border-t border-slate-800/50 flex items-center justify-between">
            <span className="text-sm text-slate-400 font-mono">
              Mostrando 8 de 342 eventos
            </span>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                Anterior
              </button>
              <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 rounded-lg text-sm font-mono text-cyan-400 font-bold">
                1
              </button>
              <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                2
              </button>
              <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                3
              </button>
              <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}