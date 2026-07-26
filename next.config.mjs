/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/ARP2";

const nextConfig = {
  assetPrefix: isGithubPages ? githubPagesBasePath : undefined,
  basePath: isGithubPages ? githubPagesBasePath : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
