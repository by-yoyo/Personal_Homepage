import { getGitHubUser } from "@/lib/github";
import "./page.css";

export default async function BottomLeftPage() {
  const userData = await getGitHubUser();

  return (
    <div className="bottom-left-card">
      <a
        href={userData.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link-button"
      >
        访问我的GitHub主页
        <span className="link-arrow">→</span>
      </a>
    </div>
  );
}
