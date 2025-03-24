# Shadcn/ui Migration Guide (Tailwind v4)

## Voraussetzungen

```bash
npx shadcn-ui@latest init --tailwind-version 4
npm install tailwindcss@latest @nativewind/core
```

## Tailwind v4 Konfiguration

```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [
    require('@nativewind/core')({
      animation: 'fast', // Optimierte Animationen
    }),
  ],
};
```

## CSS-Variablen Setup

```css
/* src/styles/global.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}
```

## Komponenten Migration

```bash
# Button mit neuer Variant-API
npx shadcn-ui@latest add button --variant primary,secondary,ghost
```

## Teststrategie

1. Alte Komponenten markieren:

```typescript
// src/components/common/Button.tsx
/**
 * @deprecated Use @/components/ui/button
 * @migration-id SHADCN-001
 */
export const LegacyButton = () => null;
```

2. Integrationstests:

```typescript
// tests/setup/shadow-dom.ts
import { setupNativeWind } from '@nativewind/core';

setupNativeWind({
  rootElement: document.documentElement,
  debug: process.env.NODE_ENV === 'development',
});
```
