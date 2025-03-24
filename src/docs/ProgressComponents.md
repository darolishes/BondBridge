# Progress UI Komponenten

## SetProgressHeader Komponente

### Interface

```typescript
interface SetProgressHeaderProps {
  setId: string;
  className?: string;
  style?: ViewStyle;
}
```

### Beschreibung

Die SetProgressHeader Komponente zeigt den Gesamtfortschritt für ein Kartenset an. Sie verwendet den ProgressService um die Statistiken zu laden und zeigt diese in einer übersichtlichen Form an.

### Features

- Prozentuale Fortschrittsanzeige
- X von Y Karten gesehen
- Letzte Aktivität
- Animierte Updates

### Layout

```jsx
<View style={styles.container}>
  <Text style={styles.title}>{setName}</Text>
  <ProgressBar progress={stats.progressPercentage} style={styles.progress} />
  <Text style={styles.stats}>
    {stats.seenCards} von {stats.totalCards} Karten gesehen
  </Text>
</View>
```

## CategoryProgress Komponente

### Interface

```typescript
interface CategoryProgressProps {
  setId: string;
  category: string;
  className?: string;
  style?: ViewStyle;
}
```

### Beschreibung

Zeigt den Fortschritt für eine spezifische Kategorie innerhalb eines Sets an. Verwendet kleinere ProgressBars und kompaktere Statistiken.

### Features

- Kategorie-spezifische Fortschrittsanzeige
- Farbkodierung nach Kategorie
- Kompakte Darstellung

### Layout

```jsx
<View style={styles.categoryContainer}>
  <Text style={styles.categoryName}>{category}</Text>
  <ProgressBar
    progress={categoryStats.percentage}
    style={styles.categoryProgress}
    color={getCategoryColor(category)}
  />
  <Text style={styles.categoryStats}>
    {categoryStats.seen}/{categoryStats.total}
  </Text>
</View>
```

## ProgressBar Komponente (Erweiterung)

### Neue Features

```typescript
interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  animationDuration?: number;
  color?: string;
  backgroundColor?: string;
  height?: number;
  style?: ViewStyle;
}
```

### Verbesserungen

1. Animierte Übergänge

   ```typescript
   const animatedWidth = useRef(new Animated.Value(0)).current;

   useEffect(() => {
     Animated.timing(animatedWidth, {
       toValue: progress,
       duration: animationDuration,
       easing: Easing.easeInOut,
       useNativeDriver: false,
     }).start();
   }, [progress]);
   ```

2. Prozentanzeige
   ```jsx
   {
     showPercentage && <Text style={styles.percentage}>{Math.round(progress)}%</Text>;
   }
   ```

## Integration

### HomeScreen

- SetProgressHeader am oberen Rand
- Kategorie-Tabs mit integriertem Fortschritt
- Gesamtübersicht aller Sets

### CardViewScreen

- Kompakte Fortschrittsanzeige
- Automatisches Tracking beim Kartenwechsel
- Kategorie-Badge mit Fortschritt

## Styling

### Themes

```typescript
const progressTheme = {
  colors: {
    primary: '#007AFF',
    background: '#E9E9E9',
    text: '#333333',
    secondaryText: '#666666',
  },
  sizes: {
    progressBarHeight: 6,
    headerHeight: 80,
    categoryHeight: 40,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};
```

### Animationen

- Smooth Transitions (300ms)
- Easing.easeInOut
- Native Driver wo möglich
- Optimierte Performance

## Accessibility

### Features

- VoiceOver/TalkBack Support
- Fortschrittsankündigungen
- Hoher Kontrast Option
- Skalierbare Texte

### Implementierung

```typescript
const accessibilityLabel = `${category} Fortschritt: ${seen} von ${total} Karten gesehen, ${percentage}%`;
```

## Tests

### Unit Tests

```typescript
describe('SetProgressHeader', () => {
  it('should display correct progress', () => {
    const { getByText } = render(<SetProgressHeader setId="test-set" />);

    expect(getByText('5 von 10 Karten gesehen')).toBeTruthy();
  });
});
```

### Integration Tests

- Fortschritts-Updates
- Animationen
- Benutzerinteraktionen

### Snapshot Tests

- Verschiedene Fortschrittsstände
- Theme Variationen
- Responsive Layouts

## Performance Optimierung

### Strategien

1. Memoization von Komponenten
2. Lazy Loading von Statistiken
3. Debounced Updates
4. Virtualisierte Listen

### Beispiel

```typescript
const MemoizedCategoryProgress = React.memo(CategoryProgress, (prevProps, nextProps) => {
  return prevProps.progress === nextProps.progress;
});
```

## Error Handling

### Fallbacks

1. Default Progressbar
2. Placeholder Stats
3. Retry Mechanismus
4. Benutzerfreundliche Fehlermeldungen

### Implementierung

```typescript
const ErrorState = () => (
  <View style={styles.errorContainer}>
    <Text>Fortschritt konnte nicht geladen werden</Text>
    <Button onPress={retryLoading} title="Erneut versuchen" />
  </View>
);
```
