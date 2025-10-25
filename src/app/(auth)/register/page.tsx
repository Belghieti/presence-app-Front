'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authApi.register(registerData);
      
      login(response.token, response.user);
      
      toast.success('Inscription réussie ! 🎉', {
        duration: 3000,
      });

      router.push('/user');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Une erreur est survenue', {
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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 py-12">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        {/* Logo & Title */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-xl mb-4">
            <UserPlus className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900">
            Créer un Compte
          </h2>
          <p className="mt-2 text-gray-600">
            Rejoignez-nous dès maintenant !
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nom"
                name="nom"
                type="text"
                placeholder="Benali"
                required
                value={formData.nom}
                onChange={handleChange}
                icon={<User className="h-5 w-5" />}
              />

              <Input
                label="Prénom"
                name="prenom"
                type="text"
                placeholder="Ahmed"
                required
                value={formData.prenom}
                onChange={handleChange}
                icon={<User className="h-5 w-5" />}
              />
            </div>

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

            <Input
              label="Confirmer le Mot de Passe"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={<Lock className="h-5 w-5" />}
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              J&apos;accepte les{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                conditions d&apos;utilisation
              </a>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            S&apos;inscrire
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Connectez-vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}