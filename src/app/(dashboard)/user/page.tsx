'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { userApi } from '@/lib/api';
import toast from 'react-hot-toast';
import {
  CheckCircle2,
  Award,
  TrendingUp,
  Calendar,
  AlertCircle,
  Clock,
  Target,
  Activity
} from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [profil, setProfil] = useState<any>(null);

  useEffect(() => {
    loadProfil();
  }, []);

  const loadProfil = async () => {
    try {
      const data = await userApi.getProfil();
      setProfil(data);
    } catch (error) {
      console.error('Erreur chargement profil:', error);
    }
  };

  // Mock data - Session active
  const sessionActive = {
    id: 1,
    titre: 'Réunion Hebdomadaire',
    date: '2025-10-17',
    heureDebut: '14:00',
    heureFin: '16:00',
    statut: 'EN_COURS',
    presenceValidee: false
  };

  const handleValiderPresence = async () => {
    setIsLoading(true);
    try {
      await userApi.validerMaPresence(sessionActive.id);
      toast.success('Présence validée avec succès ! 🎉');
      sessionActive.presenceValidee = true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la validation');
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      label: 'Mon Score',
      value: profil?.score || user?.score || 0,
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'points accumulés'
    },
    {
      label: 'Présences',
      value: '18',
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-green-100',
      description: 'sessions validées'
    },
    {
      label: 'Absences',
      value: profil?.nbAbsences || user?.nbAbsences || 0,
      icon: AlertCircle,
      color: 'text-error',
      bgColor: 'bg-red-100',
      description: 'à justifier'
    },
    {
      label: 'Taux',
      value: '90%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'de présence'
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Présence validée',
      session: 'Réunion Hebdomadaire',
      date: '2025-10-15',
      points: 10,
      statut: 'PRESENT'
    },
    {
      id: 2,
      action: 'Présence validée',
      session: 'Formation React',
      date: '2025-10-14',
      points: 10,
      statut: 'PRESENT'
    },
    {
      id: 3,
      action: 'Retard',
      session: 'Séminaire Tech',
      date: '2025-10-12',
      points: 5,
      statut: 'RETARD'
    },
  ];

  const progressToAttestation = ((profil?.score || user?.score || 0) / 100) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Bienvenue, {user?.prenom} ! 👋
              </h1>
              <p className="text-white/90 mt-2">
                Voici un aperçu de votre progression
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-lg rounded-xl p-6">
              <div className="text-center">
                <p className="text-sm text-white/80">Score Total</p>
                <p className="text-4xl font-bold mt-1">{profil?.score || user?.score || 0}</p>
                <p className="text-sm text-white/80">points</p>
              </div>
            </div>
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
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.description}
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Session Active - 2 colonnes */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-success/10 p-3 rounded-xl">
                  <Activity className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Session en Cours</h2>
                  <p className="text-sm text-gray-600">Validez votre présence maintenant</p>
                </div>
              </div>

              {sessionActive.statut === 'EN_COURS' ? (
                <div className="bg-gradient-to-br from-success/10 to-primary/10 rounded-xl p-6 border-2 border-success/20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {sessionActive.titre}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2 text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{sessionActive.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">
                            {sessionActive.heureDebut} - {sessionActive.heureFin}
                          </span>
                        </span>
                      </div>
                    </div>
                    <span className="badge-success animate-pulse">
                      EN COURS
                    </span>
                  </div>

                  {!sessionActive.presenceValidee ? (
                    <div className="mt-6">
                      <Button
                        variant="success"
                        size="lg"
                        className="w-full"
                        onClick={handleValiderPresence}
                        isLoading={isLoading}
                      >
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Valider ma Présence
                      </Button>
                      <p className="text-sm text-gray-600 text-center mt-3">
                        Vous gagnerez <strong>10 points</strong> en validant maintenant
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 bg-white rounded-lg p-4 text-center">
                      <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-2" />
                      <p className="font-medium text-gray-900">Présence Validée !</p>
                      <p className="text-sm text-gray-600 mt-1">
                        +10 points ajoutés à votre score
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aucune session active pour le moment</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Vous serez notifié lors de la prochaine session
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Progression Attestation - 1 colonne */}
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Objectif Attestation</h3>
                <p className="text-sm text-gray-600">Score minimum: 10 pts</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progression</span>
                <span className="font-medium text-gray-900">
                  {profil?.score || user?.score || 0} / 100 pts
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progressToAttestation, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {progressToAttestation >= 100
                  ? '🎉 Éligible pour l\'attestation !'
                  : `Plus que ${100 - (profil?.score || user?.score || 0)} points`
                }
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Présences</span>
                <span className="font-medium text-gray-900">18/20</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Taux de présence</span>
                <span className="font-medium text-gray-900">90%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Absences</span>
                <span className="font-medium text-error">
                  {profil?.nbAbsences || user?.nbAbsences || 0}/2
                </span>
              </div>
            </div>

            {(profil?.score || user?.score || 0) >= 10 && (
              <Button variant="primary" className="w-full mt-4">
                <Award className="h-4 w-4 mr-2" />
                Télécharger mon Attestation
              </Button>
            )}
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Activités Récentes</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`
                    p-2 rounded-full
                    ${activity.statut === 'PRESENT' ? 'bg-green-100' : ''}
                    ${activity.statut === 'RETARD' ? 'bg-yellow-100' : ''}
                  `}>
                    {activity.statut === 'PRESENT' ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Clock className="h-5 w-5 text-warning" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.session}</p>
                    <p className="text-sm text-gray-600">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-success">+{activity.points} pts</p>
                  <p className="text-xs text-gray-500">{activity.statut}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}