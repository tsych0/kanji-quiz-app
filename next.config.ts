/** @type {import('next').NextConfig} */

// Determine if the deployment is for GitHub Pages
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

// Replace 'your-repo-name' with the actual name of your GitHub repository
// Important: Only set basePath if deploying to a repo page (e.g., user.github.io/repo-name)
// If deploying to a user/org page (e.g., user.github.io), basePath should NOT be set.
const repo = 'kanji-quiz-app'; // CHANGE THIS
const assetPrefix = isGithubActions ? `/${repo}/` : undefined;
const basePath = isGithubActions ? `/${repo}` : undefined;


const nextConfig = {
  // Enable static export
  output: 'export',

  // Configure basePath and assetPrefix for GitHub Pages hosting
  basePath: basePath,
  assetPrefix: assetPrefix,

  // Optional: Disable image optimization if you don't need it or
  // configure a static loader if you use next/image extensively.
  // For simplest deployment to GH Pages, disabling might be easiest.
  images: {
    unoptimized: true, // Disables Next.js Image Optimization (simplest for static export)
    // Or configure a loader if you need optimized images hosted elsewhere
    // loader: 'custom',
    // loaderFile: './my-image-loader.js',
  },

  // Optional: Ensure clean URLs without trailing slashes
  trailingSlash: false,

  // Optional: Add other configurations here if needed
  // reactStrictMode: true,
};

module.exports = nextConfig;