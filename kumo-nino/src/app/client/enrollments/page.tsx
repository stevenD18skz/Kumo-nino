"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Dog,
  CreditCard as Edit3,
  RefreshCw,
  X,
  Plus,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Timer,
  MapPin,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Mock data para matrículas
const mockEnrollments = [
  {
    id: 1,
    canino: {
      id: 1,
      nombre: "Max",
      foto: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    plan: "6m",
    transporte: "completo",
    fecha_inicio: "2024-08-01",
    fecha_fin: "2025-02-01",
    estado: "activa",
    progreso: 65,
    precio: 180000,
    dias_restantes: 45,
  },
  {
    id: 2,
    canino: {
      id: 2,
      nombre: "Luna",
      foto: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    plan: "3m",
    transporte: "mañana",
    fecha_inicio: "2024-10-15",
    fecha_fin: "2025-01-15",
    estado: "próxima a vencer",
    progreso: 85,
    precio: 95000,
    dias_restantes: 12,
  },
  {
    id: 3,
    canino: {
      id: 3,
      nombre: "Coco",
      foto: "https://images.pexels.com/photos/1508111/pexels-photo-1508111.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    plan: "1m",
    transporte: "ninguno",
    fecha_inicio: "2024-11-01",
    fecha_fin: "2024-12-01",
    estado: "vencida",
    progreso: 100,
    precio: 35000,
    dias_restantes: -15,
  },
];

const EnrollmentsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("todas");

  const getStatusColor = (estado: string) => {
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

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "activa":
        return <CheckCircle className="w-4 h-4" />;
      case "próxima a vencer":
        return <AlertTriangle className="w-4 h-4" />;
      case "vencida":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getProgressColor = (estado: string) => {
    switch (estado) {
      case "activa":
        return "#7FA087";
      case "próxima a vencer":
        return "#D9B778";
      case "vencida":
        return "#B5B5B5";
      default:
        return "#CBB89D";
    }
  };

  const getTransportIcon = (transporte: string) => {
    switch (transporte) {
      case "completo":
        return "🚌";
      case "mañana":
        return "🌅";
      case "tarde":
        return "🌇";
      case "ninguno":
        return "🚶";
      default:
        return "📍";
    }
  };

  const filteredEnrollments = mockEnrollments.filter((enrollment) => {
    if (activeFilter === "todas") return true;
    if (activeFilter === "activas") return enrollment.estado === "activa";
    if (activeFilter === "por-vencer")
      return enrollment.estado === "próxima a vencer";
    if (activeFilter === "vencidas") return enrollment.estado === "vencida";
    return true;
  });

  const filterOptions = [
    { id: "todas", label: "Todas", count: mockEnrollments.length },
    {
      id: "activas",
      label: "Activas",
      count: mockEnrollments.filter((e) => e.estado === "activa").length,
    },
    {
      id: "por-vencer",
      label: "Por Vencer",
      count: mockEnrollments.filter((e) => e.estado === "próxima a vencer")
        .length,
    },
    {
      id: "vencidas",
      label: "Vencidas",
      count: mockEnrollments.filter((e) => e.estado === "vencida").length,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F6F1E9" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="mb-8">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-2xl p-2 border border-[#CBB89D]/20 shadow-sm w-fit">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeFilter === option.id
                    ? "text-white shadow-md"
                    : "hover:bg-[#CBB89D]/20"
                }`}
                style={{
                  backgroundColor:
                    activeFilter === option.id ? "#D9B778" : "transparent",
                  color: activeFilter === option.id ? "white" : "#302F2C",
                }}
              >
                <span>{option.label}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    activeFilter === option.id
                      ? "bg-white/20 text-white"
                      : "bg-[#CBB89D]/20 text-[#302F2C]"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Matrículas */}
        {filteredEnrollments.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEnrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Header con foto y nombre */}
                <div className="p-6 pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src="/dog.jpg"
                      width={256}
                      height={256}
                      alt={enrollment.canino.nombre}
                      className="w-16 h-16 rounded-full object-cover border-4"
                      style={{ borderColor: "#EADDC8" }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className="text-xl font-bold"
                          style={{ color: "#302F2C" }}
                        >
                          {enrollment.canino.nombre}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(
                            enrollment.estado
                          )}`}
                        >
                          {getStatusIcon(enrollment.estado)}
                          {enrollment.estado}
                        </span>
                      </div>
                      <p className="text-sm mt-1" style={{ color: "#CBB89D" }}>
                        Plan {enrollment.plan} • $
                        {enrollment.precio.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Detalles del plan */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4" style={{ color: "#D9B778" }} />
                      <div>
                        <p className="text-xs" style={{ color: "#CBB89D" }}>
                          Plan
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#302F2C" }}
                        >
                          {enrollment.plan}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin
                        className="w-4 h-4"
                        style={{ color: "#D9B778" }}
                      />
                      <div>
                        <p className="text-xs" style={{ color: "#CBB89D" }}>
                          Transporte
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#302F2C" }}
                        >
                          {getTransportIcon(enrollment.transporte)}{" "}
                          {enrollment.transporte}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar
                        className="w-4 h-4"
                        style={{ color: "#D9B778" }}
                      />
                      <div>
                        <p className="text-xs" style={{ color: "#CBB89D" }}>
                          Inicio
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#302F2C" }}
                        >
                          {new Date(
                            enrollment.fecha_inicio
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" style={{ color: "#D9B778" }} />
                      <div>
                        <p className="text-xs" style={{ color: "#CBB89D" }}>
                          Vence
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#302F2C" }}
                        >
                          {new Date(enrollment.fecha_fin).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#302F2C" }}
                      >
                        Progreso del plan
                      </span>
                      <span className="text-sm" style={{ color: "#CBB89D" }}>
                        {enrollment.progreso}%
                      </span>
                    </div>
                    <div className="w-full bg-[#EADDC8] rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${enrollment.progreso}%`,
                          backgroundColor: getProgressColor(enrollment.estado),
                        }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1" style={{ color: "#CBB89D" }}>
                      {enrollment.dias_restantes > 0
                        ? `${enrollment.dias_restantes} días restantes`
                        : `Vencida hace ${Math.abs(
                            enrollment.dias_restantes
                          )} días`}
                    </p>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex space-x-3">
                    <button
                      className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: "#7FA087", color: "white" }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Renovar</span>
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: "#D9B778", color: "white" }}
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                    <button
                      className="flex items-center justify-center p-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: "#B5B5B5", color: "white" }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Estado vacío */
          <div className="text-center py-16">
            <div className="mb-6">
              <Dog className="w-24 h-24 mx-auto" style={{ color: "#CBB89D" }} />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#302F2C" }}
            >
              No hay matrículas para mostrar
            </h3>
            <p className="mb-6" style={{ color: "#CBB89D" }}>
              {activeFilter === "todas"
                ? "Aún no tienes matrículas registradas"
                : `No tienes matrículas ${
                    activeFilter === "activas"
                      ? "activas"
                      : activeFilter === "por-vencer"
                      ? "próximas a vencer"
                      : "vencidas"
                  }`}
            </p>
            <button
              onClick={() => console.log("Crear nueva matrícula")}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-sm"
              style={{ backgroundColor: "#7FA087", color: "white" }}
            >
              <Plus className="w-5 h-5" />
              <span>Crear Primera Matrícula</span>
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EnrollmentsPage;
