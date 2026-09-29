import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaSection from "../../../components/CtaSection";
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
    title: match.leaf.title,
    description: match.leaf.metaDescription,
    alternates: { canonical: `/services/${categorySlug}/${leafSlug}` },
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

  return (
    <>
      <ServiceLeafPage category={match.category} leaf={match.leaf} />
      <CtaSection />
    </>
  );
}
