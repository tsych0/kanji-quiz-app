/** @type {import('next').NextConfig} */

// Replace 'your-repo-name' with the actual name of your GitHub repository
const repo = 'kanji-quiz-app'; // <<< CHANGE THIS TO YOUR REPO NAME

// SET THESE UNCONDITIONALLY if deploying to user.github.io/repo-name
const basePath = `/${repo}`;
const assetPrefix = `/${repo}/`;

// --- OR ---

// SET THESE TO UNDEFINED if deploying to user.github.io (root user/org page)
// const basePath = undefined;
// const assetPrefix = undefined;


const nextConfig = {
  // Enable static export
  output: 'export',

  // Configure basePath and assetPrefix for GitHub Pages hosting
  basePath: basePath,
  assetPrefix: assetPrefix,

  // Keep image optimization disabled for static export
  images: {
    unoptimized: true,
  },

  trailingSlash: false,

  // reactStrictMode: true, // Optional
};

module.exports = nextConfig;