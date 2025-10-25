'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { CheckCircle2, Users, Calendar, Award } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    
    // Rediriger si déjà connecté
    if (isAuthenticated) {
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    }
  }, [isAuthenticated, isAdmin, router, checkAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PresenceApp</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline" size="md">
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="md">
                  Inscription
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            Gérez vos Présences
            <span className="block text-transparent bg-clip-text bg-gradient-primary mt-2">
              Simplement & Efficacement
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Une solution moderne pour valider, suivre et gérer les présences de votre organisation.
            Obtenez des statistiques en temps réel et des attestations automatiques.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register">
              <Button variant="primary" size="lg" className="px-8">
                Commencer Maintenant
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8">
                Se Connecter
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-card p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up">
            <div className="mx-auto h-16 w-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Gestion Simple</h3>
            <p className="text-gray-600">
              Interface intuitive pour valider les présences en quelques clics
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="mx-auto h-16 w-16 bg-secondary-100 rounded-2xl flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Suivi en Temps Réel</h3>
            <p className="text-gray-600">
              Consultez vos statistiques et historique instantanément
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="mx-auto h-16 w-16 bg-success/20 rounded-2xl flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Attestations Automatiques</h3>
            <p className="text-gray-600">
              Recevez vos certificats de présence automatiquement
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 bg-white rounded-3xl shadow-2xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-600">Taux de Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-secondary-600 mb-2">1000+</div>
              <div className="text-gray-600">Utilisateurs Actifs</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-success mb-2">50K+</div>
              <div className="text-gray-600">Présences Validées</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-32 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 PresenceApp. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}