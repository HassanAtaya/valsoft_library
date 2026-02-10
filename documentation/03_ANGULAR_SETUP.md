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

Two environment files exist in `src/environments/`:

| File                    | Java API URL               | Python API URL               | Used By        |
|-------------------------|----------------------------|------------------------------|----------------|
| `environment.ts`        | `http://localhost:8080/`   | `http://localhost:5000/`     | Local dev (`ng serve`) |
| `environment.prod.ts`   | `/`                        | `/pyapi/`                    | Docker / production build |

- **Local dev** (`ng serve`): Calls Java at `localhost:8080` and Python at `localhost:5000` directly.
- **Production build** (`ng build --configuration production`): Uses relative URLs. Nginx proxies `/api/` to Java and `/pyapi/` to Python inside the Docker network.

> The `angular.json` has `fileReplacements` configured under the `production` configuration to swap `environment.ts` with `environment.prod.ts` during production builds.

## Notes

- For local development, the frontend expects the Java backend running on port `8080` and the Python service on port `5000`
- For Docker, all traffic goes through Nginx at port `14200` (no direct port access needed)
- PrimeNG is used for UI components (tables, dialogs, buttons, etc.)
- All global styles are in `src/styles.scss`
