export const DEFAULT_GITHUB_USERNAME = 'by-yoyo';

export interface GitHubUserProfile {
	avatar_url: string | null;
	name: string | null;
	location: string | null;
	bio: string | null;
	public_repos: number;
}

export interface GitHubRepoSummary {
	name: string;
	full_name: string;
	html_url: string;
	updated_at: string;
	pushed_at: string;
	language: string | null;
	description: string | null;
	homepage: string | null;
	forks: number;
	stargazers_count: number;
}

export interface GitHubEventSummary {
	type: string;
	created_at: string;
}

interface GitHubUserApiResponse {
	avatar_url: string;
	name: string | null;
	location: string | null;
	bio: string | null;
	public_repos: number;
}

interface GitHubRepoApiResponse {
	name: string;
	full_name: string;
	html_url: string;
	updated_at: string;
	pushed_at: string;
	language: string | null;
	description: string | null;
	homepage: string | null;
	forks: number;
	forks_count: number;
	stargazers_count: number;
}

interface GitHubEventApiResponse {
	type: string;
	created_at: string;
}

function userUrl(username: string): string {
	return `https://api.github.com/users/${encodeURIComponent(username)}`;
}

function reposUrl(username: string): string {
	return `https://api.github.com/users/${encodeURIComponent(
		username,
	)}/repos?sort=pushed&per_page=500`;
}

function eventsUrl(username: string): string {
	return `https://api.github.com/users/${encodeURIComponent(
		username,
	)}/events?per_page=500`;
}

async function fetchJson<T>(url: string): Promise<T> {
	const res = await fetch(url, {
		// 轻量缓存，避免频繁触发 GitHub API 限流
		next: { revalidate: 60 },
		headers: {
			Accept: 'application/vnd.github+json',
		},
	});

	if (!res.ok) {
		throw new Error(`GitHub API request failed: ${res.status} ${res.statusText}`);
	}

	return (await res.json()) as T;
}

export async function fetchGitHubUserProfile(
	username: string = DEFAULT_GITHUB_USERNAME,
): Promise<GitHubUserProfile> {
	const raw = await fetchJson<GitHubUserApiResponse>(userUrl(username));

	return {
		avatar_url: raw.avatar_url ?? null,
		name: raw.name ?? null,
		location: raw.location ?? null,
		bio: raw.bio ?? null,
		public_repos: raw.public_repos,
	};
}

export async function fetchGitHubRepos(
	username: string = DEFAULT_GITHUB_USERNAME,
): Promise<GitHubRepoSummary[]> {
	const raw = await fetchJson<GitHubRepoApiResponse[]>(reposUrl(username));

	return raw.map((repo) => ({
		name: repo.name,
		full_name: repo.full_name,
		html_url: repo.html_url,
		updated_at: repo.updated_at,
		pushed_at: repo.pushed_at,
		language: repo.language ?? null,
		description: repo.description ?? null,
		homepage: repo.homepage ?? null,
		forks: repo.forks_count ?? repo.forks ?? 0,
		stargazers_count: repo.stargazers_count ?? 0,
	}));
}

export async function fetchGitHubEvents(
	username: string = DEFAULT_GITHUB_USERNAME,
): Promise<GitHubEventSummary[]> {
	const raw = await fetchJson<GitHubEventApiResponse[]>(eventsUrl(username));

	return raw.map((event) => ({
		type: event.type,
		created_at: event.created_at,
	}));
}

