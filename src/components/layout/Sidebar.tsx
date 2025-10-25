'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import {
  LayoutDashboard,
  Calendar,
  Users,
  CheckCircle2,
  BarChart3,
  FileText,
  User,
  History,
  Award,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';

  const adminMenuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/admin',
      color: 'text-primary-600'
    },
    { 
      icon: Calendar, 
      label: 'Sessions', 
      href: '/admin/sessions',
      color: 'text-secondary-600'
    },
    { 
      icon: CheckCircle2, 
      label: 'Présences', 
      href: '/admin/presences',
      color: 'text-success'
    },
    { 
      icon: Users, 
      label: 'Utilisateurs', 
      href: '/admin/users',
      color: 'text-blue-600'
    },
    { 
      icon: BarChart3, 
      label: 'Statistiques', 
      href: '/admin/statistiques',
      color: 'text-orange-600'
    },
    { 
      icon: FileText, 
      label: 'Attestations', 
      href: '/admin/attestations',
      color: 'text-purple-600'
    },
  ];

  const userMenuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/user',
      color: 'text-primary-600'
    },
    { 
      icon: CheckCircle2, 
      label: 'Séance Active', 
      href: '/user/session',
      color: 'text-success'
    },
    { 
      icon: History, 
      label: 'Historique', 
      href: '/user/historique',
      color: 'text-secondary-600'
    },
    { 
      icon: User, 
      label: 'Mon Profil', 
      href: '/user/profil',
      color: 'text-blue-600'
    },
    { 
      icon: Award, 
      label: 'Mes Attestations', 
      href: '/user/attestations',
      color: 'text-purple-600'
    },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen
          w-64 bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PresenceApp</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive
                    ? 'bg-primary-50 text-primary-600 font-medium shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? item.color : 'text-gray-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Settings at Bottom */}
          <div className="pt-4 border-t border-gray-200 mt-auto">
            <Link
              href={isAdmin ? '/admin/settings' : '/user/settings'}
              onClick={onClose}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg
                text-gray-700 hover:bg-gray-50 transition-all duration-200
                ${pathname.includes('/settings') ? 'bg-gray-50' : ''}
              `}
            >
              <Settings className="h-5 w-5 text-gray-500" />
              <span>Paramètres</span>
            </Link>
          </div>
        </nav>

        {/* User Info Card */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-primary">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 text-white">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                {user?.prenom?.[0]}{user?.nom?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.prenom} {user?.nom}
                </p>
                <p className="text-xs text-white/80 truncate">
                  Score: {user?.score || 0} pts
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;