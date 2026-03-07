import type { NextConfig } from 'next';
import { getHeaders } from './next_config/headers';

const nextConfig: NextConfig = {
	transpilePackages: ['three'],
	output: 'standalone',
	reactCompiler: true,
	async headers() {
		return getHeaders();
	},
};

export default nextConfig;
