
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { studioMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Service not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return studioMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="studio-main studio-inner-page">
      <section className="studio-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/services">
            ← All services
          </Link>

          <p className="studio-eyebrow">
            {service.number} / {service.eyebrow}
          </p>

          <h1>{service.title}.</h1>
          <p>{service.summary}</p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container studio-detail-intro">
          <div>
            <p className="studio-eyebrow">The engineering work</p>
            <h2>What the capability involves</h2>
          </div>

          <p>{service.detail}</p>
        </div>
      </section>

      <section className="studio-section studio-detail-alt">
        <div className="studio-container studio-detail-columns">
          <article>
            <p className="studio-eyebrow">01 / Where it fits</p>
            <h2>Typical project context</h2>

            <ul>
              {service.fit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <p className="studio-eyebrow">02 / Work products</p>
            <h2>What the work may include</h2>

            <ul>
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container studio-detail-columns">
          <article>
            <p className="studio-eyebrow">
              03 / Engineering practice
            </p>
            <h2>How the system is approached</h2>

            <ul>
              {service.engineering.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <p className="studio-eyebrow">
              04 / Scoping considerations
            </p>
            <h2>What needs to be understood</h2>

            <ul>
              {service.considerations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="studio-contact-cta">
        <div className="studio-container studio-contact-cta-inner">
          <div>
            <p className="studio-eyebrow">Next step</p>
            <h2>Discuss your workflow and constraints.</h2>
            <p>
              Scope depends on the process, systems, access, evaluation
              needs, and delivery responsibilities.
            </p>
          </div>

          <Link
            className="studio-button studio-button-primary"
            href="/contact"
          >
            Project enquiry <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
