type HeaderRule = {
	source: string;
	headers: { key: string; value: string }[];
};

export function getHeaders(): HeaderRule[] {
	return [
		{
			source: '/:path*.(png|jpg|jpeg|ico)',
			headers: [
				{
					key: 'Cache-Control',
					value: 'public, max-age=86400, immutable',
				},
			],
		},
		{
			source: '/_next/static/:path*.(css|js)',
			headers: [
				{
					key: 'Cache-Control',
					value: 'public, max-age=86400, immutable',
				},
			],
		},
		{
			source: '/:language/:path*',
			headers: [
				{
					key: 'Cache-Control',
					value: 'public, max-age=60, s-maxage=300, stale-while-revalidate=300',
				},
			],
		},
	];
}
