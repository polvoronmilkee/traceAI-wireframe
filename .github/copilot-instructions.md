<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## TraceAI - AI Transportation App Wireframe

This project is a Vite + React + TypeScript setup for building a wireframe of an AI-powered transportation application.

### Project Stack

- **Build Tool**: Vite 8.0.1
- **Frontend**: React 19.2.4 with TypeScript
- **Linting**: ESLint with React hooks support

### Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Project Structure

```
src/
  ├── App.tsx           # Main application component
  ├── App.css           # Application styles
  ├── main.tsx          # Application entry point
  ├── vite-env.d.ts     # Vite type definitions
  ├── index.css         # Global styles
  └── assets/           # Static assets

public/               # Public static files
vite.config.ts       # Vite configuration
tsconfig.json        # TypeScript configuration
```

### Development Guidelines

- Use React components to build reusable UI elements for the wireframe
- TypeScript is configured for type safety
- ESLint is configured for code consistency
- Vite provides fast hot module replacement during development

### Notes

- The development server runs on `http://localhost:5173` by default
- Build artifacts are output to the `dist/` directory
- This is a responsive web application suitable for wireframing and prototyping
