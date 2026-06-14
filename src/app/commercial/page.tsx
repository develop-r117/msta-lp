import LegalPageView from "@/components/sections/LegalPageView";
import { getLegalPageBySlug } from "@/lib/cms-data";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function CommercialTransaction() {
  const page = await getLegalPageBySlug("commercial");
  return <LegalPageView page={page} />;
}
