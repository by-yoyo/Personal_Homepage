export interface GitHubUser {
  avatar_url: string;
  html_url: string;
  name: string | null;
  location: string | null;
  public_repos: number;
}

/**
 * 获取GitHub用户信息
 * 直接请求https://api.github.com/users/{username}
 * @returns GitHub用户数据
 */
export async function getGitHubUser(): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/by-yoyo`, {
    next: { revalidate: 30 }
  });
  
  if (!response.ok) {
    throw new Error(`GitHub API请求失败: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // 只返回特定字段
  //头像 主页 昵称 位置 仓库数量
  return {
    avatar_url: data.avatar_url,
    html_url: data.html_url,
    name: data.name,
    location: data.location,
    public_repos: data.public_repos,
  };
}
