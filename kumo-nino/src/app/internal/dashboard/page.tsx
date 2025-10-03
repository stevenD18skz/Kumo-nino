"use client";
import React, { useState } from "react";
import {
  Dog,
  Users,
  Award,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  DollarSign,
  Clock,
  MapPin,
  Settings,
  Bell,
  User,
  Menu,
  Home,
  UserCheck,
  FileText,
  ChevronDown,
  Eye,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

// Mock data para el dashboard interno
const mockInternalData = {
  kpis: {
    activeClients: 156,
    enrolledDogs: 234,
    activeEnrollments: 189,
    todayAttendances: 87,
  },
  enrollmentsByPlan: [
    { plan: "1m", count: 45, color: "#D9B778" },
    { plan: "3m", count: 78, color: "#7FA087" },
    { plan: "6m", count: 52, color: "#CBB89D" },
    { plan: "12m", count: 14, color: "#B5B5B5" },
  ],
  weeklyAttendance: [
    { day: "Lun", count: 82 },
    { day: "Mar", count: 89 },
    { day: "Mié", count: 76 },
    { day: "Jue", count: 91 },
    { day: "Vie", count: 87 },
    { day: "Sáb", count: 45 },
    { day: "Dom", count: 23 },
  ],
  dogsBySize: [
    { size: "Mini", count: 34, percentage: 15 },
    { size: "Pequeño", count: 89, percentage: 38 },
    { size: "Mediano", count: 76, percentage: 32 },
    { size: "Grande", count: 35, percentage: 15 },
  ],
  monthlyIncome: [
    { month: "Ene", amount: 45000 },
    { month: "Feb", amount: 52000 },
    { month: "Mar", amount: 48000 },
    { month: "Abr", amount: 58000 },
    { month: "May", amount: 61000 },
    { month: "Jun", amount: 55000 },
  ],
  recentClients: [
    {
      id: 1,
      name: "Ana Martínez",
      email: "ana@email.com",
      date: "2024-12-20",
      status: "activo",
    },
    {
      id: 2,
      name: "Carlos López",
      email: "carlos@email.com",
      date: "2024-12-19",
      status: "activo",
    },
    {
      id: 3,
      name: "María González",
      email: "maria@email.com",
      date: "2024-12-18",
      status: "pendiente",
    },
    {
      id: 4,
      name: "Pedro Silva",
      email: "pedro@email.com",
      date: "2024-12-17",
      status: "activo",
    },
    {
      id: 5,
      name: "Laura Torres",
      email: "laura@email.com",
      date: "2024-12-16",
      status: "inactivo",
    },
  ],
  recentDogs: [
    {
      id: 1,
      name: "Max",
      breed: "Golden Retriever",
      owner: "Ana Martínez",
      size: "grande",
    },
    {
      id: 2,
      name: "Luna",
      breed: "Border Collie",
      owner: "Carlos López",
      size: "mediano",
    },
    {
      id: 3,
      name: "Coco",
      breed: "French Bulldog",
      owner: "María González",
      size: "pequeño",
    },
    {
      id: 4,
      name: "Rocky",
      breed: "German Shepherd",
      owner: "Pedro Silva",
      size: "grande",
    },
    {
      id: 5,
      name: "Bella",
      breed: "Chihuahua",
      owner: "Laura Torres",
      size: "mini",
    },
  ],
  todayAttendances: [
    {
      id: 1,
      dog: "Max",
      owner: "Ana Martínez",
      arrival: "08:30",
      route: "Mañana",
      status: "presente",
    },
    {
      id: 2,
      dog: "Luna",
      owner: "Carlos López",
      arrival: "08:45",
      route: "Mañana",
      status: "presente",
    },
    {
      id: 3,
      dog: "Coco",
      owner: "María González",
      arrival: "09:15",
      route: "Ninguna",
      status: "presente",
    },
    {
      id: 4,
      dog: "Rocky",
      owner: "Pedro Silva",
      arrival: "08:20",
      route: "Mañana",
      status: "presente",
    },
    {
      id: 5,
      dog: "Bella",
      owner: "Laura Torres",
      arrival: "10:00",
      route: "Tarde",
      status: "ausente",
    },
  ],
};

const InternalDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
      case "presente":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pendiente":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "inactivo":
      case "ausente":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "activo":
      case "presente":
        return <CheckCircle className="w-3 h-3" />;
      case "pendiente":
        return <AlertTriangle className="w-3 h-3" />;
      case "inactivo":
      case "ausente":
        return <XCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getSizeColor = (size: string) => {
    switch (size) {
      case "mini":
        return "#D9B778";
      case "pequeño":
        return "#7FA087";
      case "mediano":
        return "#CBB89D";
      case "grande":
        return "#B5B5B5";
      default:
        return "#EADDC8";
    }
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "clients", label: "Clientes", icon: Users },
    { id: "dogs", label: "Mascotas", icon: Dog },
    { id: "enrollments", label: "Matrículas", icon: Award },
    { id: "attendance", label: "Asistencias", icon: UserCheck },
    { id: "reports", label: "Reportes", icon: FileText },
    { id: "settings", label: "Configuración", icon: Settings },
  ];

  const quickActions = [
    { label: "Gestionar Clientes", icon: Users, color: "#7FA087" },
    { label: "Gestionar Mascotas", icon: Dog, color: "#D9B778" },
    { label: "Gestionar Matrículas", icon: Award, color: "#CBB89D" },
    { label: "Gestionar Asistencias", icon: UserCheck, color: "#B5B5B5" },
    { label: "Ver Reportes", icon: FileText, color: "#7FA087" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F1E9] to-[#EADDC8] flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 bg-white/90 backdrop-blur-sm border-r border-[#CBB89D]/20 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#CBB89D]/20">
          <div className="flex items-center space-x-3">
            <div className="bg-[#D9B778] p-2 rounded-xl">
              <Dog className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="text-lg font-bold text-[#302F2C]">
                  PawCare Admin
                </h2>
                <p className="text-xs text-[#302F2C]/70">Panel de Control</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                    activeSection === item.id
                      ? "bg-[#D9B778] text-white shadow-md"
                      : "text-[#302F2C] hover:bg-[#CBB89D]/20"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#CBB89D]/20">
          <div className="flex items-center space-x-3">
            <div className="bg-[#7FA087] p-2 rounded-full">
              <User className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-[#302F2C]">Admin User</p>
                <p className="text-xs text-[#302F2C]/70">admin@pawcare.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-[#CBB89D]/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-[#CBB89D]/20 transition-colors"
              >
                <Menu className="w-5 h-5 text-[#302F2C]" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-[#302F2C]">
                  Dashboard Principal
                </h1>
                <p className="text-sm text-[#302F2C]/70">
                  Resumen general del sistema
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-[#CBB89D]/20 transition-colors relative">
                <Bell className="w-5 h-5 text-[#302F2C]" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#7FA087] rounded-full"></span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[#CBB89D]/20 transition-colors">
                <div className="bg-[#D9B778] p-1 rounded-full">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-[#302F2C]" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#302F2C]/70">
                    Clientes Activos
                  </p>
                  <p className="text-2xl font-bold text-[#302F2C]">
                    {mockInternalData.kpis.activeClients}
                  </p>
                </div>
                <div className="bg-[#7FA087]/10 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-[#7FA087]" />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#302F2C]/70">
                    Mascotas Inscritas
                  </p>
                  <p className="text-2xl font-bold text-[#302F2C]">
                    {mockInternalData.kpis.enrolledDogs}
                  </p>
                </div>
                <div className="bg-[#D9B778]/10 p-3 rounded-xl">
                  <Dog className="w-6 h-6 text-[#D9B778]" />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#302F2C]/70">
                    Matrículas Activas
                  </p>
                  <p className="text-2xl font-bold text-[#302F2C]">
                    {mockInternalData.kpis.activeEnrollments}
                  </p>
                </div>
                <div className="bg-[#CBB89D]/10 p-3 rounded-xl">
                  <Award className="w-6 h-6 text-[#CBB89D]" />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#302F2C]/70">
                    Asistencias Hoy
                  </p>
                  <p className="text-2xl font-bold text-[#302F2C]">
                    {mockInternalData.kpis.todayAttendances}
                  </p>
                </div>
                <div className="bg-[#7FA087]/10 p-3 rounded-xl">
                  <Activity className="w-6 h-6 text-[#7FA087]" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Enrollments by Plan */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm">
              <h3 className="text-lg font-bold text-[#302F2C] mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Matrículas por Plan
              </h3>
              <div className="flex items-end space-x-4 h-40">
                {mockInternalData.enrollmentsByPlan.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full rounded-t transition-all hover:opacity-80"
                      style={{
                        height: `${(item.count / 80) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                    <span className="text-xs text-[#302F2C]/70 mt-2">
                      {item.plan}
                    </span>
                    <span className="text-sm font-semibold text-[#302F2C]">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Attendance Trends */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm">
              <h3 className="text-lg font-bold text-[#302F2C] mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Tendencia Semanal
              </h3>
              <div className="flex items-end space-x-2 h-40">
                {mockInternalData.weeklyAttendance.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full rounded-t bg-[#7FA087] transition-all hover:opacity-80"
                      style={{ height: `${(item.count / 100) * 100}%` }}
                    ></div>
                    <span className="text-xs text-[#302F2C]/70 mt-2">
                      {item.day}
                    </span>
                    <span className="text-sm font-semibold text-[#302F2C]">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Dogs by Size */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm">
              <h3 className="text-lg font-bold text-[#302F2C] mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Mascotas por Tamaño
              </h3>
              <div className="space-y-3">
                {mockInternalData.dogsBySize.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: getSizeColor(
                            item.size.toLowerCase()
                          ),
                        }}
                      ></div>
                      <span className="text-sm text-[#302F2C]">
                        {item.size}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-[#302F2C]">
                        {item.count}
                      </span>
                      <span className="text-xs text-[#302F2C]/70">
                        ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Income */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm">
              <h3 className="text-lg font-bold text-[#302F2C] mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Ingresos Mensuales
              </h3>
              <div className="flex items-end space-x-2 h-40">
                {mockInternalData.monthlyIncome.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full rounded-t bg-[#D9B778] transition-all hover:opacity-80"
                      style={{ height: `${(item.amount / 65000) * 100}%` }}
                    ></div>
                    <span className="text-xs text-[#302F2C]/70 mt-2">
                      {item.month}
                    </span>
                    <span className="text-xs font-semibold text-[#302F2C]">
                      ${item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#302F2C] mb-4">
              Acciones Rápidas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#CBB89D]/20 shadow-sm hover:shadow-md transition-all hover:scale-105 flex flex-col items-center space-y-2"
                  >
                    <div
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${action.color}20` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: action.color }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#302F2C] text-center">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Clients */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#302F2C] flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Clientes Recientes
                </h3>
                <button className="text-[#7FA087] hover:text-[#7FA087]/80 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {mockInternalData.recentClients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#F6F1E9]"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#302F2C]">
                        {client.name}
                      </p>
                      <p className="text-xs text-[#302F2C]/70">
                        {client.email}
                      </p>
                      <p className="text-xs text-[#302F2C]/50">
                        {new Date(client.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
                        client.status
                      )}`}
                    >
                      {getStatusIcon(client.status)}
                      {client.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Dogs */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#302F2C] flex items-center">
                  <Dog className="w-5 h-5 mr-2" />
                  Mascotas Recientes
                </h3>
                <button className="text-[#7FA087] hover:text-[#7FA087]/80 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {mockInternalData.recentDogs.map((dog) => (
                  <div
                    key={dog.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#F6F1E9]"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#302F2C]">
                        {dog.name}
                      </p>
                      <p className="text-xs text-[#302F2C]/70">{dog.breed}</p>
                      <p className="text-xs text-[#302F2C]/50">{dog.owner}</p>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getSizeColor(dog.size) }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Attendances */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#CBB89D]/20 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#302F2C] flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Asistencias Hoy
                </h3>
                <button className="text-[#7FA087] hover:text-[#7FA087]/80 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {mockInternalData.todayAttendances.map((attendance) => (
                  <div
                    key={attendance.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#F6F1E9]"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#302F2C]">
                        {attendance.dog}
                      </p>
                      <p className="text-xs text-[#302F2C]/70">
                        {attendance.owner}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-[#302F2C]/50">
                        <Clock className="w-3 h-3" />
                        <span>{attendance.arrival}</span>
                        <MapPin className="w-3 h-3" />
                        <span>{attendance.route}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
                        attendance.status
                      )}`}
                    >
                      {getStatusIcon(attendance.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InternalDashboard;
