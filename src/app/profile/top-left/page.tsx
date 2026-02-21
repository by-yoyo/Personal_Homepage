import { getGitHubUser } from "@/lib/github";
import Image from "next/image";
import "./page.css";

export default async function TopLeftPage() {
  const userData = await getGitHubUser();

  return (
    <div className="top-left-card">
      <div className="user-info">
        <a 
          href={userData.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="avatar-link"
        >
          <Image
            src={userData.avatar_url}
            alt={`${userData.name || "GitHub用户"}的头像`}
            className="user-avatar"
            width={80}
            height={80}
            unoptimized={false}
          />
        </a>
        <div className="user-details">
          <h2 className="user-name">{userData.name || "未设置名称"}</h2>
          <div className="user-location">
            <span className="location-icon">📍</span>
            <span>{userData.location || "未设置位置"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
