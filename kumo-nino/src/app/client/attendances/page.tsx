"use client";

import React, { useState } from "react";
import {
  Activity,
  Calendar,
  Clock,
  Dog,
  Filter,
  Download,
  TrendingUp,
  Star,
  BarChart3,
  ChevronDown,
  CheckCircle,
  Timer,
} from "lucide-react";

// Mock data para asistencias
const mockAttendanceData = {
  summary: {
    thisMonth: 18,
    lastAttendance: "2024-12-20",
    thisYear: 156,
    averagePerWeek: 4.2,
  },
  monthlyData: [
    { day: 1, count: 1 },
    { day: 2, count: 0 },
    { day: 3, count: 1 },
    { day: 4, count: 1 },
    { day: 5, count: 1 },
    { day: 6, count: 0 },
    { day: 7, count: 0 },
    { day: 8, count: 1 },
    { day: 9, count: 1 },
    { day: 10, count: 1 },
    { day: 11, count: 1 },
    { day: 12, count: 0 },
    { day: 13, count: 0 },
    { day: 14, count: 1 },
    { day: 15, count: 1 },
    { day: 16, count: 1 },
    { day: 17, count: 1 },
    { day: 18, count: 1 },
    { day: 19, count: 0 },
    { day: 20, count: 1 },
    { day: 21, count: 0 },
    { day: 22, count: 1 },
    { day: 23, count: 1 },
    { day: 24, count: 0 },
    { day: 25, count: 0 },
    { day: 26, count: 1 },
    { day: 27, count: 1 },
    { day: 28, count: 1 },
    { day: 29, count: 1 },
    { day: 30, count: 1 },
    { day: 31, count: 0 },
  ],
  attendanceRecords: [
    {
      id: 1,
      fecha: "2024-12-20",
      canino: "Max",
      hora_llegada: "08:30",
      hora_salida: "17:00",
      transporte: true,
      ruta: "mañana",
      estado: "completado",
    },
    {
      id: 2,
      fecha: "2024-12-19",
      canino: "Max",
      hora_llegada: "08:45",
      hora_salida: "17:15",
      transporte: true,
      ruta: "mañana",
      estado: "completado",
    },
    {
      id: 3,
      fecha: "2024-12-18",
      canino: "Luna",
      hora_llegada: "08:20",
      hora_salida: "13:00",
      transporte: true,
      ruta: "mañana",
      estado: "completado",
    },
    {
      id: 4,
      fecha: "2024-12-17",
      canino: "Max",
      hora_llegada: "09:00",
      hora_salida: "16:30",
      transporte: false,
      ruta: "ninguna",
      estado: "completado",
    },
    {
      id: 5,
      fecha: "2024-12-16",
      canino: "Coco",
      hora_llegada: "10:00",
      hora_salida: "15:00",
      transporte: false,
      ruta: "ninguna",
      estado: "completado",
    },
    {
      id: 6,
      fecha: "2024-12-15",
      canino: "Luna",
      hora_llegada: "08:30",
      hora_salida: "13:15",
      transporte: true,
      ruta: "mañana",
      estado: "completado",
    },
    {
      id: 7,
      fecha: "2024-12-14",
      canino: "Max",
      hora_llegada: "08:40",
      hora_salida: "17:10",
      transporte: true,
      ruta: "mañana",
      estado: "completado",
    },
    {
      id: 8,
      fecha: "2024-12-13",
      canino: "Coco",
      hora_llegada: "09:30",
      hora_salida: "14:45",
      transporte: false,
      ruta: "ninguna",
      estado: "completado",
    },
  ],
  dogs: ["Todos", "Max", "Luna", "Coco"],
};

const AttendancePage: React.FC = () => {
  const [selectedDog, setSelectedDog] = useState("Todos");
  const [selectedMonth, setSelectedMonth] = useState("Diciembre 2024");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRecords = mockAttendanceData.attendanceRecords.filter(
    (record) => selectedDog === "Todos" || record.canino === selectedDog
  );

  const getTransportIcon = (hasTransport: boolean, ruta: string) => {
    if (!hasTransport) return "🚶";
    switch (ruta) {
      case "mañana":
        return "🌅";
      case "tarde":
        return "🌇";
      default:
        return "🚌";
    }
  };

  const maxCount = Math.max(
    ...mockAttendanceData.monthlyData.map((d) => d.count)
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F6F1E9" }}>
      {/* Header */}
      <div
        className="py-8 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#EADDC8" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Activity className="w-8 h-8" style={{ color: "#D9B778" }} />
                <h1 className="text-3xl font-bold" style={{ color: "#302F2C" }}>
                  Historial de Asistencias
                </h1>
              </div>
              <p className="text-lg" style={{ color: "#302F2C" }}>
                Revisa la asistencia de tus mascotas
              </p>
            </div>
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 border"
              style={{
                backgroundColor: "white",
                borderColor: "#CBB89D",
                color: "#302F2C",
              }}
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 border"
                style={{
                  backgroundColor: "white",
                  borderColor: "#CBB89D",
                  color: "#302F2C",
                }}
              >
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <select
              value={selectedDog}
              onChange={(e) => setSelectedDog(e.target.value)}
              className="px-4 py-2 rounded-xl font-medium transition-all duration-300 border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "white",
                borderColor: "#CBB89D",
                color: "#302F2C",
              }}
            >
              {mockAttendanceData.dogs.map((dog) => (
                <option key={dog} value={dog}>
                  {dog}
                </option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 rounded-xl font-medium transition-all duration-300 border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "white",
                borderColor: "#CBB89D",
                color: "#302F2C",
              }}
            >
              <option value="Diciembre 2024">Diciembre 2024</option>
              <option value="Noviembre 2024">Noviembre 2024</option>
              <option value="Octubre 2024">Octubre 2024</option>
            </select>
          </div>
        </div>

        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#CBB89D" }}>
                  Días Este Mes
                </p>
                <p className="text-2xl font-bold" style={{ color: "#302F2C" }}>
                  {mockAttendanceData.summary.thisMonth}
                </p>
              </div>
              <div className="bg-[#7FA087]/10 p-3 rounded-xl">
                <Calendar className="w-6 h-6" style={{ color: "#7FA087" }} />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#CBB89D" }}>
                  Última Asistencia
                </p>
                <p className="text-2xl font-bold" style={{ color: "#302F2C" }}>
                  {new Date(
                    mockAttendanceData.summary.lastAttendance
                  ).getDate()}
                </p>
                <p className="text-xs" style={{ color: "#CBB89D" }}>
                  {new Date(
                    mockAttendanceData.summary.lastAttendance
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-[#D9B778]/10 p-3 rounded-xl">
                <Clock className="w-6 h-6" style={{ color: "#D9B778" }} />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#CBB89D" }}>
                  Total Este Año
                </p>
                <p className="text-2xl font-bold" style={{ color: "#302F2C" }}>
                  {mockAttendanceData.summary.thisYear}
                </p>
              </div>
              <div className="bg-[#CBB89D]/10 p-3 rounded-xl">
                <Star className="w-6 h-6" style={{ color: "#CBB89D" }} />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#CBB89D" }}>
                  Promedio Semanal
                </p>
                <p className="text-2xl font-bold" style={{ color: "#302F2C" }}>
                  {mockAttendanceData.summary.averagePerWeek}
                </p>
              </div>
              <div className="bg-[#7FA087]/10 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6" style={{ color: "#7FA087" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de asistencias */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-xl font-bold flex items-center"
              style={{ color: "#302F2C" }}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Asistencias en {selectedMonth}
            </h3>
            <div
              className="flex items-center space-x-4 text-sm"
              style={{ color: "#CBB89D" }}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#7FA087" }}
                ></div>
                <span>Asistió</span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#EADDC8" }}
                ></div>
                <span>No asistió</span>
              </div>
            </div>
          </div>

          <div className="flex items-end space-x-1 h-48 mb-4">
            {mockAttendanceData.monthlyData.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t transition-all hover:opacity-80 cursor-pointer"
                  style={{
                    height:
                      item.count > 0
                        ? `${(item.count / (maxCount || 1)) * 80 + 20}%`
                        : "8px",
                    backgroundColor: item.count > 0 ? "#7FA087" : "#EADDC8",
                  }}
                  title={`Día ${item.day}: ${
                    item.count > 0 ? "Asistió" : "No asistió"
                  }`}
                ></div>
                <span className="text-xs mt-1" style={{ color: "#CBB89D" }}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabla de registros */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#CBB89D]/20 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#CBB89D]/20">
            <h3
              className="text-xl font-bold flex items-center"
              style={{ color: "#302F2C" }}
            >
              <Activity className="w-5 h-5 mr-2" />
              Registros Detallados
            </h3>
            <p className="text-sm mt-1" style={{ color: "#CBB89D" }}>
              {filteredRecords.length} registros encontrados
            </p>
          </div>

          {filteredRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: "#F6F1E9" }}>
                  <tr>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: "#302F2C" }}
                    >
                      Fecha
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: "#302F2C" }}
                    >
                      Mascota
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: "#302F2C" }}
                    >
                      Llegada
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: "#302F2C" }}
                    >
                      Salida
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: "#302F2C" }}
                    >
                      Transporte
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: "#302F2C" }}
                    >
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="border-t border-[#CBB89D]/10 hover:bg-[#F6F1E9]/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Calendar
                            className="w-4 h-4"
                            style={{ color: "#D9B778" }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#302F2C" }}
                          >
                            {new Date(record.fecha).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Dog
                            className="w-4 h-4"
                            style={{ color: "#7FA087" }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#302F2C" }}
                          >
                            {record.canino}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Timer
                            className="w-4 h-4"
                            style={{ color: "#CBB89D" }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: "#302F2C" }}
                          >
                            {record.hora_llegada}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Timer
                            className="w-4 h-4"
                            style={{ color: "#CBB89D" }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: "#302F2C" }}
                          >
                            {record.hora_salida}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            {getTransportIcon(record.transporte, record.ruta)}
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: "#302F2C" }}
                          >
                            {record.transporte ? record.ruta : "Propio"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3 h-3" />
                          <span>Completado</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Estado vacío */
            <div className="text-center py-16">
              <div className="mb-6">
                <Dog
                  className="w-24 h-24 mx-auto"
                  style={{ color: "#CBB89D" }}
                />
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#302F2C" }}
              >
                No hay registros de asistencia
              </h3>
              <p style={{ color: "#CBB89D" }}>
                {selectedDog === "Todos"
                  ? "Aún no hay registros de asistencia para mostrar"
                  : `No hay registros de asistencia para ${selectedDog}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
