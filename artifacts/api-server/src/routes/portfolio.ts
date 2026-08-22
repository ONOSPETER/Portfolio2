import { Router, type IRouter } from "express";
import { GetPortfolioFeedResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const GITHUB_USERNAME = "ONOSPETER";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const MEDIUM_PROFILE_URL = "https://medium.com/@lex32lex02";
const MEDIUM_FEED_URL = "https://medium.com/feed/@lex32lex02";
const RESEARCHGATE_PROFILE_URL =
  "https://www.researchgate.net/profile/Onoteoghene-Obiegba";

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(value: string) {
  return decodeXml(value)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function xmlTag(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXml(match[1].trim()) : "";
}

function xmlItems(xml: string, tag: string) {
  return [...xml.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "gi"))].map(
    (match) => match[1],
  );
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Peter-Obiegba-Portfolio/2026",
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Upstream request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

async function fetchText(url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: "text/html, application/rss+xml, application/xml",
      "User-Agent": "Mozilla/5.0 Peter-Obiegba-Portfolio/2026",
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Upstream request failed: ${response.status}`);
  return response.text();
}

type GitHubApiRepository = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
};

async function getGitHub() {
  try {
    const repositories = await fetchJson<GitHubApiRepository[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`,
    );
    return {
      username: GITHUB_USERNAME,
      profileUrl: GITHUB_PROFILE_URL,
      repositories: repositories
        .filter((repo) => !repo.fork)
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
        })),
    };
  } catch {
    return { username: GITHUB_USERNAME, profileUrl: GITHUB_PROFILE_URL, repositories: [] };
  }
}

async function getMedium() {
  try {
    const xml = await fetchText(MEDIUM_FEED_URL);
    const articles = xmlItems(xml, "item")
      .slice(0, 8)
      .map((item) => {
        const content = stripHtml(xmlTag(item, "content:encoded") || xmlTag(item, "description"));
        const title = stripHtml(xmlTag(item, "title"));
        const url = xmlTag(item, "link");
        const publishedAt = new Date(xmlTag(item, "pubDate")).toISOString();
        return {
          title,
          url,
          excerpt: content.slice(0, 180) + (content.length > 180 ? "…" : ""),
          publishedAt,
          readingMinutes: Math.max(2, Math.ceil(content.split(/\s+/).length / 200)),
        };
      })
      .filter((article) => article.title && article.url);
    return { profileUrl: MEDIUM_PROFILE_URL, articles };
  } catch {
    return { profileUrl: MEDIUM_PROFILE_URL, articles: [] };
  }
}

async function getResearchGate() {
  const fallback = {
    name: "Onoteoghene Obiegba",
    profileUrl: RESEARCHGATE_PROFILE_URL,
    affiliation: "Undergraduate student at Federal University of Technology",
    publications: 2,
    reads: 60,
    citations: 0,
    about:
      "Passionate about autonomous technology and lightweight algorithms that run smoothly on microprocessors.",
    available: false,
  };

  try {
    const html = await fetchText(RESEARCHGATE_PROFILE_URL);
    const text = stripHtml(html);
    const count = (label: string) => {
      const match = text.match(new RegExp(`(\\d[\\d,]*)\\s*${label}`, "i"));
      return match ? Number(match[1].replace(/,/g, "")) : 0;
    };
    const about = text.match(/About\\s+([\\s\\S]{20,300}?)(?:Contact|Skills|Education)/i)?.[1]?.trim();
    return {
      ...fallback,
      publications: count("Publications") || fallback.publications,
      reads: count("Reads") || fallback.reads,
      citations: count("Citations"),
      about: about || fallback.about,
      available: true,
    };
  } catch {
    return fallback;
  }
}

router.get("/portfolio/feed", async (_req, res) => {
  const [github, medium, researchgate] = await Promise.all([
    getGitHub(),
    getMedium(),
    getResearchGate(),
  ]);
  const data = GetPortfolioFeedResponse.parse({
    updatedAt: new Date().toISOString(),
    github,
    medium,
    researchgate,
  });
  res.json(data);
});

export default router;