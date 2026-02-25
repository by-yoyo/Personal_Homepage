import Link from 'next/link';
import { getDictionary, type Locale } from '@/dictionaries';
import styles from './navbar.module.css';

const NAV_ITEMS = [
	{ key: 'profile', path: '/profile' },
	{ key: 'projects', path: '/projects' },
	{ key: 'activities', path: '/activities' },
	{ key: 'about', path: '/about' },
] as const;

type NavKey = (typeof NAV_ITEMS)[number]['key'];

interface NavbarSlotProps {
	params: Promise<{ language: Locale }>;
}

export default async function NavbarSlot({ params }: NavbarSlotProps) {
	const { language } = await params;
	const dictionary = await getDictionary(language);

	const toggleId = `navbar-toggle-${language}`;

	const linksDict = dictionary.navbar.links as
		| Partial<Record<NavKey, string>>
		| undefined;

	const navItems = NAV_ITEMS.map((item) => ({
		...item,
		href: `/${language}${item.path}`,
		label: linksDict?.[item.key] ?? item.key,
	}));

	return (
		<header>
			<div className={styles.navbarContainer}>
				<input
					id={toggleId}
					type="checkbox"
					className={styles.navToggleCheckbox}
					aria-label={dictionary.navbar.toggle.hide}
				/>

				<div className={styles.navbarGroup}>
					<nav className={styles.navbar} aria-label="Main navigation">
						<div className={styles.navbarTitle}>{dictionary.navbar.title}</div>
						<div className={styles.navbarRight}>
							<div className={styles.navLinks}>
								{navItems.map((item) => (
									<Link
										key={item.key}
										href={item.href}
										className={styles.navLink}
									>
										{item.label}
									</Link>
								))}
							</div>
						</div>
					</nav>

					<div className={styles.toggleButtonWrapper}>
						<label
							htmlFor={toggleId}
							className={styles.toggleButton}
							data-hide-label={dictionary.navbar.toggle.hide}
							data-show-label={dictionary.navbar.toggle.show}
							aria-hidden="true"
						/>
					</div>
				</div>
			</div>
		</header>
	);
}
