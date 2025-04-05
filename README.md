# Kanji Study Tool ✨📚

A web application built with Next.js to help users learn and test their knowledge of Japanese Kanji using flashcards and multiple-choice quizzes, focusing on Hindi meanings. Features include range selection, dark/light theme switching, and deployment via static export suitable for GitHub Pages.

## Features

*   **Kanji Range Selection:** Choose the specific range of Kanji from the dataset you want to study or quiz on.
*   **Flashcard Mode:**
    *   Displays one Kanji at a time.
    *   Click/tap the card to flip it and reveal Hindi meanings and readings.
    *   Navigate through the selected Kanji range using Previous/Next buttons.
*   **MCQ Quiz Mode:**
    *   Presents a Kanji and multiple-choice options for its Hindi meaning.
    *   Provides immediate feedback (Correct/Incorrect) upon selection.
    *   Highlights the correct answer after selection.
    *   Tracks your score throughout the quiz.
*   **Theme Switching:** 🌓 Toggle between light and dark modes for comfortable viewing. The theme preference is saved locally.
*   **Responsive Design:** Adapts to different screen sizes for use on desktop and mobile.
*   **Static Export:** Configured for static HTML export, making it easy to deploy on platforms like GitHub Pages.

## Live Demo

**(Optional) Add a link to your deployed GitHub Pages site here once it's live:**

[Link to Live Demo]

## Screenshots

**(Optional but Recommended) Insert screenshots of your app here:**

*Replace these lines with actual image markdown:*
`![Settings Screen](link/to/settings_screenshot.png)`
`![Flashcard Mode](link/to/flashcard_screenshot.png)`
`![Quiz Mode (Light)](link/to/quiz_light_screenshot.png)`
`![Quiz Mode (Dark)](link/to/quiz_dark_screenshot.png)`

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) / JavaScript
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Theme Switching:** [next-themes](https://github.com/pacocoursey/next-themes)
*   **Deployment:** Static Export / GitHub Pages

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (Version 18.x or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```
    *(Replace `your-username/your-repo-name` with the actual URL)*

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Populate Kanji Data:**
    *   **Crucial Step:** This project relies on Kanji data provided in a specific format.
    *   Open the file `lib/kanjiData.js`.
    *   Ensure the `kanjiData` array variable contains your complete list of Kanji objects, each having `"Kanji/Radical"`, `"Readings (Hiragana/Katakana)"`, and `"Hindi Meaning/Concept"` keys. The project includes helper functions but *not* the full dataset itself.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment (GitHub Pages)

This project is configured for static export deployment to GitHub Pages using GitHub Actions.

1.  **Configure `next.config.js`:**
    *   Open `next.config.js`.
    *   **IMPORTANT:** Change the `repo` variable value from `'your-repo-name'` to the **actual name of your GitHub repository**.
    *   If you are deploying to your main user/organization page (e.g., `your-username.github.io`), remove or comment out the `basePath` and `assetPrefix` lines entirely. Only keep them if deploying to a repository sub-path (e.g., `your-username.github.io/your-repo-name`).
    *   The `output: 'export'` setting enables static site generation.
    *   Image optimization is disabled (`unoptimized: true`) for easier static deployment.

2.  **GitHub Actions Workflow:**
    *   The `.github/workflows/deploy.yml` file defines the automated build and deployment process.
    *   It triggers on pushes to the `main` branch.

3.  **GitHub Repository Settings:**
    *   Go to your repository's "Settings" tab on GitHub.
    *   Navigate to "Pages" in the sidebar.
    *   Under "Build and deployment", set the "Source" to **"GitHub Actions"**.

4.  **Push to `main`:** Committing and pushing changes to the `main` branch will automatically trigger the deployment workflow. The deployed site URL will be available in the "Pages" settings section after the workflow completes successfully.

## Contributing

> Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

## License
> This project is licensed under the MIT License - see the LICENSE.md file for details (if you add one).