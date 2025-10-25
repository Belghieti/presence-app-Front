'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, CheckCircle2 } from 'lucide-react';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      login(response.token, response.user);
      
      toast.success('Connexion réussie !', {
        icon: '🎉',
        duration: 3000,
      });

      // Redirection selon le rôle
      if (response.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Email ou mot de passe incorrect', {
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 animate-fade-in">
          {/* Logo & Title */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-xl mb-4">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Bienvenue !
            </h2>
            <p className="mt-2 text-gray-600">
              Connectez-vous à votre compte
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Adresse Email"
                name="email"
                type="email"
                placeholder="exemple@email.com"
                required
                value={formData.email}
                onChange={handleChange}
                icon={<Mail className="h-5 w-5" />}
              />

              <Input
                label="Mot de Passe"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                icon={<Lock className="h-5 w-5" />}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Se Connecter
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Vous n&apos;avez pas de compte ?{' '}
                <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Gradient */}
      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-12">
        <div className="max-w-lg text-white space-y-6 animate-slide-up">
          <h1 className="text-5xl font-bold leading-tight">
            Système de Gestion de Présences
          </h1>
          <p className="text-xl text-white/90">
            Validez vos présences facilement et suivez votre progression en temps réel.
          </p>
          <div className="space-y-4 pt-8">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Validation Simple</h3>
                <p className="text-white/80">Validez votre présence en un clic</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Suivi en Temps Réel</h3>
                <p className="text-white/80">Consultez vos statistiques instantanément</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Attestations Automatiques</h3>
                <p className="text-white/80">Obtenez vos certificats en fin d&apos;année</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}