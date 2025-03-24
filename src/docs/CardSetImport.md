# Card Set Import Feature

## Overview

The Card Set Import feature allows users to extend BondBridge with their own custom card sets. Users can import card sets in JSON format, which will be validated and stored locally on their device.

## JSON Format

Card sets must follow this structure:

```json
{
  "packageName": "My Custom Set",
  "description": "A description of the set",
  "image": "basic-set.png",
  "cards": [
    {
      "id": "custom-001",
      "category": "Deep Thoughts",
      "question": "What's your biggest dream?",
      "followUps": ["What steps are you taking to achieve it?"],
      "difficulty": 2
    }
  ]
}
```

### Required Fields

- `packageName`: A unique name for the card set (string)
- `description`: A description of the card set (string)
- `image`: Reference to a predefined image name (string)
- `cards`: Array of card objects, each containing:
  - `id`: Unique identifier for the card (string)
  - `category`: Card category (string)
  - `question`: The main question (string)
  - `followUps`: Array of follow-up questions (string[])
  - `difficulty`: Number from 1-3 indicating difficulty level (number)

## Predefined Images

The following image names are available for use:

- `default-set.png`
- `basic-set.png`
- `intimate-set.png`
- `deep-set.png`
- `growth-set.png`

If an unrecognized image name is provided, the default image will be used.

## Usage

1. Create a JSON file following the format above
2. In the app, tap the "Import New Set" button
3. Select your JSON file
4. The app will validate and import your card set

## Error Handling

The import process may fail for these reasons:

- Invalid JSON format
- Missing required fields
- Invalid data types
- Duplicate package name
- File system errors

Error messages will be displayed to help identify and fix issues.

## Best Practices

1. Use descriptive package names
2. Keep questions concise but meaningful
3. Add relevant follow-up questions
4. Categorize cards appropriately
5. Assign appropriate difficulty levels
6. Test your JSON file before importing

## Technical Details

Imported card sets are stored in the app's document directory and persist across app restarts. The app maintains metadata about imported sets, including the import date and file location.
