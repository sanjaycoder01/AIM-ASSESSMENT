# CSV Chart App Project

This React.js application allows users to upload CSV files, visualize data with dynamic charts (powered by Google Charts), and download the processed CSV files. The app uses Tailwind CSS for styling and Redux for state management.

## Features

- Upload CSV files for data processing.
- Visualize data using Google Charts.
- Download the processed CSV file.
- Displays a "No data available to download" message dynamically when required.
- Fully responsive UI with modern design.

---

## Table of Contents

2. [Technologies Used]

   React.js: Frontend framework.
   Redux: State management.
   Tailwind CSS: Responsive and modern styling.
   react-google-charts: Chart rendering.
   Papa Parse: CSV parsing.

3. [Folder Structure]
   src/
   ├── components/
   │ ├── ChartRenderer.js
   │ ├── ChartSelector.js
   │ ├── FileUpload.js
   │ ├── Shimmer.js
   ├── pages/
   │ ├── ChartPage.js
   │ ├── DataUploadPage.js
   │
   ├── redux/
   │ ├── dataSlice.js
   │ ├── store.js
   ├── App.js
   ├── index.js

---

## Installation

Follow these steps to set up the project locally:

1. Prerequisites
   Ensure you have the following installed on your system:

Node.js (version 14 or later)

2. Clone the Repository
   Clone the project repository from GitHub or any other version control system:

git clone https://github.com/sanjaycoder01/AIM-ASSESSMENT

3. Navigate to the Project Directory
   Move into the project folder:
   cd <project-directory-name>
4. Install Dependencies
   Install all the required packages:

   npm install

5. Start the Development Server
   Run the project locally:

   npm start

The application will be available at:
http://localhost:3000

6. Deployment Instructions
   i)First Do the installtion Process and then
   ii)Build the Project for Production
   To prepare the app for deployment, build it with:
   npm run build
   6. Deploy the Build
      You can deploy your app using any hosting provider such as:

Netlify:
Push your repository to GitHub.
Connect your repository to Netlify for continuous deployment.

Vercel:
Push your repository to GitHub.
Connect your repository to Vercel to deploy automatically.
