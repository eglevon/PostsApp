# Posts App

Posts App is a web application that allows users to sign in, browse posts, create new posts, and search through existing content. It is built with React and TypeScript to ensure scalability, type safety, and maintainability.

## Features

-   Authentication: Secure sign-in and sign-up with protected routes.
-   Post List: Browse a list of all available posts.
-   View Post: Open a single post to see full details.
-   Creating Post: Add new posts through a simple form.
-   Search: Find posts quickly using keyword search.

## Tech Stack

-   Frontend: Vite + React with TypeScript for type safety and maintainability.
-   Authentication: Zustand for managing user authentication state.
-   State Management and Data Fetching: React Query for server-state management, caching, and efficient API communication.
-   Styling: TailwindCSS for styling the components.

## Installation

### Install dependencies

`npm install`

### Set up API URL

-   Create a .env file in the root directory.
-   Add API URL:
    `VITE_API_URL=api_url_here`

### Start the development server

`npm run dev`

-   Open your browser and navigate to http://localhost:5173/.
