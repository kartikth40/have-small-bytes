/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  images: {
    domains: [
      'media.graphassets.com',
      'img.icons8.com',
      'avatars.githubusercontent.com',
    ],
  },
  // turn on this if graphql Too many request error occurs
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
}
