'use client';

import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-600 flex items-center space-x-1">
            <span>© {currentYear} PresenceApp. Tous droits réservés.</span>
          </div>

          {/* Made with love */}
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>Fait avec</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>par votre équipe</span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              Confidentialité
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              Conditions
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;