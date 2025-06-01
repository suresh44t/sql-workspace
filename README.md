# SQL Query Playground

An interactive SQL query editor and visualization tool for exploring and analyzing data.

## How to Start the Project

### Prerequisites
- Node.js >= 16
- npm >= 8

### Development Setup
1. Install dependencies and setup environment:
```bash
chmod +x setup.sh
./setup.sh
```

2. Start development server:
```bash
npm start
```

3. Run tests:
```bash
npm test
```

### Production Build
1. Build optimized bundle:
```bash
npm run build
```

2. Serve production build:
```bash
npm run serve
```

### Available Scripts
- `npm start` - Start development server
- `npm test` - Run test suite
- `npm run build` - Create production build
- `npm run serve` - Serve production build
- `npm run lint` - Check code style

## Features

### Must-Have Features (Core Functionality)

- **SQL Query Editor**
  - Query execution
  - Syntax highlighting and validation
  
- **Query Results**
  - Tabular data display with pagination
  - Searching
  - Column sorting
  - Export results to CSV/Excel/JSON
  
- **History Management**
  - Track query executions
  - Store execution metadata (time, rows)
  - Quick access to recent queries

- **Notifications**
  - Toast notifications for actions
  - Error handling and display
  - Success/warning/info messages

### Nice-to-Have Features (Value-Add)

- **Query Templates**
  - Predefined query examples
  - Company-specific queries
  
- **Results Analysis**
  - Query execution statistics
  - Performance metrics tracking
  
- **UI Customization**
  - Responsive layout
  - Accessible design
  - Keyboard shortcuts

### Non-Functional Requirements

- **Performance**
  - Fast query execution
  - Efficient state management
  - Optimized rendering
  
- **Accessibility**
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
  
- **Maintainability**
  - TypeScript type safety
  - Component modularity
  - Consistent code style

## Design

### Layout (Component Hierarchy)

```
App
├── Workspace
│   ├── Query Editor
│   └── Results Grid
│       ├── Toolbar
│       ├── Data Table
│       └── Pagination
├── History Panel
└── Toast Notifications
```

## Implementation

### Folder Structure

```
src/
├── components/              # UI Components
│   ├── common/             # Reusable components
│   └── features/           # Feature components
│       ├── History/        # Query history management
│       ├── Query/          # SQL editor interface
│       ├── Results/        # Query results display
│       ├── Toasts/        # Notification system
│       └── Workspace/      # Main layout container
├── constants/              # App constants
├── data/                  # Mock data
├── hooks/                 # Custom React hooks
├── store/                 # Redux store
│   └── slices/            # Redux slices
├── styles/                # Global styles
├── types/                 # TypeScript types
└── utils/                 # Helper functions
```

### Data Flow

1. User Interaction Flow (Components → Hooks → Store):
```
Component Interaction
└── Query Component (SQL editor)
    └── useQuery Hook
        ├── Manages editor state
        └── Dispatches actions to store
            └── executeQuery thunk
                ├── Updates query state
                ├── Updates results state
                └── Updates history state
```

2. State Updates Flow (Store → Components):
```
Redux Store
├── Query Slice
│   ├── Editor text
│   ├── Syntax validity
│   └── Language selection
│
├── Results Slice
│   ├── Query results
│   ├── Execution status
│   └── Error handling
│
└── History Slice
    ├── Execution records
    └── Performance stats
```

3. Component Update Flow:
```
Store Updates
└── Memoized Selectors
    └── Custom Hooks
        ├── useQuery
        │   └── Query Component
        ├── useResults
        │   └── Results Grid
        └── useHistory
            └── History Panel
```

### Patterns Followed

#### Components
- Atomic design principles
  - Common reusable components
  - Feature-specific components
  - Layout containers
- Presentational/Container pattern
  - Separation of logic and UI
  - Props-driven components
  - Reusable hooks
- Error boundary implementation
  - Graceful error handling
  - Error state UI
  - Error recovery

#### Hooks
- Custom hooks for state logic
  - Feature-specific hooks
  - Reusable state management
  - Cross-cutting concerns
- Memoization for performance
  - Cached computations
  - Optimized rerenders
  - Dependency tracking
- Event handling
  - Debounced updates
  - Async operations
  - Cleanup functions

#### Slices
- Redux toolkit slices
  - Feature-based organization
  - Action creators
  - Reducer logic
- Immutable state updates
  - Structured updates
  - Normalized state
  - Performance optimizations
- Typed actions/reducers
  - Type-safe mutations
  - Payload validation
  - State guarantees

#### Store
- Centralized state management
  - Redux store configuration
  - Feature-based slices
  - Typed state interface
- Typed selectors
  - Memoized selectors
  - Type-safe state access
  - Computed state values
- Thunk middleware
  - Async operations
  - Side effects handling
  - Action composition

#### Styles
- SCSS modules
  - Scoped styles
  - Component isolation
  - Style composition
- CSS variables
  - Theme configuration 
  - Dynamic updates
  - Consistent values
- Responsive design
  - Mobile-first approach
  - Breakpoint system
  - Fluid typography

#### Types
- TypeScript interfaces
  - Domain models
  - Component props
  - State shapes
- Strict type checking
  - Type inference
  - Generic constraints
  - Union types
- Type organization
  - Feature grouping
  - Common types
  - Type composition

### Technologies Used

#### Core Dependencies
- React 18.2 - UI library
- TypeScript 4.9 - Type safety
- Redux Toolkit 1.9 - State management
- SCSS Modules - Styling solution

#### Development Tools
- Create React App 5.0 - Build tooling
- ESLint 8.0 - Code linting
- Prettier 2.8 - Code formatting
- Jest 29.0 - Testing framework

### 3rd Party Libraries

#### UI Components
- @tanstack/react-table v8.9 - Advanced table functionality with sorting and filtering
- @codemirror/react v6.0 - SQL editor with syntax highlighting

#### Data Management
- file-saver v2.0 - File download handling
- xlsx v0.18 - Excel file generation
- uuid v9.0 - Unique ID generation

#### Testing & Monitoring
- @testing-library/react v13.0 - Component testing utilities
- @testing-library/jest-dom v5.16 - DOM testing assertions
- web-vitals v3.0 - Performance metrics tracking

## Artifacts

### GitHub Repo with Code
☐ [SQL Workspace Repository](https://github.com/suresh44t/sql-workspace)

### Vercel Live Demo
☐ [SQL Workspace Demo](https://sql-workspace-afa5d.web.app)

### Walkthrough Video
☐ [Video Link]

## Deliverables Checklist

| Deliverable           | Status |
| --------------------- | ------ |
| Code Repository       |    ✓   |
| Live Demo             |    ✓   |
| Walkthrough Video     |    ☐   |
| README with details   |    ✓   |
