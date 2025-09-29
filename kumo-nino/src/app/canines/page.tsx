"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dog,
  Edit3,
  Trash2,
  Calendar,
  Shield,
  Activity,
  Save,
  X,
  Eye,
  Clock,
  Award,
  AlertTriangle,
  XCircle,
  Star,
} from "lucide-react";

import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Mock data (mismo usuario del dashboard)
const mockData = {
  client: {
    id: 1,
    nombre: "María González",
    caninos: [
      {
        id: 1,
        nombre: "Max",
        raza: "Golden Retriever",
        edad: "3 años",
        tamaño: "grande",
        foto: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
        notas:
          "Muy sociable, le encanta jugar con otros perros. Necesita ejercicio diario.",
        fecha_registro: "2023-08-15",
        matricula: {
          id: 1,
          plan: "3m",
          transporte: "completo",
          fecha_inicio: "2024-11-01",
          fecha_fin: "2024-02-01",
          estado: "activa",
        },
        asistencias_mes: 18,
        asistencias_total: 45,
        historial_asistencias: [
          {
            fecha: "2024-12-20",
            via_ruta: true,
            ruta: "mañana",
            hora_llegada: "08:30",
            hora_salida: "17:00",
          },
          {
            fecha: "2024-12-19",
            via_ruta: true,
            ruta: "mañana",
            hora_llegada: "08:45",
            hora_salida: "17:15",
          },
          {
            fecha: "2024-12-18",
            via_ruta: false,
            ruta: "ninguna",
            hora_llegada: "09:00",
            hora_salida: "16:30",
          },
        ],
      },
      {
        id: 2,
        nombre: "Luna",
        raza: "Border Collie",
        edad: "2 años",
        tamaño: "mediano",
        foto: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400",
        notas: "Muy inteligente y activa. Le gusta aprender trucos nuevos.",
        fecha_registro: "2023-10-10",
        matricula: {
          id: 2,
          plan: "6m",
          transporte: "mañana",
          fecha_inicio: "2024-10-15",
          fecha_fin: "2025-04-15",
          estado: "activa",
        },
        asistencias_mes: 20,
        asistencias_total: 38,
        historial_asistencias: [
          {
            fecha: "2024-12-20",
            via_ruta: true,
            ruta: "mañana",
            hora_llegada: "08:15",
            hora_salida: "13:00",
          },
          {
            fecha: "2024-12-19",
            via_ruta: true,
            ruta: "mañana",
            hora_llegada: "08:20",
            hora_salida: "13:15",
          },
        ],
      },
      {
        id: 3,
        nombre: "Coco",
        raza: "French Bulldog",
        edad: "4 años",
        tamaño: "pequeño",
        foto: "https://images.pexels.com/photos/1508111/pexels-photo-1508111.jpeg?auto=compress&cs=tinysrgb&w=400",
        notas:
          "Tranquilo y cariñoso. Necesita cuidados especiales por su respiración.",
        fecha_registro: "2024-11-20",
        matricula: {
          id: 3,
          plan: "1m",
          transporte: "ninguno",
          fecha_inicio: "2024-12-01",
          fecha_fin: "2025-01-01",
          estado: "próxima a vencer",
        },
        asistencias_mes: 15,
        asistencias_total: 22,
        historial_asistencias: [
          {
            fecha: "2024-12-20",
            via_ruta: false,
            ruta: "ninguna",
            hora_llegada: "10:00",
            hora_salida: "15:00",
          },
        ],
      },
    ],
  },
};

const PetsPage: React.FC = () => {
  const [selectedPet, setSelectedPet] = useState<canine | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<canine>({} as canine);

  const getSizeIcon = (tamaño: string) => {
    switch (tamaño) {
      case "mini":
        return <Dog className="w-3 h-3" style={{ color: "#D9B778" }} />;
      case "pequeño":
        return <Dog className="w-4 h-4" style={{ color: "#D9B778" }} />;
      case "mediano":
        return <Dog className="w-5 h-5" style={{ color: "#D9B778" }} />;
      case "grande":
        return <Dog className="w-6 h-6" style={{ color: "#D9B778" }} />;
      default:
        return <Dog className="w-4 h-4" style={{ color: "#D9B778" }} />;
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "activa":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "próxima a vencer":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "vencida":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "activa":
        return <Shield className="w-4 h-4 text-emerald-600" />;
      case "próxima a vencer":
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case "vencida":
        return <XCircle className="w-4 h-4 text-rose-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-600" />;
    }
  };

  type canine = {
    id: number;
    nombre: string;
    raza: string;
    edad: string;
    tamaño: string;
    foto: string;
    notas: string;
    fecha_registro: string;
    matricula: {
      id: number;
      plan: string;
      transporte: string;
      fecha_inicio: string;
      fecha_fin: string;
      estado: string;
    };
    asistencias_mes: number;
    asistencias_total: number;
    historial_asistencias: {
      fecha: string;
      via_ruta: boolean;
      ruta: string;
      hora_llegada: string;
      hora_salida: string;
    }[];
  };

  const handleEdit = (pet: canine) => {
    setEditForm({ ...pet });
    setIsEditing(true);
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    setIsEditing(false);
    setEditForm({} as canine);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({} as canine);  
  };

  const handleDelete = (petId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")) {
      // Aquí iría la lógica para eliminar
      console.log("Eliminar mascota:", petId);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F6F1E9" }}>
      {/* Header */}

      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lista de mascotas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockData.client.caninos.map((canino) => (
            <div
              key={canino.id}
              className="rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: "white", borderColor: "#EADDC8" }}
            >
              <div className="relative">
                <Image
                  src="/dog.jpg"
                  alt={canino.nombre}
                  className="w-full h-48 object-cover"
                  width={400}
                  height={300}
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(canino)}
                    className="p-2 rounded-full shadow-sm transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: "white" }}
                  >
                    <Edit3 className="w-4 h-4" style={{ color: "#D9B778" }} />
                  </button>
                  <button
                    onClick={() => handleDelete(canino.id)}
                    className="p-2 rounded-full shadow-sm transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: "white" }}
                  >
                    <Trash2 className="w-4 h-4" style={{ color: "#B5B5B5" }} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getSizeIcon(canino.tamaño)}
                    <h3
                      className="text-xl font-bold"
                      style={{ color: "#302F2C" }}
                    >
                      {canino.nombre}
                    </h3>
                  </div>
                  <div
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      canino.matricula.estado
                    )}`}
                  >
                    {canino.matricula.estado}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p
                    className="text-sm flex items-center"
                    style={{ color: "#CBB89D" }}
                  >
                    <Award className="w-3 h-3 mr-2" />
                    {canino.raza} • {canino.edad} • {canino.tamaño}
                  </p>
                  <p
                    className="text-sm flex items-center"
                    style={{ color: "#CBB89D" }}
                  >
                    <Calendar className="w-3 h-3 mr-2" />
                    Registrado:{" "}
                    {new Date(canino.fecha_registro).toLocaleDateString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div
                    className="text-center p-2 rounded-lg"
                    style={{ backgroundColor: "#F6F1E9" }}
                  >
                    <p className="text-xs" style={{ color: "#CBB89D" }}>
                      Este mes
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: "#7FA087" }}
                    >
                      {canino.asistencias_mes}
                    </p>
                  </div>
                  <div
                    className="text-center p-2 rounded-lg"
                    style={{ backgroundColor: "#F6F1E9" }}
                  >
                    <p className="text-xs" style={{ color: "#CBB89D" }}>
                      Total
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: "#D9B778" }}
                    >
                      {canino.asistencias_total}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPet(canino)}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: "#EADDC8", color: "#302F2C" }}
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Detalles</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de detalles */}
        {selectedPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{ backgroundColor: "white" }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {getSizeIcon(selectedPet.tamaño)}
                    <h2
                      className="text-2xl font-bold"
                      style={{ color: "#302F2C" }}
                    >
                      {selectedPet.nombre}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedPet(null)}
                    className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: "#F6F1E9" }}
                  >
                    <X className="w-5 h-5" style={{ color: "#302F2C" }} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Información básica */}
                  <div>
                    <Image
                      src="/dog.jpg"
                      alt={selectedPet.nombre}
                      className="w-full h-64 object-cover rounded-xl mb-4"
                      width={400}
                      height={300}
                    />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#CBB89D" }}
                        >
                          Raza:
                        </span>
                        <span className="text-sm" style={{ color: "#302F2C" }}>
                          {selectedPet.raza}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#CBB89D" }}
                        >
                          Edad:
                        </span>
                        <span className="text-sm" style={{ color: "#302F2C" }}>
                          {selectedPet.edad}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#CBB89D" }}
                        >
                          Tamaño:
                        </span>
                        <span className="text-sm" style={{ color: "#302F2C" }}>
                          {selectedPet.tamaño}
                        </span>
                      </div>
                    </div>

                    {selectedPet.notas && (
                      <div
                        className="mt-4 p-4 rounded-lg"
                        style={{ backgroundColor: "#F6F1E9" }}
                      >
                        <h4
                          className="text-sm font-medium mb-2"
                          style={{ color: "#302F2C" }}
                        >
                          Notas:
                        </h4>
                        <p className="text-sm" style={{ color: "#CBB89D" }}>
                          {selectedPet.notas}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Matrícula y asistencias */}
                  <div className="space-y-6">
                    {/* Estado de matrícula */}
                    <div
                      className="p-4 rounded-xl border"
                      style={{
                        backgroundColor: "#EADDC8",
                        borderColor: "#CBB89D",
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4
                          className="text-lg font-semibold"
                          style={{ color: "#302F2C" }}
                        >
                          Matrícula Activa
                        </h4>
                        {getStatusIcon(selectedPet.matricula.estado)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span
                            className="text-sm"
                            style={{ color: "#CBB89D" }}
                          >
                            Plan:
                          </span>
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#302F2C" }}
                          >
                            {selectedPet.matricula.plan}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span
                            className="text-sm"
                            style={{ color: "#CBB89D" }}
                          >
                            Transporte:
                          </span>
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#302F2C" }}
                          >
                            {selectedPet.matricula.transporte}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span
                            className="text-sm"
                            style={{ color: "#CBB89D" }}
                          >
                            Inicio:
                          </span>
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#302F2C" }}
                          >
                            {new Date(
                              selectedPet.matricula.fecha_inicio
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span
                            className="text-sm"
                            style={{ color: "#CBB89D" }}
                          >
                            Vence:
                          </span>
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#302F2C" }}
                          >
                            {new Date(
                              selectedPet.matricula.fecha_fin
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className="text-center p-4 rounded-xl"
                        style={{ backgroundColor: "#F6F1E9" }}
                      >
                        <Activity
                          className="w-6 h-6 mx-auto mb-2"
                          style={{ color: "#7FA087" }}
                        />
                        <p
                          className="text-2xl font-bold"
                          style={{ color: "#302F2C" }}
                        >
                          {selectedPet.asistencias_mes}
                        </p>
                        <p className="text-xs" style={{ color: "#CBB89D" }}>
                          Este mes
                        </p>
                      </div>
                      <div
                        className="text-center p-4 rounded-xl"
                        style={{ backgroundColor: "#F6F1E9" }}
                      >
                        <Star
                          className="w-6 h-6 mx-auto mb-2"
                          style={{ color: "#D9B778" }}
                        />
                        <p
                          className="text-2xl font-bold"
                          style={{ color: "#302F2C" }}
                        >
                          {selectedPet.asistencias_total}
                        </p>
                        <p className="text-xs" style={{ color: "#CBB89D" }}>
                          Total
                        </p>
                      </div>
                    </div>

                    {/* Historial reciente */}
                    <div>
                      <h4
                        className="text-lg font-semibold mb-3"
                        style={{ color: "#302F2C" }}
                      >
                        Historial Reciente
                      </h4>
                      <div className="space-y-2">
                        {selectedPet.historial_asistencias
                          .slice(0, 3)
                          .map((asistencia, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg"
                              style={{ backgroundColor: "#F6F1E9" }}
                            >
                              <div className="flex items-center space-x-2">
                                <Calendar
                                  className="w-4 h-4"
                                  style={{ color: "#D9B778" }}
                                />
                                <span
                                  className="text-sm"
                                  style={{ color: "#302F2C" }}
                                >
                                  {new Date(
                                    asistencia.fecha
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock
                                  className="w-4 h-4"
                                  style={{ color: "#CBB89D" }}
                                />
                                <span
                                  className="text-sm"
                                  style={{ color: "#302F2C" }}
                                >
                                  {asistencia.hora_llegada} -{" "}
                                  {asistencia.hora_salida}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de edición */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className="max-w-2xl w-full rounded-2xl p-6"
              style={{ backgroundColor: "white" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "#302F2C" }}>
                  Editar {editForm.nombre}
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: "#F6F1E9" }}
                >
                  <X className="w-5 h-5" style={{ color: "#302F2C" }} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#302F2C" }}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={editForm.nombre || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, nombre: e.target.value })
                    }
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "#EADDC8",
                      backgroundColor: "#F6F1E9", 
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#302F2C" }}
                    >
                      Raza
                    </label>
                    <input
                      type="text"
                      value={editForm.raza || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, raza: e.target.value })
                      }
                      className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "#EADDC8",
                        backgroundColor: "#F6F1E9",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#302F2C" }}
                    >
                      Edad
                    </label>
                    <input
                      type="text"
                      value={editForm.edad || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, edad: e.target.value })
                      }
                      className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "#EADDC8",
                        backgroundColor: "#F6F1E9",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#302F2C" }}
                  >
                    Tamaño
                  </label>
                  <select
                    value={editForm.tamaño || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, tamaño: e.target.value })
                    }
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "#EADDC8",
                      backgroundColor: "#F6F1E9",
                    }}
                  >
                    <option value="mini">Mini</option>
                    <option value="pequeño">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#302F2C" }}
                  >
                    Notas
                  </label>
                  <textarea
                    value={editForm.notas || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, notas: e.target.value })
                    }
                    rows={3}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "#EADDC8",
                      backgroundColor: "#F6F1E9",
                    }}
                    placeholder="Comportamiento, salud, preferencias..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: "#7FA087", color: "white" }}
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: "#B5B5B5", color: "white" }}
                  >
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PetsPage;
