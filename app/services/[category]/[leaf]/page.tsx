import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";
import { notFound } from "next/navigation";
import ChristmasTownLinks from "../../../components/ChristmasTownLinks";
import CtaSection from "../../../components/CtaSection";
import HealthCheckPage from "../../../components/HealthCheckPage";
import ServiceLeafPage from "../../../components/ServiceLeafPage";
import { SERVICE_CATEGORIES, getServiceLeaf } from "../../../lib/services-data";

export async function generateStaticParams() {
  return SERVICE_CATEGORIES.flatMap((category) =>
    category.children.map((leaf) => ({ category: category.slug, leaf: leaf.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; leaf: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, leaf: leafSlug } = await params;
  const match = getServiceLeaf(categorySlug, leafSlug);
  if (!match) notFound();

  return {
    ...pageMetadata({
      title: match.leaf.seoTitle ?? match.leaf.title,
      description: match.leaf.metaDescription,
      path: `/services/${categorySlug}/${leafSlug}`,
      image: match.leaf.shareImage,
    }),
  };
}

export default async function LeafPage({
  params,
}: {
  params: Promise<{ category: string; leaf: string }>;
}) {
  const { category: categorySlug, leaf: leafSlug } = await params;
  const match = getServiceLeaf(categorySlug, leafSlug);
  if (!match) notFound();

  // The free health check has its own layout and request form, so it skips the quote CTA.
  if (leafSlug === "search-health-check") return <HealthCheckPage category={match.category} leaf={match.leaf} />;

  return (
    <>
      <ServiceLeafPage category={match.category} leaf={match.leaf} />
      {leafSlug === "christmas-cards" && <ChristmasTownLinks />}
      <CtaSection />
    </>
  );
}
