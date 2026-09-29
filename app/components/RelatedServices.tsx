import Link from "next/link";
import { IconArrowRight } from "./icons";
import { getServiceCategory, type ServiceCategory } from "../lib/services-data";

/** "Also check out" links to a category's related categories and their services. */
export default function RelatedServices({ category }: { category: ServiceCategory }) {
  const related = (category.related ?? [])
    .map(getServiceCategory)
    .filter((c): c is ServiceCategory => c !== undefined);

  return related.map((rel) => (
    <div key={rel.slug} className="mt-8 first:mt-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
        Also check out{" "}
        <Link href={`/services/${rel.slug}`} className="text-violet-600 hover:text-violet-700">
          {rel.title}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {rel.children.map((relLeaf) => (
          <Link
            key={relLeaf.slug}
            href={`/services/${rel.slug}/${relLeaf.slug}`}
            className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-sm ring-1 ring-ink/10 transition-colors hover:text-violet-600"
          >
            {relLeaf.title}
            <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  ));
}
