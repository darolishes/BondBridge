# UI-Prinzipien (MVP)

Version: 2.0.0
Letzte Aktualisierung: 2025-03-27 15:00:00
Status: 🟢 Aktiv

## Kernprinzipien für MVP 🎨

- **Einfachheit** - Fokus auf Funktionalität statt Komplexität
- **Konsistenz** - Einheitliches Erscheinungsbild der App
- **Lesbarkeit** - Klare, gut lesbare Inhalte
- **Zugänglichkeit** - Grundlegende Barrierefreiheit

## Basis-Farben

| Gruppe        | Farben für MVP                                                     | Verwendung            |
| ------------- | ------------------------------------------------------------------ | --------------------- |
| **Primär**    | `#4A6FA5` (Blau)                                                   | Hauptelemente         |
| **Neutral**   | `#F5F7FA` (Background), `#FFFFFF` (Surface)                        | Hintergründe, Karten  |
| **Status**    | `#47B881` (Erfolg), `#F7D154` (Warnung), `#EC5E66` (Fehler)        | Feedback              |
| **Kategorie** | Einfache Farbzuordnung pro Kategorie (z.B. Icebreakers: `#5BC0EB`) | Kategorie-Indikatoren |

### Typografie & Spacing

| Element       | Wert                                               | Verwendung      |
| ------------- | -------------------------------------------------- | --------------- |
| **Schriften** | System-Fonts (iOS: San Francisco, Android: Roboto) | Gesamte App     |
| **Größen**    | H1: 24px, H2: 20px, Body: 16px                     | Text-Hierarchie |
| **Spacing**   | 8px-Grid: S: 8px, M: 16px, L: 24px                 | Abstände        |

## Kern-Komponenten für MVP 📱

### ConversationCard

**Einfache Struktur**:

- Kategorie-Indikator (farbiger Streifen)
- Hauptfrage (H2, zentriert)
- Einfache Buttons für Navigation

### CategoryFilter

- Horizontale Liste von Chips für Kategorien
- Klarer aktiver/inaktiver Status
- Einfache Tap-Interaktion zum Umschalten

## Einfache Interaktionen 🎬

| Interaktion           | Effekt                                | MVP-Umsetzung                |
| --------------------- | ------------------------------------- | ---------------------------- |
| **Tap auf Buttons**   | Navigation zwischen Karten            | Einfache Transition          |
| **Swipe-Geste**       | Wechsel zur nächsten/vorherigen Karte | Grundlegende Swipe-Erkennung |
| **Kategorie-Auswahl** | Filter ein-/ausschalten               | Sichtbare Statusänderung     |

## MVP-Implementierung 🛠️

### Best Practices

- **Einfachheit**: Minimale Komponenten mit klarer Funktion
- **Konsistenz**: Einheitliche Abstände und Farbgebung
- **Performanz**: Minimierung unnötiger Berechnungen
- **Responsivität**: Anpassung an verschiedene Bildschirmgrößen

### Accessibility-Grundlagen

- Touch-Targets mindestens 44x44px
- Ausreichender Farbkontrast für Text
- Semantisch korrekte Komponenten

## Zukünftige UI-Erweiterungen (Post-MVP) 🔮

Die folgenden UI-Elemente sind für spätere Versionen geplant:

- **Dark Mode** - Alternative Farbschemas
- **Komplexe Animationen** - Erweiterte visuelle Effekte
- **Erweiterte Swipe-Interaktionen** - Mit visuellen Feedback-Animationen
- **Favoriten-System** - UI-Elemente für Favorisierung
- **Custom Fonts** - Individuellere Typografie
