## Marketplace

> This application implements an MVP version of a marketplace. It includes a home page that lists the marketplace products, a product-specific page, a cart page with persistence, and a complete checkout flow.

## Content Table

- [Marketplace](#marketplace)
- [Content Table](#content-table)
- [Build](#build)
- [Content](#content)
- [Features](#features)
- [Development Practices](#development-practices)
- [Performance Optimizations](#performance-optimizations)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Status](#status)
- [Contact](#contact)

## Content

This project delivers an MVP marketplace application featuring a product-listing home page, dedicated product detail pages, a cart page with localStorage persistence, and a complete checkout flow with form validation. The application includes comprehensive error handling with Error Boundary, toast notifications for user feedback, dynamic SEO meta tags, and a 404 page handler. It was built with React.js and styled with SCSS, using Zustand and the React Context API for state management. The application is covered by unit tests using React Testing Library and end-to-end tests with Cypress, including checkout flow tests. The design choice to allow only 1 item of each product in the cart was based on the current behavior of the CGTrader website.

## Features

The application includes the following implemented features:

### Core Functionality

- **Cart Persistence**: Cart state is automatically saved to localStorage and restored on page reload using Zustand's persist middleware
- **Checkout Flow**: Complete checkout form with shipping and payment information, form validation using react-hook-form, and a success page after completion
- **Error Handling**: Error Boundary component that catches React errors, displays user-friendly error messages, and provides recovery options
- **404 Route Handler**: Catch-all route that displays a custom 404 page for invalid URLs

### User Experience

- **Toast Notifications**: Real-time feedback using react-toastify for cart actions (add, remove, clear) and user notifications
- **Loading States**: Loading component with spinner displayed during code-split route loading and async operations
- **Confirm Dialog**: Reusable dialog component with keyboard handling and focus management for critical actions like clearing the cart
- **URL Validation**: Automatic validation of product ID parameters with redirect to 404 for invalid numeric IDs

### SEO & Meta Tags

- **Dynamic SEO Meta Tags**: Complete meta tag implementation using react-helmet-async with Open Graph and Twitter/X cards
- **Product-Specific Meta**: Dynamic product titles, descriptions, images, and prices for social sharing

### Type Safety

- **Type Guards**: Proper type guard functions instead of unsafe type assertions, particularly for cart persistence state validation

## Build

The application is deployed and available at: [https://cgt-test.netlify.app/](https://cgt-test.netlify.app/)

## Development Practices

The following development practices were adopted throughout the project:

### TypeScript & Type Safety

TypeScript with strict mode, custom type definitions, and strong typing across components and state management.

### Code Organization & Architecture

Feature-based folder structure with path aliases (`@components`, `@pages`, `@store`, etc.), code splitting and component composition patterns.

### Code Splitting & Lazy Loading

All routes are lazy loaded using `React.lazy()` for optimal bundle size:

- Home page, Cart page, Product Detail page, Checkout page, and 404 page are all code-split
- Suspense wrapper with Loading component fallback for smooth loading transitions
- Reduced initial bundle size for faster page loads

### Testing Practices

Unit tests with Jest and React Testing Library, plus E2E tests with Cypress covering critical user flows including the complete checkout process.

### Styling Practices

SCSS with modular architecture, centralized breakpoints and design system variables, component-scoped styles, BEM (CSS naming convention) and CSS reset.

### Breakpoints

- **XXL (Extra Extra Large)**: `1920px`
- **XL (Extra Large)**: `1536px`
- **LG (Large)**: `1200px`
- **MD (Medium)**: `900px`
- **SM (Small)**: `600px`

### State Management

Zustand for global state (cart) and React Context API for feature-specific state, both with TypeScript type safety. Cart state persists to localStorage automatically.

### Error Handling

Error Boundary implementation that:

- Catches React component errors throughout the application
- Displays user-friendly error messages
- Provides error reset and page reload functionality
- Wraps both the router and layout components for comprehensive coverage

### SEO Optimization

Dynamic meta tag management using react-helmet-async:

- Open Graph tags for social media sharing
- Twitter/X card support
- Dynamic product-specific meta tags
- Proper URL construction for social sharing

### Build & Tooling

CRACO for CRA customization, SVGR for SVG imports, webpack aliases, and bundle size analysis with source-map-explorer.

## Performance Optimizations

The application implements several performance optimizations:

### Code Splitting & Route-based Lazy Loading

- All routes are dynamically imported using `React.lazy()`
- Suspense boundaries with Loading fallback components
- Reduced initial JavaScript bundle size

### Image Lazy Loading

- Smart lazy loading strategy based on viewport and product index
- First visible products load eagerly, others use `loading="lazy"` attribute
- Product detail images use eager loading for immediate display
- Cart item images use lazy loading for optimal performance

### Component Memoization

- `React.memo` used on Product and CartItem components to prevent unnecessary re-renders
- Optimizes rendering performance when parent components update

### Bundle Size Analysis

- Integrated source-map-explorer for bundle analysis
- Webpack performance budgets configured (300KB warning threshold)
- Available npm scripts:
  - `npm run analyze`: Build and analyze bundle
  - `npm run analyze:only`: Analyze existing build
  - `npm run analyze:html`: Generate HTML report

## Screenshots

Desktop Resolution:

![Example screenshot](https://imgur.com/89FVPRf.jpg)
![Example screenshot](https://imgur.com/nYg5QQz.jpg)
![Example screenshot](https://imgur.com/7gaOZqB.jpg)
![Example screenshot](https://imgur.com/BYW2qMJ.jpg)
![Example screenshot](https://imgur.com/lvj4uNI.jpg)
![Example screenshot](https://imgur.com/Wc3xzfX.jpg)

Mobile Resolution:

![Example screenshot](https://imgur.com/igfddjP.jpg)
![Example screenshot](https://imgur.com/QxZWL0c.jpg)

## Technologies

### Core

- React.js
- TypeScript
- JavaScript
- SCSS

### State Management & Routing

- Zustand (global state management with persistence)
- React Router DOM (routing and navigation)
- React Context API (feature-specific state)

### Forms & Validation

- React Hook Form (form validation and management)
- React Number Format (formatted number inputs)

### UI & UX

- React Toastify (toast notifications)
- React Helmet Async (dynamic SEO meta tags)

### Testing

- Jest (unit testing)
- React Testing Library (component testing)
- Cypress (end-to-end testing)

### Build & Development Tools

- CRACO (Create React App customization)
- SVGR (SVG imports)
- Source Map Explorer (bundle analysis)
- ESLint (code linting)

## Setup

To run the application:

```bash
# Clone the repository
git clone https://github.com/jeanmendescs/cgt-test-fe-marketplace.git

# Open the project's folder on your terminal
$ cd cgt-test-fe-marketplace-main

# Install project's dependencies separatelly for client and server
$ npm install

# To start the server without a seeded database
$ npm start
```

To run test suites:

```bash
# Run Unit test (Jest and React Testing Library)
npm test

# Run E2E tests - headless mode (Cypress)
$ npm run cypress:run

# Run E2E tests - open Cypress GUI
$ npm run cypress:open
```

To analyze bundle size:

```bash
# Build and analyze bundle size
npm run analyze

# Analyze existing build
npm run analyze:only

# Generate HTML bundle report
npm run analyze:html
```

## Status

Finished.

## Contact

<div style="display:flex">
<a href="https://github.com/jeanmendescs">
 <img height="auto" src="https://avatars3.githubusercontent.com/u/57002849?s=400&u=fff71a8a729144edec9bfd51b2d6dd89af52e00a&v=4" width="100px;" alt="Jean's Profile Picture"/>
 <br />
 <sub style="display:block; text-align:center;"><span >Jean Carlos</span></sub></a> <a href="https://github.com/jeanmendescs" title="Jean's Profile Picture"></a>
</div>

Feel free to get in touch.

<div style="display: inline-block;">
<a href="https://www.linkedin.com/in/jean-mendes//"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Profile" ></a>

<a href="mailto:mendes.jean.cs@gmail.com"><img src="https://img.shields.io/badge/gmail-D14836?&style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" ></a>

</div>
