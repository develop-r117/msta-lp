import LegalPageView from "@/components/sections/LegalPageView";
import { getLegalPageBySlug } from "@/lib/cms-data";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function PrivacyPolicy() {
  const page = await getLegalPageBySlug("privacy");
  return <LegalPageView page={page} />;
}
