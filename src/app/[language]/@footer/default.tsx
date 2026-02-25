import { ThemeToggle } from "@/components/footer/theme-toggle";

export default function FooterPage() {
	return (
		<>
			<div className='fixed bottom-0 left-0 right-0 z-50 flex items-center p-4'>
				<div className="ml-4">
					<ThemeToggle />
				</div>
			</div>
		</>
	);
}
