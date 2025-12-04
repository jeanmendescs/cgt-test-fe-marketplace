## Marketplace

> This application implements an MVP version of a marketplace. It includes a home page that lists the marketplace products, a product-specific page, and a cart page.

## Content Table

- [Marketplace](#marketplace)
- [Content Table](#content-table)
- [Build](#build)
- [Content](#content)
- [Development Practices](#development-practices)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Status](#status)
- [Contact](#contact)

## Content

This project delivers an MVP marketplace application featuring a product-listing home page, dedicated product detail pages, and a cart page. It was built with React.js and styled with SCSS, using Zustand and the React Context API for state management. The application is covered by unit tests using React Testing Library and end-to-end tests with Cypress.

## Build

The application is deployed and available at: [https://cgt-test.netlify.app/](https://cgt-test.netlify.app/)

## Development Practices

The following development practices were adopted throughout the project:

### TypeScript & Type Safety

TypeScript with strict mode, custom type definitions, and strong typing across components and state management.

### Code Organization & Architecture

Feature-based folder structure with path aliases (`@components`, `@pages`, `@store`, etc.), code splitting and component composition patterns.

### Testing Practices

Unit tests with Jest and React Testing Library, plus E2E tests with Cypress covering critical user flows.

### Styling Practices

SCSS with modular architecture, centralized breakpoints and design system variables, component-scoped styles, BEM (CSS naming convention) and CSS reset.

### Breakpoints

- **XXL (Extra Extra Large)**: `1920px`
- **XL (Extra Large)**: `1536px`
- **LG (Large)**: `1200px`
- **MD (Medium)**: `900px`
- **SM (Small)**: `600px`

### State Management

Zustand for global state (cart) and React Context API for feature-specific state, both with TypeScript type safety.

### Build & Tooling

CRACO for CRA customization, SVGR for SVG imports, webpack aliases, and ESLint configuration.

## Screenshots

Desktop Resolution:

![Example screenshot](https://imgur.com/02chqbN.jpg)
![Example screenshot](https://imgur.com/7aOLt7Q.jpg)
![Example screenshot](https://imgur.com/eZ366SG.jpg)

Mobile Resolution:

![Example screenshot](https://imgur.com/pvkbfck.jpg)
![Example screenshot](https://imgur.com/Cc2mUQf.jpg)

## Technologies

- React.js
- JavaScript
- TypeScript
- SCSS
- Zustand
- Jest
- React Testing Library
- Cypress

## Setup

To run the application:

```bash
# Clone the respository
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
