"use client"

import React from 'react';
import { useLanguage } from './language-provider';
import { useLocalizedCategories } from './language-provider';
import { Button } from './ui/button';

export default function CategoryDemo() {
  const { language, setLanguage, t } = useLanguage();
  const categories = useLocalizedCategories();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Démonstration des Catégories Localisées</h2>
        <div className="flex gap-2 justify-center">
          <Button 
            onClick={() => setLanguage('fr')}
            variant={language === 'fr' ? 'default' : 'outline'}
          >
            Français
          </Button>
          <Button 
            onClick={() => setLanguage('en')}
            variant={language === 'en' ? 'default' : 'outline'}
          >
            English
          </Button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Langue actuelle: {language === 'fr' ? 'Français' : 'English'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.slice(0, 12).map((category) => (
          <div key={category.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{category.category}</p>
            <div className="text-xs text-gray-500">
              ID: {category.id} | Path: {category.path}
            </div>
            {category.img && (
              <div className="mt-2 text-xs text-blue-600">
                Image: {category.img}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Total des catégories: {categories.length}
        </p>
      </div>
    </div>
  );
}
