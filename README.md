# Trustable - Product Transparency Dashboard

A beautiful, modern web application for displaying product transparency information including lab reports, ingredients, traceability, and more.

## 🚀 Getting Started

This project uses **npm** as the package manager.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080` (or the next available port).

### Building

Build the project for production:

```bash
npm run build
```

Build in development mode:

```bash
npm run build:dev
```

### Preview

Preview the production build:

```bash
npm run preview
```

### Code Quality

Lint your code:

```bash
npm run lint
```

Format your code:

```bash
npm run format
```

## 📦 Features

- **Multi-Product Support**: Scalable routing for multiple product lines
- **Product Pages**: Individual pages for each product with complete transparency
  - `/` - Home page with product catalog
  - `/hazelnut-chocolate` - Hazelnut Chocolate product page
  - Add more products easily (see [ADDING_PRODUCTS.md](ADDING_PRODUCTS.md))
- **Lab Report**: Display and download certified lab test reports (PDF)
- **Ingredient Transparency**: Detailed information about all ingredients with origins
- **Traceability**: Track ingredient supply chain with interactive map
- **QR Codes**: Scannable QR codes for batch verification (unique per product)
- **AI Insights**: AI-generated nutrition analysis
- **Clean Label**: Clear indication of what's NOT in the product
- **Responsive Design**: Beautiful UI that works on all devices

## 🛠️ Tech Stack

- **Framework**: React 19 with TanStack Router & TanStack Start
- **Styling**: Tailwind CSS 4 + Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts
- **Build Tool**: Vite 7
- **Runtime**: Node.js (npm)
- **Deployment**: Docker / Coolify (Self-hosted)

## 📁 Project Structure

```
trustableui/
├── src/                      # Source code
│   ├── assets/              # Static assets (images, PDFs)
│   ├── lib/                 # Utility functions
│   └── routes/              # Application routes
│       ├── __root.tsx       # Root layout
│       ├── index.tsx        # Home page (product catalog)
│       └── hazelnut-chocolate.tsx  # Product page
│                            # Add more: vanilla-cream.tsx, etc.
├── Dockerfile               # Docker container configuration
├── docker-compose.yml       # Docker Compose setup
├── .dockerignore            # Docker build exclusions
├── .env.example             # Environment variables template
├── package.json             # Project dependencies and scripts
├── package-lock.json        # npm lock file
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
├── components.json          # shadcn/ui configuration
├── README.md                # This file
├── ADDING_PRODUCTS.md       # Guide for adding new products
├── STRUCTURE.md             # Repository structure explained
└── COOLIFY_DEPLOYMENT.md    # Deployment guide
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript compiler settings
- `eslint.config.js` - Code linting rules
- `components.json` - shadcn/ui component configuration
- `.prettierrc` - Code formatting rules

## 📝 Notes

- The project has been fully migrated to use **npm** as the package manager
- All dependencies are managed via `package-lock.json`
- QR codes are functional and scannable
- PDF download functionality is implemented

## 🐳 Docker Deployment

### Quick Start with Docker

Build and run using Docker:

```bash
# Build the image
docker build -t trustableui .

# Run the container
docker run -p 3000:3000 trustableui
```

Or use Docker Compose:

```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down
```

The application will be available at `http://localhost:3000`

### Deploy on Coolify

[Coolify](https://coolify.io) is a self-hosted Heroku/Netlify alternative that makes deployment easy.

#### Prerequisites
- A Coolify instance running
- Git repository connected to Coolify

#### Deployment Steps

1. **Connect your repository** to Coolify
2. **Select "Docker Compose" or "Dockerfile"** as the build pack
3. **Set the port** to `3000`
4. **Deploy!** Coolify will automatically:
   - Build the Docker image
   - Run the container
   - Set up SSL/HTTPS
   - Provide a public URL

#### Coolify Configuration

**Port:** `3000`  
**Health Check Path:** `/` (optional)  
**Build Command:** Automatic (uses Dockerfile)  
**Start Command:** Automatic (defined in Dockerfile)

### Environment Variables

If needed, you can add environment variables in Coolify or via a `.env` file:

```env
NODE_ENV=production
PORT=3000
```

## 📦 Docker Details

- **Base Image:** Node 20 Alpine (minimal size)
- **Multi-stage build:** Optimized for production
- **Security:** Runs as non-root user
- **Health Check:** Automatic health monitoring included
- **Port:** 3000 (configurable via environment)

## 🤝 Contributing

1. Install dependencies: `npm install`
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run linter: `npm run lint`
5. Build the project: `npm run build`
6. Commit your changes: `git commit -m 'Add some feature'`
7. Push to the branch: `git push origin feature/your-feature`

## 📄 License

Private project - All rights reserved
