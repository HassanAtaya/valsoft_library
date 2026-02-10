# Angular Frontend - Local Setup Guide

## Prerequisites

1. **Node.js v18.20.8** - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node -v` should show `v18.20.8`
2. **Angular CLI 17.3.17** - Install globally:
   ```
   npm install -g @angular/cli@17.3.17
   ```
   - Verify: `ng version`

## Installation Steps

1. Open a terminal and navigate to the frontend folder:
   ```
   cd front_end_angular
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   ng serve
   ```
   or
   ```
   npm start
   ```

4. Open the browser at: `http://localhost:4200`

## Build for Production

```
ng build --configuration production
```

Output will be in: `dist/valsoft-library/browser/`

## Configuration

- `src/environments/environment.ts` - Local development settings
  - Java API URL: `http://localhost:8080/`
  - Python API URL: `http://localhost:5000/`
- `src/environments/environment.prod.ts` - Production settings (used by Docker)

## Notes

- The frontend expects the Java backend running on port `8080` and the Python service on port `5000`
- PrimeNG is used for UI components (tables, dialogs, buttons, etc.)
- All global styles are in `src/styles.scss`
