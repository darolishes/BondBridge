# Testplan für Fortschrittsverfolgung

## Unit Tests

### ProgressService Tests

1. **Storage Operationen**

```typescript
describe('ProgressService Storage Operations', () => {
  it('should save progress correctly');
  it('should load progress correctly');
  it('should handle missing data');
  it('should merge new cards with existing progress');
  it('should update lastViewedAt timestamp');
});
```

2. **Statistik Berechnung**

```typescript
describe('ProgressService Statistics', () => {
  it('should calculate total progress correctly');
  it('should calculate category progress correctly');
  it('should handle empty sets');
  it('should handle sets with no seen cards');
});
```

3. **Fehlerbehandlung**

```typescript
describe('ProgressService Error Handling', () => {
  it('should retry failed operations');
  it('should fallback to empty progress on error');
  it('should validate data structure');
  it('should handle corrupted storage data');
});
```

### Hook Tests

1. **useProgress Hook**

```typescript
describe('useProgress Hook', () => {
  it('should load initial progress');
  it('should update progress on card view');
  it('should handle loading states');
  it('should handle error states');
  it('should provide category statistics');
});
```

2. **Cache Verhalten**

```typescript
describe('Progress Cache', () => {
  it('should cache frequently accessed data');
  it('should invalidate cache after timeout');
  it('should update cache on changes');
  it('should handle concurrent updates');
});
```

## Integration Tests

### Komponenten Integration

1. **SetProgressHeader**

```typescript
describe('SetProgressHeader Integration', () => {
  it('should update on progress changes');
  it('should animate progress updates');
  it('should handle service errors');
  it('should maintain consistency with storage');
});
```

2. **CategoryProgress**

```typescript
describe('CategoryProgress Integration', () => {
  it('should filter cards by category');
  it('should update on category changes');
  it('should sync with overall progress');
  it('should handle empty categories');
});
```

### System Integration

1. **CardViewScreen Integration**

```typescript
describe('CardViewScreen Progress Integration', () => {
  it('should track viewed cards');
  it('should update progress UI');
  it('should persist progress between sessions');
  it('should handle navigation state');
});
```

2. **HomeScreen Integration**

```typescript
describe('HomeScreen Progress Integration', () => {
  it('should show all sets progress');
  it('should update on set completion');
  it('should handle set filtering');
  it('should sort by progress');
});
```

## End-to-End Tests

### Benutzerszenarien

1. **Normaler Durchlauf**

```typescript
describe('Normal Usage Flow', () => {
  it('should track progress through a complete set');
  it('should maintain progress across app restarts');
  it('should show accurate statistics');
  it('should handle set switching');
});
```

2. **Edge Cases**

```typescript
describe('Edge Cases', () => {
  it('should handle rapid card switching');
  it('should handle app termination mid-update');
  it('should recover from storage corruption');
  it('should handle device storage full');
});
```

## Performance Tests

### Lasttest

1. **Storage Performance**

```typescript
describe('Storage Performance', () => {
  it('should handle large datasets efficiently');
  it('should maintain acceptable read/write times');
  it('should optimize cache usage');
  it('should cleanup old data properly');
});
```
