import ContentList from "@/components/ContentList";
import { getContents, getSponsoredContent } from "@/lib/contents";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [contents, sponsored] = await Promise.all([
    getContents({ strategy: "relevant" }),
    getSponsoredContent(),
  ]);

  return <ContentList contents={contents} sponsored={sponsored} />;
}
