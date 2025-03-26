# Product Context

Version: 1.0.0
Last Updated: 2024-03-25 15:02:45
Status: 🟢 Active
Related Files: activeContext.md, decisionLog.md

## Project Goal 🎯

Development of a mobile app to enhance couple communication through swipeable conversation cards with offline functionality and JSON import capabilities.

## Core Features ⭐

- ✅ Swipeable cards in 6 categories
- ✅ JSON-based content management
- ✅ Minimalist UI with dark mode
- ✅ Complete offline functionality

## Architecture 🏗️

- Mobile: React Native with Expo

  - Status: Selected ✅
  - Rationale: See decisionLog.md#architecture-decisions

- State Management: Redux Toolkit

  - Status: Selected ✅
  - Implementation: Pending 🔄

- Local Storage: AsyncStorage

  - Status: Selected ✅
  - Implementation: Pending 🔄

- CI/CD: GitHub Actions
  - Status: Planned 📋
  - Implementation: Not Started

## Technical Requirements 📋

- TypeScript strict mode enabled
- Minimum iOS version: 13.0
- Minimum Android version: 8.0
- Offline-first architecture
- PWA support for web version

## Integration Points 🔄

- JSON content import/export
- Local storage synchronization
- Theme system integration
- Analytics integration (planned)
