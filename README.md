# Octopus Energy Dashboard

A Next.js dashboard for exploring Octopus Energy data through a small set of internal API routes. The current app focuses on two things: visualising electricity and gas consumption in charts, and exposing raw account and product responses from the Octopus API while the wider dashboard UI is still being built.

Live Demo: https://octopus-energy-dashboard.netlify.app/
Repository: https://github.com/FujikoTide/octopus-energy-dashboard

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Credits](#credits)
- [License](#license)

---

## Overview

This project is a single Next.js application using the App Router. It does not have a separate backend service or database. Instead, server-side route handlers under `src/app/api/octopus` proxy requests to the Octopus Energy API through a small `OctopusEnergy` client in `src/lib/api/octopus.ts`.

This is currently an early work in progress rather than a finished dashboard.

The home page currently renders:

- an electricity consumption chart
- a gas consumption chart
- raw account information as JSON
- raw products information as JSON

What is already in place:

- a working Next.js 16 + React 19 + TypeScript setup
- internal API route handlers for account, consumption, product, and products requests
- a reusable Octopus API client
- chart rendering with Recharts for energy consumption data
- fallback sample data for electricity and gas consumption during development when no API key is supplied
- a Tailwind CSS v4 and shadcn/ui based UI foundation

Current limitations visible in the repo:

- the main page is still very minimal and displays some API responses as raw JSON
- only the consumption endpoint has a mock-data fallback; account and product endpoints still require a valid API key
- the single-product request is currently hardcoded to a fixed tariff path in the API client
- there is scaffolded dashboard code that is not wired into the main page yet
- lint currently reports one existing warning for an unused `product` parameter in `src/lib/api/octopus.ts`

## Features

- Fetches electricity consumption data through `/api/octopus/consumption?energyType=electricity`
- Fetches gas consumption data through `/api/octopus/consumption?energyType=gas`
- Renders both consumption series as line charts using Recharts
- Fetches Octopus account information through `/api/octopus/account`
- Fetches Octopus products through `/api/octopus/products`
- Supports fake sample consumption data for local development if `API_KEY` is not set

## Tech Stack

### Application

- Next.js 16.1
- React 19
- TypeScript

### Styling and UI

- Tailwind CSS v4
- shadcn/ui
- Radix UI primitives
- Lucide React icons
- Sonner

### Data Visualisation

- Recharts

## Architecture

The application flow is straightforward:

1. Client components fetch from internal Next.js API routes.
2. Route handlers instantiate `OctopusEnergy` on the server.
3. `OctopusEnergy` either calls the live Octopus API or, for consumption data in development mode, returns bundled sample data.
4. The UI renders charts or raw JSON responses.

Relevant folders:

```text
src/
	app/
		api/octopus/      # Server route handlers that wrap Octopus API calls
		page.tsx          # Current homepage
	components/
		charts/           # Consumption chart components
		dashboard/        # Scaffolded dashboard components not yet wired in
		ui/               # Account and products UI pieces plus shared UI primitives
	data/               # Bundled sample electricity and gas data
	hooks/              # Client-side data fetching hooks
	lib/
		api/octopus.ts    # Server-side Octopus API client
		types/energy.ts   # Shared types for API payloads
```

## Database Design

This project does not currently use a database.

All data comes from one of two places:

- live Octopus Energy API responses fetched on the server
- bundled sample electricity and gas datasets used for consumption charts during development when `API_KEY` is not set

Because there is no persistence layer yet, there are no application tables, schemas, or stored user records to document.

## API Endpoints

These are the internal application endpoints exposed by this repo:

| Method | Endpoint                                               | Description                                                                                           |
| ------ | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| GET    | `/api/octopus/account`                                 | Returns account information from Octopus                                                              |
| GET    | `/api/octopus/consumption?energyType=electricity`      | Returns electricity consumption data                                                                  |
| GET    | `/api/octopus/consumption?energyType=gas`              | Returns gas consumption data                                                                          |
| GET    | `/api/octopus/products?available_at=2025-01-01T00:00Z` | Returns products available at a given timestamp                                                       |
| GET    | `/api/octopus/product?product=...`                     | Returns a product-related response, though the current implementation is hardcoded to one tariff path |

All route handlers return a consistent envelope:

```ts
type OctopusApiResult<T> = { ok: true; data: T } | { ok: false; error: string }
```

## Installation

```bash
git clone https://github.com/FujikoTide/octopus-energy-dashboard.git
cd octopus-energy-dashboard
npm install
```

To start the local development server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

Other scripts:

```bash
npm run build
npm run start
npm run lint
```

## Environment Variables

Create a `.env` file in the project root. The repo already includes `.env.sample` with the required keys:

```env
ACCOUNT_NUMBER=A-TEST1234
API_KEY=sk_live_your_api_key_here
ELECTRICITY_MPAN=1467839563485
ELECTRICITY_SERIAL=23P4564564
GAS_MPRN=3490803456
GAS_SERIAL=E5098346405936
```

Notes:

- `API_KEY` is required for live Octopus API requests.
- If `API_KEY` is empty, the app can still render the electricity and gas consumption charts because `src/lib/api/octopus.ts` falls back to bundled sample data.
- Account and product requests do not currently have the same fallback, so those sections will error without a valid API key.

## Usage

1. Add the required environment variables to `.env`.
2. Run `npm run dev`.
3. Open the homepage.
4. Review the electricity and gas charts.
5. Inspect the account and products panels, which currently render raw JSON payloads.

If you want to test the project without a live API key, leave `API_KEY` blank and the consumption charts will still render using the bundled sample datasets.

---

## Screenshots

---

## Deployment

The current public deployment is hosted on Netlify:

- Live Demo: https://octopus-energy-dashboard.netlify.app/

The repository is structured as a single Next.js application, so deployment is handled as one app rather than separate frontend and backend services.

## Future Improvements

- Replace the raw JSON account and products output with purpose-built dashboard cards
- Finish wiring the scaffolded dashboard components into the app
- Make the single-product endpoint dynamic instead of hardcoded
- Add validation for query parameters such as `energyType`
- Add tests for the API client, route handlers, and hooks
- Update metadata in `src/app/layout.tsx` so the browser title and description match the project

---

## Credits

Developer: FujikoTide  
GitHub: https://github.com/FujikoTide

---

## License

This project is licensed under the MIT License.
