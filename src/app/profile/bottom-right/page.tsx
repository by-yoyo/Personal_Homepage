import { getGitHubUser } from "@/lib/github";
import "./page.css";

export default async function BottomRightPage() {
  const userData = await getGitHubUser();

  return (
    <div className="bottom-right-card">
      <div className="repo-stats">
        <h3 className="stats-title">仓库统计</h3>
        <div className="repo-count">
          <span className="count-number">{userData.public_repos}</span>
          <span className="count-label">个公开仓库</span>
        </div>
        <p className="stats-description">
          在GitHub上共有 {userData.public_repos} 个公开仓库
        </p>
      </div>
    </div>
  );
}
