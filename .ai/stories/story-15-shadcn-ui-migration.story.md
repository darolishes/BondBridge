# Story 15: Shadcn UI Component Migration 🎨

## Status: Planning 📋

## Story

As a developer,
I want to migrate our UI components to shadcn/ui,
So that we have a more modern, maintainable, and customizable component library with better TypeScript support.

## Technical Implementation

### 1. Component Migration Strategy

```typescript
// Before (nativecn):
import { Button as NativeCNButton } from 'nativecn-ui/button';

export const Button = ({ ...props }) => {
  const { theme } = useTheme();
  return (
    <NativeCNButton
      {...props}
      style={[
        {
          backgroundColor: theme.accent1,
        },
        props.style,
      ]}
    />
  );
};

// After (shadcn):
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### 2. Theme Integration

```typescript
// tailwind.config.ts
import { type Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // ... more color definitions
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

### 3. Component Installation

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add progress
```

### 4. Example Component Usage

```typescript
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function CardSetTile({ title, description, progress }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full" />
      </CardContent>
      <CardFooter>
        <Button>View Set</Button>
      </CardFooter>
    </Card>
  );
}
```

## Tasks

1. [ ] Set up shadcn/ui with project

   - [ ] Install dependencies
   - [ ] Configure Tailwind CSS
   - [ ] Set up component CLI
   - [ ] Configure theme tokens

2. [ ] Migrate core components

   - [ ] Button component
   - [ ] Card component
   - [ ] Dialog component
   - [ ] Progress component
   - [ ] Input component
   - [ ] Toggle component

3. [ ] Theme integration

   - [ ] Create theme tokens
   - [ ] Set up dark mode
   - [ ] Configure animations
   - [ ] Add custom variants

4. [ ] Update existing screens

   - [ ] Home screen
   - [ ] Card view screen
   - [ ] Settings screen
   - [ ] Import modal

5. [ ] Testing and documentation
   - [ ] Update component tests
   - [ ] Add new test cases
   - [ ] Update Storybook
   - [ ] Document migration

## Dependencies

- Story 14: Component Naming Standardization
- Story 3: Theme Customization
- Story 13: Config Component Refactoring

## Required Packages

```json
{
  "@radix-ui/react-slot": "^1.0.2",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0",
  "tailwindcss-animate": "^1.0.7",
  "tailwindcss": "^3.3.0"
}
```

## Estimation

- Setup and configuration: 3 hours
- Core component migration: 8 hours
- Theme integration: 4 hours
- Screen updates: 6 hours
- Testing and documentation: 4 hours
  Total: 25 hours

## Benefits

1. Modern Component Architecture

   - Radix UI primitives
   - Better accessibility
   - Improved TypeScript support

2. Enhanced Customization

   - CSS variables for theming
   - Tailwind utility classes
   - Component variants

3. Developer Experience

   - CLI for component installation
   - Consistent API
   - Better documentation

4. Performance
   - Smaller bundle size
   - Better tree shaking
   - Optimized styles

## Notes

- Ensure backward compatibility during migration
- Create fallback components for gradual migration
- Document new component patterns
- Update style guide with new conventions
- Consider impact on existing features
