import type { Clip } from "@/app/model/clip";

export const sampleClips: Clip[] = [
  {
    id: 1,
    title: "React Server Components Explained",
    content:
      "React Server Components (RSC) are a new way to build React applications that leverage server-side rendering...",
    type: "article",
    tags: ["react", "frontend", "javascript"],
    date: "2 days ago",
    url: "https://example.com/react-server-components",
  },
  {
    id: 2,
    title: "CSS Grid Layout Cheatsheet",
    content:
      "display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 1rem;\n...",
    type: "code",
    tags: ["css", "frontend", "design"],
    date: "1 week ago",
    url: null,
  },
  {
    id: 3,
    title: "The Art of Simplicity in Design",
    content:
      "Simplicity is about subtracting the obvious and adding the meaningful. It's not about making something without ornament, but about making something very clear.",
    type: "quote",
    tags: ["design", "inspiration"],
    date: "2 weeks ago",
    url: "https://example.com/simplicity-design",
  },
  {
    id: 4,
    title: "Vercel Documentation",
    content: "Official documentation for Vercel platform and features.",
    type: "link",
    tags: ["development", "hosting"],
    date: "1 month ago",
    url: "https://vercel.com/docs",
  },
  {
    id: 5,
    title: "Async/Await Pattern in JavaScript",
    content:
      "async function fetchData() {\n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error fetching data:', error);\n  }\n}",
    type: "code",
    tags: ["javascript", "async", "programming"],
    date: "3 days ago",
    url: null,
  },
];
