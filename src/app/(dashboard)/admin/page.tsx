'use client';

import React from 'react';
import DashboardLayout from '../DashboardLayout';
import Card from '@/components/ui/Card';
import {
  Users,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Activity,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  // Mock data - à remplacer par de vraies données API
  const stats = [
    {
      label: 'Total Utilisateurs',
      value: '248',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Sessions ce Mois',
      value: '32',
      change: '+8%',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Présences Validées',
      value: '1,247',
      change: '+23%',
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Taux de Présence',
      value: '94.2%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const recentSessions = [
    {
      id: 1,
      titre: 'Réunion Hebdomadaire',
      date: '2025-10-17',
      presents: 45,
      total: 50,
      statut: 'TERMINEE'
    },
    {
      id: 2,
      titre: 'Formation React',
      date: '2025-10-18',
      presents: 38,
      total: 40,
      statut: 'EN_COURS'
    },
    {
      id: 3,
      titre: 'Séminaire Tech',
      date: '2025-10-19',
      presents: 0,
      total: 60,
      statut: 'PLANIFIEE'
    },
  ];

  const getStatusBadge = (statut: string) => {
    const badges = {
      TERMINEE: 'badge-success',
      EN_COURS: 'badge-warning',
      PLANIFIEE: 'badge-info',
      ANNULEE: 'badge-error',
    };
    return badges[statut as keyof typeof badges] || 'badge-info';
  };

  return (
    <DashboardLayout requireAdmin>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Administrateur
            </h1>
            <p className="text-gray-600 mt-1">
              Vue d'ensemble de votre système de présences
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg">
              + Créer une Session
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-success mt-1 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {stat.change} ce mois
                    </p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-4 rounded-xl`}>
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sessions List */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Sessions Récentes</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Voir tout
              </button>
            </div>
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{session.titre}</h3>
                    <p className="text-sm text-gray-600 mt-1">{session.date}</p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="text-sm font-medium text-gray-900">
                      {session.presents}/{session.total}
                    </p>
                    <p className="text-xs text-gray-500">présents</p>
                  </div>
                  <span className={getStatusBadge(session.statut)}>
                    {session.statut.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Actions Rapides</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors text-left">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Créer une Session</p>
                  <p className="text-sm text-gray-600">Planifier une nouvelle séance</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
                <div className="bg-success p-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Valider Présences</p>
                  <p className="text-sm text-gray-600">Session en cours</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Gérer Utilisateurs</p>
                  <p className="text-sm text-gray-600">Activer/Désactiver</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left">
                <div className="bg-orange-600 p-2 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Statistiques</p>
                  <p className="text-sm text-gray-600">Rapports détaillés</p>
                </div>
              </button>
            </div>
          </Card>
        </div>

        {/* Alerts */}
        <Card>
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Comptes Bloqués</h3>
              <p className="text-sm text-gray-600 mt-1">
                3 utilisateurs ont atteint 2 absences et ont été automatiquement bloqués.
                <button className="text-primary-600 hover:text-primary-700 ml-2 font-medium">
                  Voir la liste
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}