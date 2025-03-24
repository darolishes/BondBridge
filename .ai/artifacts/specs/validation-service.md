# Card Set Validation Service Specification

## Overview

This document outlines the technical specifications for the card set validation service in BondBridge.

## Service Structure

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

interface ValidationError {
  code: ValidationErrorCode;
  message: string;
  path?: string;
  details?: unknown;
}

enum ValidationErrorCode {
  INVALID_JSON = 'INVALID_JSON',
  SCHEMA_VIOLATION = 'SCHEMA_VIOLATION',
  DUPLICATE_PACKAGE = 'DUPLICATE_PACKAGE',
  FILE_SIZE_EXCEEDED = 'FILE_SIZE_EXCEEDED',
  INVALID_IMAGE = 'INVALID_IMAGE',
  VERSION_MISMATCH = 'VERSION_MISMATCH',
}

class CardSetValidator {
  validateCardSet(data: unknown): ValidationResult;
  validateSchema(data: unknown): ValidationResult;
  validateMetadata(data: CardSet): ValidationResult;
  validateCards(cards: Card[]): ValidationResult;
  validateImage(imageUrl: string): Promise<ValidationResult>;
}
```

## Validation Steps

1. JSON Structure Validation:

   ```typescript
   function validateJsonStructure(input: string): ValidationResult {
     try {
       JSON.parse(input);
       return { isValid: true, errors: [] };
     } catch (error) {
       return {
         isValid: false,
         errors: [
           {
             code: ValidationErrorCode.INVALID_JSON,
             message: 'Invalid JSON structure',
             details: error,
           },
         ],
       };
     }
   }
   ```

2. Schema Validation:

   ```typescript
   function validateAgainstSchema(data: unknown): ValidationResult {
     // Use JSON Schema validator
     const validator = new Ajv({ allErrors: true });
     const validate = validator.compile(cardSetSchema);

     if (validate(data)) {
       return { isValid: true, errors: [] };
     }

     return {
       isValid: false,
       errors: validate.errors.map(error => ({
         code: ValidationErrorCode.SCHEMA_VIOLATION,
         message: error.message,
         path: error.instancePath,
       })),
     };
   }
   ```

3. Package Name Validation:
   ```typescript
   async function validatePackageName(name: string): Promise<ValidationResult> {
     const exists = await cardSetRepository.exists(name);
     if (exists) {
       return {
         isValid: false,
         errors: [
           {
             code: ValidationErrorCode.DUPLICATE_PACKAGE,
             message: 'Package name already exists',
           },
         ],
       };
     }
     return { isValid: true, errors: [] };
   }
   ```

## Data Sanitization

1. Text Fields:

   ```typescript
   function sanitizeText(text: string): string {
     return text
       .trim()
       .replace(/\s+/g, ' ')
       .replace(/<[^>]*>/g, ''); // Remove HTML tags
   }
   ```

2. Image URLs:
   ```typescript
   function sanitizeImageUrl(url: string): string {
     const sanitized = new URL(url);
     return sanitized.toString();
   }
   ```

## Security Measures

1. File Size Limits:

   - Maximum JSON file size: 10MB
   - Maximum image size: 5MB
   - Enforce limits before processing

2. Content Validation:

   - Strip HTML/script tags
   - Validate image URLs
   - Check file extensions
   - Sanitize all text input

3. Resource Protection:
   - Rate limiting for imports
   - Timeout for validation
   - Memory usage limits

## Error Handling

1. User-Friendly Messages:

   ```typescript
   const errorMessages = {
     INVALID_JSON: 'The file is not a valid JSON file',
     SCHEMA_VIOLATION: 'The card set does not match the required format',
     DUPLICATE_PACKAGE: 'A card set with this name already exists',
     FILE_SIZE_EXCEEDED: 'The file is too large (max 10MB)',
     INVALID_IMAGE: 'The image URL is not valid or accessible',
     VERSION_MISMATCH: 'Incompatible card set version',
   };
   ```

2. Error Recovery:
   - Provide specific error details
   - Suggest fixes when possible
   - Allow retry with corrections

## Performance Considerations

1. Validation Optimizations:

   - Cache schema compilation
   - Batch card validations
   - Async image validation

2. Resource Management:
   - Stream large files
   - Limit concurrent validations
   - Clean up temporary files

## Testing Strategy

1. Unit Tests:

   ```typescript
   describe('CardSetValidator', () => {
     describe('validateJsonStructure', () => {
       it('should validate valid JSON', () => {
         const result = validator.validateJsonStructure('{"valid": true}');
         expect(result.isValid).toBe(true);
       });

       it('should reject invalid JSON', () => {
         const result = validator.validateJsonStructure('invalid');
         expect(result.isValid).toBe(false);
       });
     });

     describe('validateSchema', () => {
       it('should validate valid card set', () => {
         const result = validator.validateSchema(validCardSet);
         expect(result.isValid).toBe(true);
       });

       it('should reject invalid card set', () => {
         const result = validator.validateSchema(invalidCardSet);
         expect(result.isValid).toBe(false);
       });
     });
   });
   ```

2. Integration Tests:
   - Test with real files
   - Test error scenarios
   - Test performance limits

## Implementation Plan

1. Phase 1: Core Validation

   - JSON structure validation
   - Schema validation
   - Basic sanitization

2. Phase 2: Enhanced Validation

   - Image validation
   - Package name checking
   - Version compatibility

3. Phase 3: Security & Performance
   - Resource limits
   - Caching
   - Optimization

## Future Considerations

1. Schema Evolution:

   - Version migration
   - Backward compatibility
   - Feature expansion

2. Performance Improvements:

   - Parallel validation
   - Incremental validation
   - Validation caching

3. Enhanced Security:
   - Content scanning
   - Rate limiting
   - Access control
