import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaSection from "../../components/CtaSection";
import PassportPrep from "../../components/PassportPrep";
import PassportTownLinks from "../../components/PassportTownLinks";
import ServiceCategoryPage from "../../components/ServiceCategoryPage";
import { SERVICE_CATEGORIES, getServiceCategory } from "../../lib/services-data";

export async function generateStaticParams() {
  return SERVICE_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getServiceCategory(slug);
  if (!category) notFound();

  return {
    title: category.title,
    description: category.metaDescription,
    alternates: { canonical: `/services/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getServiceCategory(slug);
  if (!category) notFound();

  return (
    <>
      <ServiceCategoryPage category={category}>
        {category.slug === "passport-photos" && (
          <>
            <PassportTownLinks />
            <PassportPrep />
          </>
        )}
      </ServiceCategoryPage>
      <CtaSection />
    </>
  );
}
