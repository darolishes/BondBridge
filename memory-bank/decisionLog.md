# Decision Log

Version: 2.0.0
Letzte Aktualisierung: 2025-03-27 15:00:00
Status: 🟢 Aktiv

## MVP-Architekturentscheidungen 🏗️

| Entscheidung                        | Status | Begründung                                               | Alternativen                           | Risiken                                      |
| ----------------------------------- | ------ | -------------------------------------------------------- | -------------------------------------- | -------------------------------------------- |
| **Einfaches State Management**      | ✅     | Geringere Komplexität, schnellere Implementierung        | Redux Toolkit, Context API, MobX       | Skalierbarkeit bei größeren Datenmengen      |
| **Feature-basierte Ordnerstruktur** | ✅     | Bessere Codeorganisation, einfachere Feature-Isolation   | Typ-basierte Organisation              | Anfänglicher Strukturierungsaufwand          |
| **React Native mit Expo**           | ✅     | Schnelle Entwicklung, Cross-Platform-Support             | Flutter, native Entwicklung            | Expo-Limitierungen                           |
| **Externe Kartenset-Integration**   | ✅     | Benutzerfreundliche Erweiterbarkeit, Community-Potenzial | Nur vorinstallierte Sets, In-App-Käufe | Dateisystem-Zugriff, Validierungskomplexität |

## UI/UX-Entscheidungen für MVP 🎨

| Entscheidung               | Status | Begründung                                                      | Alternativen               | Risiken                                  |
| -------------------------- | ------ | --------------------------------------------------------------- | -------------------------- | ---------------------------------------- |
| **Einfache Kartenansicht** | ✅     | Fokus auf Kernfunktionalität, schnellere Umsetzung              | Komplexe Swipe-Animationen | Einfachere Benutzererfahrung             |
| **Kategoriefilter**        | ✅     | Grundlegende Filterfunktionalität für bessere Benutzererfahrung | Tag-basierte Filterung     | Komplexität bei vielen Kategorien        |
| **Einfache Navigation**    | ✅     | Intuitive Bedienung mit minimaler Lernkurve                     | Komplexe Gestenerkennung   | Eingeschränkte Interaktionsmöglichkeiten |

## Technologieentscheidungen für MVP 💻

| Entscheidung               | Status | Begründung                                      | Alternativen             | Risiken                           |
| -------------------------- | ------ | ----------------------------------------------- | ------------------------ | --------------------------------- |
| **Grundlegende Animation** | ✅     | Funktionale Swipe-Mechanik ohne Überkomplexität | Reanimated, Animated API | Einfachere visuelle Erfahrung     |
| **AsyncStorage**           | ✅     | Einfache Offline-Unterstützung                  | SQLite, Realm            | Begrenzter Speicherplatz          |
| **React Navigation**       | ✅     | Einfache Integration, gute Dokumentation        | React Native Navigation  | Einfachere Navigationsmuster      |
| **react-native-fs**        | ✅     | Zugriff auf Dateisystem für Kartenset-Import    | Expo FileSystem          | Plattformspezifische Unterschiede |

## Produktentscheidungen für MVP 🎯

| Entscheidung            | Status | Begründung                                  | Alternativen                   | Risiken                 |
| ----------------------- | ------ | ------------------------------------------- | ------------------------------ | ----------------------- |
| **6 Karten-Kategorien** | ✅     | Ausgewogene Themenabdeckung                 | Feinere Kategorien, Tag-System | Balance-Probleme        |
| **Externe Kartensets**  | ✅     | Benutzergenerierte Inhalte, Erweiterbarkeit | Nur vorinstallierte Inhalte    | Validierungskomplexität |

## Verschobene Entscheidungen (Post-MVP) 🔄

Die folgenden Entscheidungen wurden bewusst für spätere Projektphasen zurückgestellt:

1. **Redux Toolkit mit Entity Adapter** - Komplexere Lösung für größere Datenmengen
2. **Erweiterte Animationen** - Visuelle Verbesserungen nach Kernfunktionalität
3. **Zod für Schema-Validierung** - Fortgeschrittene Validierungsmechanismen
4. **Dark Mode** - UI-Verbesserung nach Kernfunktionalität
5. **Favoritensystem** - Zusätzliche Funktion für spätere Phasen

## State Management-Entscheidung ✅ (2025-03-27)

**Entscheidung:** Globale State-Verwaltung der Filterlogik

**Begründung:**

- Gewährleistet konsistente Filterung über alle Komponenten
- Ermöglicht zentrale Validierungslogik
- Vereinfacht zukünftige Erweiterungen

**Implementierung:**

- Nutzung von React Context API
- Zustandscontainer in `src/store/slices/filters.ts`
- Integration mit bestehender Storage-Logik
