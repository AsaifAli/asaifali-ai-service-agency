
import type { Metadata } from "next";
import Link from "next/link";
import { AISessionProvider } from "@/components/AISessionProvider";
import { MobileNav } from "@/components/MobileNav";
import { ScrollRestoration } from "@/components/ScrollRestoration";
import "./globals.css";
import "./agency.css";
import "./agency-phase1.css";

const SITE_URL = "https://asaifali-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Engineering Studio | Applied AI, Built as Software",
    template: "%s | AI Engineering Studio",
  },
  description:
    "An independent AI engineering practice designing and building agentic workflows, knowledge systems, document intelligence, and custom AI applications.",
  keywords: [
    "AI engineering studio",
    "Applied AI engineering",
    "Agentic AI development",
    "RAG and knowledge systems",
    "AI workflow automation",
    "Document intelligence",
    "Custom AI applications",
    "AI evaluation",
  ],
  openGraph: {
    title: "AI Engineering Studio | Applied AI, Built as Software",
    description:
      "Design, engineering, and integration for knowledge-heavy work and multi-step business processes.",
    url: SITE_URL,
    siteName: "AI Engineering Studio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineering Studio",
    description:
      "Independent applied AI engineering for workflows, knowledge systems, and custom software.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const nav: string[][] = [
  ["Services", "/services"],
  ["Approach", "/approach"],
  ["Systems", "/#systems"],
  ["Studio", "/studio"],
];

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AI Engineering Studio",
  description:
    "An independent AI engineering practice led by Asaif Ali, focused on applied AI systems, agentic workflows, retrieval, document intelligence, and software integration.",
  url: SITE_URL,
  founder: {
    "@type": "Person",
    name: "Asaif Ali",
    url: "https://www.linkedin.com/in/sk-asaif-ali-134873243",
  },
  sameAs: [
    "https://github.com/AsaifAli",
    "https://www.linkedin.com/in/sk-asaif-ali-134873243",
  ],
  areaServed: "Worldwide",
  serviceType: [
    "AI application engineering",
    "Agentic workflow systems",
    "Knowledge and retrieval systems",
    "Document intelligence",
    "Workflow automation and integration",
    "AI evaluation and safeguards",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="studio-dark">
      <body>
        <AISessionProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(professionalServiceJsonLd),
            }}
          />

          <ScrollRestoration />

          <header className="site-header">
            <div className="studio-container nav-inner">
              <Link
                className="brand"
                href="/"
                aria-label="AI Engineering Studio home"
              >
                <span className="brand-symbol" aria-hidden="true">
                  AE
                </span>

                <span className="brand-wordmark">
                  <strong>AI ENGINEERING</strong>
                  <small>INDEPENDENT STUDIO</small>
                </span>
              </Link>

              <nav className="nav-links" aria-label="Primary navigation">
                {nav.map(([label, href]) => (
                  <Link href={href} key={href}>
                    {label}
                  </Link>
                ))}
              </nav>

              <Link className="nav-cta" href="/contact">
                Start a conversation{" "}
                <span aria-hidden="true">↗</span>
              </Link>

              <MobileNav nav={nav} />
            </div>
          </header>

          {children}

          <footer className="site-footer">
            <div className="studio-container footer-main">
              <div className="footer-identity">
                <Link href="/" className="footer-logo">
                  <span className="brand-symbol" aria-hidden="true">
                    AE
                  </span>

                  <span>
                    <strong>AI ENGINEERING STUDIO</strong>
                    <small>INDEPENDENT APPLIED AI PRACTICE</small>
                  </span>
                </Link>

                <p>
                  Applied AI, engineered around real workflows. Directly
                  led by Asaif Ali.
                </p>
              </div>

              <div className="footer-links">
                <div>
                  <span className="footer-label">Explore</span>
                  <Link href="/services">Services</Link>
                  <Link href="/approach">Approach</Link>
                  <Link href="/#solutions">Signature solutions</Link>
                  <Link href="/#systems">Engineering references</Link>
                </div>

                <div>
                  <span className="footer-label">Connect</span>
                  <Link href="/studio">The studio</Link>
                  <Link href="/contact">Project enquiry</Link>

                  <a
                    href="https://github.com/AsaifAli"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>

                  <a
                    href="https://www.linkedin.com/in/sk-asaif-ali-134873243"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn ↗
                  </a>
                </div>

                <div>
                  <span className="footer-label">Information</span>
                  <Link href="/privacy">Privacy</Link>
                  <Link href="/terms">Terms of use</Link>
                </div>
              </div>
            </div>

            <div className="studio-container footer-bottom">
              <span>
                © {new Date().getFullYear()} AI Engineering Studio
              </span>
              <span>Independent practice · India / Remote</span>
              <span>
                Scope clearly. Engineer carefully. Hand over transparently.
              </span>
            </div>
          </footer>
        </AISessionProvider>
      </body>
    </html>
  );
}
