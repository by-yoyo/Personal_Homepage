import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export default function RootLayout({
	header,
	navbar,
	children,
	footer,
}: Readonly<{
	header: React.ReactNode;
	navbar: React.ReactNode;
	children: React.ReactNode;
	footer: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{header}
				{navbar}
				{children}
				{footer}
				<div
					className='fixed inset-0 -z-10'
					style={{
						backgroundImage:
							"url('https://img.aur.fan/file/yoyo/img/bg-d/1770887575567_d-1.webp')",
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundAttachment: 'fixed',
					}}
				/>
			</body>
		</html>
	);
}
