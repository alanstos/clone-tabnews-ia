import { notFound } from "next/navigation";
import ContentList from "@/components/ContentList";
import { getContentsByUser } from "@/lib/contents";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { username } = await params;
  return { title: `${username} · TabNews` };
}

export default async function UserPage({ params }) {
  const { username } = await params;
  const contents = await getContentsByUser(username);

  // Enquanto os dados são mockados, só "existe" quem tem algum conteúdo.
  if (contents.length === 0) notFound();

  return <ContentList contents={contents} heading={username} />;
}
