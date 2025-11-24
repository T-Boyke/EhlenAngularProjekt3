# 🌍 Earth Ocean Learning (EOL)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

**Earth Ocean Learning** is an interactive Single Page Application (SPA) designed to teach primary school children about the five world oceans in a playful and engaging way.

This project was developed as a final project for the **IHK Fachinformatiker für Anwendungsentwicklung** certification.

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [Contact](#-contact)

---

## 🌊 About the Project

The goal of this project is to provide a modern, web-based learning solution that works platform-independently. Unlike traditional learning materials (PDFs, static sites), EOL offers an interactive experience with:

*   **Child-friendly UI/UX**: Large buttons, intuitive navigation, and visual feedback.
*   **Gamification**: A star-based reward system to motivate learning.
*   **Privacy First**: No data collection; all progress is saved locally on the device.

## ✨ Features

*   **🗺️ Ocean Selection**: Interactive selection of the 5 world oceans.
*   **📚 Learning Mode**: Discover facts and inhabitants for each ocean.
*   **🧠 Quiz System**: Test your knowledge with multiple-choice questions and immediate feedback.
*   **⭐ Progress Tracking**: Earn stars for correct answers and unlock achievements.
*   **🏆 Master Quiz**: A special challenge unlocked after completing all oceans.
*   **📱 Responsive Design**: Optimized for tablets and desktops.

## 🛠 Tech Stack

*   **Framework**: [Angular 21](https://angular.io/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **State Management**: [NgRx SignalStore](https://ngrx.io/guide/signals)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Build Tool**: Angular CLI
*   **Testing**: Karma / Jasmine

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

*   **Node.js**: You need to have Node.js installed. (Recommended: Latest LTS)
*   **npm**: Usually comes with Node.js.

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project folder.
2.  **Install dependencies**:

    ```bash
    npm install
    ```

### Running the App

**Development Server:**

Run the following command to start the local development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

**Build for Production:**

To build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

**Running Tests:**

To execute unit tests:

```bash
ng test
```

## 📂 Project Structure

The project follows a modular, standalone component architecture:

*   `src/app/features/`: Feature modules and components (Ocean selection, Quiz, etc.).
*   `src/app/models/`: TypeScript interfaces and types.
*   `src/app/services/`: Data services and logic.
*   `src/app/store/`: SignalStore definitions for state management.

## 📚 Documentation

For more detailed information about the project's background, architecture, and design decisions, please refer to the following documents included in this repository:

*   [**IHK_ABSCHLUSSPROJEKT.md**](docs/IHK_ABSCHLUSSPROJEKT.md): Full project documentation including analysis, design, and implementation details.
*   [**BENUTZERHANDBUCH.md**](docs/BENUTZERHANDBUCH.md): User manual (German).

## 👤 Contact

**Developer**: T-Boyke
**Context**: IHK Abschlussarbeit (Final Project)

---

*Generated with ❤️ by Angular CLI & Antigravity*
