/** @type {import('next').NextConfig} */
<<<<<<< HEAD
const nextConfig = {};

export default nextConfig;
=======
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
				pathname: '/img/**',
			},
		],
	},
};

export default nextConfig;
>>>>>>> 50e42646dc042b1a36895116f7b7601ce7d97a90
