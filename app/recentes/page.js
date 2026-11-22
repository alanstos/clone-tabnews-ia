import ContentList from "@/components/ContentList";
import { getContents } from "@/lib/contents";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Conteúdos recentes · TabNews",
};

export default async function RecentPage() {
  const contents = await getContents({ strategy: "new" });

  return <ContentList contents={contents} />;
}
