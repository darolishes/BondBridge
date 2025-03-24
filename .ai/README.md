# BondBridge AI Documentation Structure

## Overview

This directory contains all project documentation following the Memory Bank & Agile Integration structure. The documentation is organized to maintain consistent knowledge and support an agile workflow.

## Directory Structure

```
.ai/
├── project/                # Core project documentation
│   ├── 01-prd.md          # Project Requirements Document
│   ├── 02-arch.md         # Architecture documentation
│   ├── 03-structure.md    # Project structure documentation
│   └── 04-deployment.md   # Deployment configuration
├── stories/               # Central development focus
│   ├── story-*.story.md   # Individual story files
│   └── current-story.md   # Symlink to active story
├── status/                # Session management
│   ├── YYYY-MM-DD.md      # Daily status updates
│   └── active-context.md  # Current task and decisions
└── artifacts/             # Project artifacts
    ├── diagrams/         # Visual representations
    ├── specs/            # Detailed specifications
    └── tests/            # Test strategies
```

## Key Documents

1. **Project Requirements (01-prd.md)**

   - Defines project goals and features
   - Must have "status: approved" before development

2. **Architecture (02-arch.md)**

   - Technical design and structure
   - Must have "status: approved" before development

3. **Stories**

   - Primary working documents
   - Follow template format
   - Include tests and documentation

4. **Status Updates**
   - Created daily
   - Track progress and decisions
   - Reference current stories

## Workflow Rules

1. Start each session with `start-session`:

   - Read latest status update
   - Review current story
   - Check active context

2. End each session with `end-session`:

   - Update story status
   - Create status update
   - Document progress and decisions

3. Follow TDD approach:

   - Write tests first
   - Implement features
   - Ensure all tests pass

4. Maintain documentation:
   - Use prescribed templates
   - Follow naming conventions
   - Keep status updates current

## Templates

All documentation must use established templates from `.cursor/templates/`:

- template-prd.md
- template-arch.md
- template-story.md

## File Naming

- Use kebab-case for all files
- Add numerical prefixes for sequential files
- Stories: story-N-description.story.md
- Status: YYYY-MM-DD.md
