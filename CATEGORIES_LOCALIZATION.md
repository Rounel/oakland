# Système de Catégories Localisées

Ce document explique comment utiliser le nouveau système de catégories localisées qui supporte le français et l'anglais.

## Vue d'ensemble

Le système de catégories a été modifié pour supporter la localisation automatique en fonction de la langue choisie par l'utilisateur. Les catégories s'affichent maintenant dans la langue appropriée (français ou anglais).

## Structure des Fichiers

### `src/constants/categories.ts`
- Contient la définition des catégories avec support multilingue
- Exporte une fonction `getLocalizedCategories(language)` pour obtenir les catégories dans une langue spécifique
- Maintient la compatibilité avec l'ancien système via l'export `categories`

### `src/components/language-provider.tsx`
- Fournit le hook `useLocalizedCategories()` pour obtenir les catégories localisées
- Gère automatiquement la langue actuelle de l'utilisateur

## Utilisation

### 1. Hook `useLocalizedCategories()`

```tsx
import { useLocalizedCategories } from '@/components/language-provider';

export default function MonComposant() {
  const categories = useLocalizedCategories();
  
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <p>{category.category}</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. Fonction `getLocalizedCategories()`

```tsx
import { getLocalizedCategories } from '@/constants/categories';

// Obtenir les catégories en français
const categoriesFR = getLocalizedCategories('fr');

// Obtenir les catégories en anglais
const categoriesEN = getLocalizedCategories('en');
```

### 3. Migration des Composants Existants

**Avant (ancien système) :**
```tsx
import { categories } from '@/constants/categories';

export default function MonComposant() {
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
}
```

**Après (nouveau système) :**
```tsx
import { useLocalizedCategories } from '@/components/language-provider';

export default function MonComposant() {
  const categories = useLocalizedCategories();
  
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
}
```

## Avantages

1. **Localisation automatique** : Les catégories s'adaptent automatiquement à la langue de l'utilisateur
2. **Compatibilité** : L'ancien système continue de fonctionner
3. **Performance** : Les catégories sont mises en cache et ne se rechargent que lors du changement de langue
4. **Maintenance** : Centralisation des traductions dans un seul endroit

## Ajout de Nouvelles Catégories

Pour ajouter une nouvelle catégorie, modifiez le tableau `baseCategories` dans `categories.ts` :

```tsx
{ 
  id: 49, 
  name: { 
    fr: "Nouveau Métier", 
    en: "New Trade" 
  }, 
  category: { 
    fr: "Nouvelle Catégorie", 
    en: "New Category" 
  }, 
  path: "/search" 
}
```

## Composants Migrés

Les composants suivants ont été migrés vers le nouveau système :
- ✅ `popular-categories.tsx`
- 🔄 Autres composants à migrer selon les besoins

## Dépannage

### Problème : Les catégories ne changent pas de langue
**Solution :** Vérifiez que le composant utilise `useLocalizedCategories()` et non l'import direct de `categories`

### Problème : Erreur de type TypeScript
**Solution :** Assurez-vous d'importer `CategoriesProps` depuis `@/constants/categories`

### Problème : Performance dégradée
**Solution :** Le hook `useLocalizedCategories()` est optimisé et ne se re-exécute que lors du changement de langue

## Support

Pour toute question ou problème avec le système de catégories localisées, consultez :
1. Ce document
2. Le composant de démonstration `category-demo.tsx`
3. Les exemples d'utilisation dans les composants migrés
