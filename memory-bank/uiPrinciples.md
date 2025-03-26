# UI-Prinzipien für BondBridge

Version: 1.0.0
Last Updated: 2025-03-26 14:50:45
Status: 🟢 Active

## Designsystem 🎨

### Farben

#### Primärfarben

- **Primär**: `#4A6FA5` - Hauptfarbe der App, für wichtige Elemente
- **Sekundär**: `#FFB347` - Akzentfarbe für Call-to-Actions und Highlights
- **Tertiär**: `#47B881` - Erfolg, positive Aktionen

#### Statusfarben

- **Erfolg**: `#47B881` - Positive Aktionen und Bestätigungen
- **Warnung**: `#F7D154` - Warnhinweise und Vorsichtsmaßnahmen
- **Fehler**: `#EC5E66` - Fehler und kritische Zustände
- **Info**: `#5BC0EB` - Informative Hinweise

#### Neutrale Farben

- **Background (Light)**: `#F5F7FA` - Hintergrund im Light Mode
- **Background (Dark)**: `#1A202C` - Hintergrund im Dark Mode
- **Surface (Light)**: `#FFFFFF` - Kartenoberflächen im Light Mode
- **Surface (Dark)**: `#2D3748` - Kartenoberflächen im Dark Mode
- **Text (Light)**: `#2D3748` - Primärer Text im Light Mode
- **Text (Dark)**: `#F5F7FA` - Primärer Text im Dark Mode

#### Kategorie-Farben

Jede Kategorie hat eine eigene Signalfarbe:

- **Icebreakers**: `#5BC0EB` - Hellblau (leicht, frisch)
- **Confessions**: `#FFA69E` - Lachsrosa (persönlich, warm)
- **Personality**: `#A0C4FF` - Mittelblau (ruhig, vertrauenswürdig)
- **Deep Thoughts**: `#9381FF` - Lila (tiefgründig, philosophisch)
- **Intimacy**: `#FB5607` - Orange (intim, leidenschaftlich)
- **Growth**: `#8AC926` - Grün (Wachstum, Entwicklung)

### Typografie

#### Schriftarten

- **Primäre Schrift**: `Montserrat` - Für Überschriften und Buttons
- **Sekundäre Schrift**: `Open Sans` - Für Fließtext und kleinere UI-Elemente

#### Schriftgrößen

- **H1**: 28px - Hauptüberschriften
- **H2**: 24px - Sekundäre Überschriften
- **H3**: 20px - Abschnitte und Kartenüberschriften
- **Body**: 16px - Standardtext und Fragen
- **Small**: 14px - Sekundärinformationen
- **XSmall**: 12px - Labels und Hinweise

#### Gewichte

- **Bold**: 700 - Überschriften und Hervorhebungen
- **Semibold**: 600 - Subtitel und wichtige UI-Elemente
- **Regular**: 400 - Normaler Text und UI-Elemente
- **Light**: 300 - Sekundäre Informationen

### Spacing

Ein konsistentes 8px-Grid-System:

- **XXS**: 4px - Minimaler Abstand
- **XS**: 8px - Kleiner Abstand
- **S**: 16px - Standard-Padding innerhalb von Komponenten
- **M**: 24px - Standard-Abstand zwischen Komponenten
- **L**: 32px - Großer Abstand zwischen Abschnitten
- **XL**: 48px - Extra großer Abstand
- **XXL**: 64px - Maximaler Abstand

### Schatten

- **Small**: Subtile Erhebung für Karten und selektierte Elemente
- **Medium**: Mittlere Erhebung für schwebende Elemente
- **Large**: Starke Erhebung für Modals und Overlays

```javascript
// Small Shadow
shadowColor: "#000",
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.15,
shadowRadius: 2,
elevation: 2,

// Medium Shadow
shadowColor: "#000",
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.2,
shadowRadius: 4,
elevation: 4,

// Large Shadow
shadowColor: "#000",
shadowOffset: { width: 0, height: 6 },
shadowOpacity: 0.25,
shadowRadius: 8,
elevation: 8,
```

### Border Radius

- **Small**: 4px - Kleine UI-Elemente
- **Medium**: 8px - Buttons und Eingabefelder
- **Large**: 16px - Karten und Container
- **XLarge**: 24px - Featured-Elemente und große Karten

## Komponenten-Design 📱

### Conversation Card

![Card Design Sketch (Placeholder)]()

#### Anatomy

1. **Kategorie-Indikator**:

   - Farbiger Streifen oder Header basierend auf der Kategorie
   - Kategorie-Name oder Icon als Referenz

2. **Hauptfrage**:

   - Große, gut lesbare Schrift (H3 oder größer)
   - Zentriert oder linksbündig mit ausreichend Padding
   - Hervorgehoben als wichtigstes Element

3. **Schwierigkeitsgrad**:

   - Visuelle Representation (1-5 Punkte/Sterne)
   - Subtil, aber erkennbar
   - Konsistente Position (oben oder unten)

4. **Follow-Up-Fragen**:

   - Kleiner als Hauptfrage (Body oder Small)
   - Visuell abgesetzt (z.B. andere Farbe, Einrückung)
   - Optional: Erst nach Interaktion sichtbar (expandierbar)

5. **Aktions-Buttons**:
   - Favorite/Bookmark-Icon
   - Optional: Teilen-Icon
   - Konsistente Position und Größe

#### Proportionen

- Höhe: ~60-70% der Bildschirmhöhe
- Breite: ~90% der Bildschirmbreite
- Aspect Ratio: Annähernd 3:4 oder 4:5

#### Visuelles Design

- Weißer/dunkler Hintergrund je nach Theme
- Schatten für "schwebenden" Effekt
- Border Radius (Large oder XLarge)
- Kategorie-Indikator als Farbakzent

### Card Stack

- Leicht versetzt, um Stapel-Effekt zu zeigen
- Nächste Karte leicht sichtbar hinter aktueller Karte
- Maximal 3 sichtbare Karten im Stapel

### Category Filter

- Horizontale Chip-Liste
- Active/Inactive States klar unterscheidbar
- Kategorie-Farben in Chips integriert
- Scrollbar bei vielen Kategorien

### Accessibility

- Minimale Touch-Target-Größe: 44x44px
- Ausreichender Farbkontrast (WCAG AA)
- Skalierbare Schriftgrößen
- VoiceOver/TalkBack-Unterstützung

## Animation & Interaktion 🎬

### Card Swipe

- **Swipe Rechts**:

  - Grüner Overlay während des Swipes
  - Nach rechts rotierende Bewegung (5-10°)
  - "Like"-Indikator erscheint bei erfolgreicher Swipe-Geste
  - Haptic Feedback (leicht)

- **Swipe Links**:

  - Neutraler/grauer Overlay während des Swipes
  - Nach links rotierende Bewegung (5-10°)
  - "Skip"-Indikator erscheint bei erfolgreicher Swipe-Geste
  - Haptic Feedback (leicht)

- **Unvollständige Swipes**:
  - Spring-Animation zurück zur Mitte
  - Natürliche "physikalische" Animation
  - Kein Haptic Feedback

### Transition Animations

- Neue Karte erscheint mit leichter Scale-up-Animation
- Kategoriewechsel mit Cross-Fade
- Expansion der Follow-Up-Fragen mit Accordion-Animation

### Timing

- Swipe-Transition: ~300ms
- Spring-Back: ~250ms
- Kategorie-Filter-Toggle: ~150ms
- Allgemein: Schnell, aber nicht abrupt

## Design-Patterns 🧩

### Empty States

- Freundliche Illustrationen
- Klare Handlungsanweisungen
- Konsistentes Erscheinungsbild

### Loading States

- Skeleton-Loading für Karten
- Minimalistischer Spinner für kurze Ladezeiten
- Progress-Indikator für längere Prozesse

### Fehler-States

- Freundliche Fehlermeldungen
- Hilfreiche Lösungsvorschläge
- Retry-Möglichkeit wo sinnvoll

### Onboarding

- Kurze, visuelle Intro-Tour
- 3-4 Schritte maximal
- Fokus auf Kernfunktionen

## Responsive Design 📐

### Orientation Support

- Primär für Portrait-Modus optimiert
- Landscape: Angepasstes Layout mit seitlicher Kartenanzeige

### Device Adaptation

- Kleine Geräte: Reduzierte Padding-Werte
- Tablets: Zwei-Spalten-Layout wo sinnvoll
- Größere Schriftgrößen auf Tablets

## Implementierungsrichtlinien 🛠️

### Theming

- ThemeProvider nutzen
- Farben nie hart codieren
- Light/Dark-Varianten für alle Farben

### Layout

- Flexbox für Layouts bevorzugen
- Konsistentes Spacing-System anwenden
- SafeAreaView für notch/punch-hole Unterstützung

### Performance

- Memoization für Card-Komponenten
- Optimierte Animationen mit Reanimated
- Lazy-Loading für Off-Screen-Inhalte
