import { getDictionary, type Locale } from '@/dictionaries';
import {
	fetchGitHubEvents,
	fetchGitHubRepos,
	fetchGitHubUserProfile,
} from '@/lib/github';
import styles from './layout.module.css';

interface PageProps {
	params: Promise<{ language: Locale }>;
}

export default async function ProfilePage({ params }: PageProps) {
	const { language } = await params;
	const dictionary = await getDictionary(language);

	const [profile, repos, events] = await Promise.all([
		fetchGitHubUserProfile(),
		fetchGitHubRepos(),
		fetchGitHubEvents(),
	]);

	return (
		<>
			<p className={`${styles['load']}`}>
				<strong>页面标题:</strong> {dictionary.title}
			</p>
			<pre className={styles.jsonBlock}>
				{JSON.stringify({ profile, repos, events }, null, 2)}
			</pre>
		</>
	);
}
