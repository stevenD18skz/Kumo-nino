"use client";

import React, { useState } from "react";

import {
  Dog,
  Award,
  TrendingUp,
  Activity,
  Timer,
  Star,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Heart,
  Zap,
  Target,
  BarChart3,
} from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// registrar módulos necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockCaninos = [
  {
    id: 1,
    nombre: "Max",
    raza: "Golden Retriever",
    edad: "3 años",
    tamaño: "grande",
    dueño_id: 1,
    plan_id: 1,
    notas: "Muy sociable, le encanta jugar con otros perros",
    fecha_registro: "2024-01-15",
    foto: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 2,
    nombre: "Luna",
    raza: "Border Collie",
    edad: "2 años",
    tamaño: "mediano",
    dueño_id: 1,
    plan_id: 2,
    notas: "Muy inteligente, necesita estimulación mental",
    fecha_registro: "2024-02-20",
    foto: "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: 3,
    nombre: "Coco",
    raza: "French Bulldog",
    edad: "1 año",
    tamaño: "pequeño",
    dueño_id: 1,
    plan_id: 3,
    notas: "Tranquilo, ideal para apartamento",
    fecha_registro: "2024-03-10",
    foto: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
];

const mockMatriculas = [
  {
    id: 1,
    canino_id: 1,
    plan: "6m",
    transporte: "completo",
    fecha_inicio: "2024-01-15",
    fecha_fin: "2024-07-15",
    estado: "activa",
  },
  {
    id: 2,
    canino_id: 2,
    plan: "3m",
    transporte: "mañana",
    fecha_inicio: "2024-02-20",
    fecha_fin: "2024-05-20",
    estado: "próxima a vencer",
  },
  {
    id: 3,
    canino_id: 3,
    plan: "1m",
    transporte: "ninguno",
    fecha_inicio: "2024-02-10",
    fecha_fin: "2024-03-10",
    estado: "vencida",
  },
];

const mockAsistencias = [
  {
    id: 1,
    canino_id: 1,
    fecha: "2024-03-16",
    via_ruta: true,
    ruta: "mañana",
    hora_llegada: "08:30",
    hora_salida: "17:00",
    despacho_por_ruta: true,
  },
  {
    id: 2,
    canino_id: 1,
    fecha: "2024-03-17",
    via_ruta: true,
    ruta: "mañana",
    hora_llegada: "08:45",
    hora_salida: "17:15",
    despacho_por_ruta: true,
  },
  {
    id: 3,
    canino_id: 2,
    fecha: "2024-03-21",
    via_ruta: true,
    ruta: "mañana",
    hora_llegada: "08:20",
    hora_salida: "13:00",
    despacho_por_ruta: false,
  },
  {
    id: 4,
    canino_id: 1,
    fecha: "2024-03-18",
    via_ruta: false,
    ruta: "ninguna",
    hora_llegada: "09:00",
    hora_salida: "16:30",
    despacho_por_ruta: false,
  },
  {
    id: 5,
    canino_id: 3,
    fecha: "2024-03-11",
    via_ruta: false,
    ruta: "ninguna",
    hora_llegada: "10:00",
    hora_salida: "15:00",
    despacho_por_ruta: false,
  },
  {
    id: 6,
    canino_id: 3,
    fecha: "2024-03-11",
    via_ruta: false,
    ruta: "ninguna",
    hora_llegada: "10:00",
    hora_salida: "15:00",
    despacho_por_ruta: false,
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activa":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "próxima a vencer":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "vencida":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "activa":
        return <CheckCircle className="w-4 h-4" />;
      case "próxima a vencer":
        return <Clock className="w-4 h-4" />;
      case "vencida":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  // Calcular estadísticas
  const totalAsistencias = mockAsistencias.length;
  const asistenciasEsteMes = mockAsistencias.filter(
    (a) => new Date(a.fecha).getMonth() === new Date().getMonth()
  ).length;
  const diasActivosEsteMes = new Set(
    mockAsistencias
      .filter((a) => new Date(a.fecha).getMonth() === new Date().getMonth())
      .map((a) => a.fecha)
  ).size;
  const promedioAsistenciasPorDia =
    diasActivosEsteMes > 0
      ? (asistenciasEsteMes / diasActivosEsteMes).toFixed(1)
      : "0";
  const promedioAsistenciasPorPerrito = (
    totalAsistencias / mockCaninos.length
  ).toFixed(1);
  const porcentajeDiasActividad = ((diasActivosEsteMes / 30) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F1E9] to-[#EADDC8]">
      {/* Header */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#302F2C]/70">
                  Total Asistencias
                </p>
                <p className="text-2xl font-bold text-[#302F2C]">
                  {totalAsistencias}
                </p>
              </div>
              <div className="bg-[#7FA087]/10 p-3 rounded-xl">
                <Activity className="w-6 h-6 text-[#7FA087]" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#302F2C]/70">
                  Promedio por Día
                </p>
                <p className="text-2xl font-bold text-[#302F2C]">
                  {promedioAsistenciasPorDia}
                </p>
              </div>
              <div className="bg-[#D9B778]/10 p-3 rounded-xl">
                <Target className="w-6 h-6 text-[#D9B778]" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#302F2C]/70">
                  Días Activos
                </p>
                <p className="text-2xl font-bold text-[#302F2C]">
                  {diasActivosEsteMes}
                </p>
              </div>
              <div className="bg-[#CBB89D]/10 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-[#CBB89D]" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#302F2C]/70">
                  % Actividad
                </p>
                <p className="text-2xl font-bold text-[#302F2C]">
                  {porcentajeDiasActividad}%
                </p>
              </div>
              <div className="bg-[#7FA087]/10 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-[#7FA087]" />
              </div>
            </div>
          </div>
        </div>

        {/* Estado de Matrículas */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#302F2C] mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Estado de Matrículas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockMatriculas.map((matricula) => {
              const canino = mockCaninos.find(
                (c) => c.id === matricula.canino_id
              );
              return (
                <div
                  key={matricula.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[#302F2C]">
                      {canino?.nombre}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getEstadoColor(
                        matricula.estado
                      )}`}
                    >
                      {getEstadoIcon(matricula.estado)}
                      {matricula.estado}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-[#302F2C]/70">
                    <div className="flex items-center">
                      <Timer className="w-4 h-4 mr-2" />
                      Plan: {matricula.plan}
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Transporte: {matricula.transporte}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Hasta:{" "}
                      {new Date(matricula.fecha_fin).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Información de Mascotas */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#302F2C] mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Mis Mascotas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCaninos.map((canino) => {
              const matricula = mockMatriculas.find(
                (m) => m.canino_id === canino.id
              );
              const asistenciasCanino = mockAsistencias.filter(
                (a) => a.canino_id === canino.id
              ).length;

              return (
                <div
                  key={canino.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={canino.foto}
                      alt={canino.nombre}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-[#302F2C]">
                        {canino.nombre}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getEstadoColor(
                          matricula?.estado || "sin plan"
                        )}`}
                      >
                        {matricula?.estado || "Sin plan"}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-[#302F2C]/70 mb-4">
                      <div className="flex items-center">
                        <Dog className="w-4 h-4 mr-2" />
                        {canino.raza} • {canino.edad}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Tamaño: {canino.tamaño}
                      </div>
                      <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        {asistenciasCanino} asistencias
                      </div>
                    </div>
                    <p className="text-xs text-[#302F2C]/60 italic">
                      {canino.notas}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gráfico de Asistencias */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#302F2C] mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Historial de Asistencias - Marzo 2024
          </h2>
          <div className="h-64">
            <Bar
              data={{
                labels: Array.from({ length: 31 }, (_, i) => i + 1),
                datasets: [
                  {
                    label: "Asistencias",
                    data: Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1;
                      return mockAsistencias.filter(
                        (a) =>
                          new Date(a.fecha).getDate() === day &&
                          new Date(a.fecha).getMonth() === 2
                      ).length;
                    }),
                    backgroundColor: "#7FA087",
                    borderRadius: 4,
                    barPercentage: 0.7,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "#302F2C",
                    titleColor: "#F6F1E9",
                    bodyColor: "#F6F1E9",
                    displayColors: false,
                    callbacks: {
                      label: (ctx) =>
                        `${ctx.parsed.y} asistencia${
                          ctx.parsed.y === 1 ? "" : "s"
                        }`,
                    },
                  },
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: {
                      color: "#302F2C",
                      font: { size: 10 },
                    },
                  },
                  y: {
                    beginAtZero: true,
                    grid: { color: "#CBB89D40" },
                    ticks: {
                      color: "#302F2C",
                      font: { size: 10 },
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
