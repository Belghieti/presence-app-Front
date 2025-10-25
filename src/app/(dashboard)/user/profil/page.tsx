'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { userApi } from '@/lib/api';
import {
  User,
  Mail,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Edit,
  Shield
} from 'lucide-react';

export default function UserProfilPage() {
  const { user, updateUser } = useAuthStore();
  const [profil, setProfil] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfil();
  }, []);

  const loadProfil = async () => {
    try {
      const data = await userApi.getProfil();
      setProfil(data);
      updateUser(data);
    } catch (error) {
      console.error('Erreur chargement profil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="spinner"></div>
        </div>
      </DashboardLayout>
    );
  }

  const userData = profil || user;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </div>

        {/* Profile Card */}
        <Card>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-gradient-primary flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                {userData?.prenom?.[0]}{userData?.nom?.[0]}
              </div>
              {userData?.isActive ? (
                <div className="absolute bottom-2 right-2 h-6 w-6 bg-success rounded-full border-4 border-white"></div>
              ) : (
                <div className="absolute bottom-2 right-2 h-6 w-6 bg-error rounded-full border-4 border-white"></div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {userData?.prenom} {userData?.nom}
              </h2>
              <p className="text-gray-600 mt-1">{userData?.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  userData?.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {userData?.isActive ? 'Compte Actif' : 'Compte Bloqué'}
                </span>
                <span className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                  {userData?.role === 'ADMIN' ? 'Administrateur' : 'Membre'}
                </span>
              </div>
            </div>

            {/* Score Badge */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 text-center shadow-lg">
              <Award className="h-10 w-10 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Score Total</p>
              <p className="text-4xl font-bold text-gray-900 mt-1">
                {userData?.score || 0}
              </p>
              <p className="text-sm text-gray-600">points</p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <p className="text-3xl font-bold text-gray-900">18</p>
              <p className="text-gray-600 mt-1">Présences Validées</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-red-100 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-error" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {userData?.nbAbsences || 0}
              </p>
              <p className="text-gray-600 mt-1">Absences</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">90%</p>
              <p className="text-gray-600 mt-1">Taux de Présence</p>
            </div>
          </Card>
        </div>

        {/* Detailed Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary-600" />
              Informations Personnelles
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Nom Complet</span>
                <span className="font-medium text-gray-900">
                  {userData?.prenom} {userData?.nom}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{userData?.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Rôle</span>
                <span className="font-medium text-gray-900">
                  {userData?.role === 'ADMIN' ? 'Administrateur' : 'Membre'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600">Membre depuis</span>
                <span className="font-medium text-gray-900">
                  {userData?.dateCreation ? new Date(userData.dateCreation).toLocaleDateString('fr-FR') : '-'}
                </span>
              </div>
            </div>
          </Card>

          {/* Account Status */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary-600" />
              Statut du Compte
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Statut</span>
                  <span className={`text-sm font-medium ${
                    userData?.isActive ? 'text-success' : 'text-error'
                  }`}>
                    {userData?.isActive ? 'Actif' : 'Bloqué'}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Score Actuel</span>
                  <span className="text-sm font-medium text-gray-900">
                    {userData?.score || 0} points
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Absences</span>
                  <span className={`text-sm font-medium ${
                    (userData?.nbAbsences || 0) >= 2 ? 'text-error' : 'text-gray-900'
                  }`}>
                    {userData?.nbAbsences || 0}/2
                  </span>
                </div>
              </div>

              {!userData?.isActive && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-error">Compte Bloqué</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Votre compte a été bloqué après 2 absences non justifiées. 
                        Contactez un administrateur pour le déblocage.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Progression</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {userData?.score >= 10 
                        ? 'Félicitations ! Vous êtes éligible pour une attestation.'
                        : `Plus que ${10 - (userData?.score || 0)} points pour l'attestation.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}