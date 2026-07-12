import LegalPageView from "@/components/sections/LegalPageView";
import { getLegalPageBySlug } from "@/lib/cms-data";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const page = await getLegalPageBySlug("terms");
  return <LegalPageView page={page} />;
}
