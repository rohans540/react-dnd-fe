# React Drag and Drop App

This is a React application built with **Vite**, **TypeScript**, **TailwindCSS**, and **React DnD Kit** for drag-and-drop functionality. The app also uses **Mock Service Worker (MSW)** for mocking API requests to simulate real-world API interactions.

## Features

- **Drag and Drop**: Drag-and-drop functionality to reorder items using the `@dnd-kit/core` library.
- **API Mocking**: Mock API calls using Mock Service Worker (MSW) to simulate backend data fetching and saving.
- **Image Handling**: Dynamically assign images to items and retain the correct image per item, even after reordering.
- **Auto Save**: Data is saved every 5 seconds after a change, simulating backend saving behavior.
- **Last Updated Display**: Displays the time since the last update using human-readable time format.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Vite**: A fast build tool that provides a development environment with quick hot-reloading and optimized production builds.
- **TypeScript**: A superset of JavaScript that adds static typing for better development experience.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **React DnD Kit**: A drag-and-drop library for React that provides a set of hooks and components to create complex drag-and-drop interactions.
- **Mock Service Worker (MSW)**: A library for mocking API requests in the browser, allowing you to simulate real server responses during development.

## Setup and Installation

### Prerequisites

Make sure you have the following tools installed:
- **Node.js** (version 14 or higher)
- **npm** or **yarn**

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/rohans540/react-dnd-fe.git
   cd react-dnd-fe

2. Install the dependencies:
   if using npm: npm install
   if using yarn: yarn

3. Run the development server:
   npm run dev or yarn run dev (with yarn)

## Folder structure

src/
├── assets/                 # Images or other static assets
├── components/             # Reusable components like Card, Overlay, LastUpdate
├── hooks/                  # Custom hooks like useFetchData, useLocalStorage
├── mocks/                  # Mock data and handlers for MSW
├── types/                  # TypeScript type definitions
├── App.tsx                 # Main App component
├── index.tsx               # Entry point of the app
├── styles/                 # Global styles
├── constants/              # App constants like API endpoints
└── main.tsx                # Application entry file for Vite

## Addressing the architectural problem

- I started with thinking about breaking the larger problem into smaller atomic problems and then solve them separately step by     step adding new features.
- So i started with setting up a basic react app structure, imported the json data and create Card and Overlay components, then render Cards using the json data array, my next step was adding msw as a dependency and mocking up the server by reading documentation from msw.
- Then i mocked the data from server create endpoints and make sure app was running okay, the next problem i addressed was for adding the drag and drop functionality for that i researched a bit and decided to go with react-dnd-kit and taking help from documentation i suceessfully added the drag and drop functionality.
- After successfully adding drag and drop the next problem i addressed was of data persistance and saving the changes for which i created a hook and saved data from localstorage and also make sure my handler files also fetch data from localstorage only, now the data was persistant and user change is also getting saved in localstorage.
- Now the two problems left were adding a debouncing effect in saving the data to local storage and display the updated time for last saved, so first a added debouncing in saving the data and then created another component UpdateTime and wrote the formatter function in newly created utils folder.