import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import Link from "next/link";
import { AISessionProvider } from "@/components/AISessionProvider";
import { MobileNav } from "@/components/MobileNav";
import { ScrollRestoration } from "@/components/ScrollRestoration";
import "./globals.css";
import "./agency.css";
import "./agency-phase1.css";
import "./agency-refresh.css";
import "./agency-premium.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-mono" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://asaifali-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "AI Engineering Studio | Applied AI for Real Workflows", template: "%s | AI Engineering Studio" },
  description: "Founder-led AI engineering for document-heavy operations, internal knowledge and multi-step workflows. Start with a practical assessment, then build what your business actually needs.",
  applicationName: "AI Engineering Studio",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Engineering Studio | Applied AI for Real Workflows",
    description: "Document intelligence, knowledge systems and workflow automation, engineered around the way your business works.",
    url: SITE_URL,
    siteName: "AI Engineering Studio",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AI Engineering Studio — applied AI for real workflows" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineering Studio",
    description: "Practical AI systems for documents, knowledge and operations.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const nav: string[][] = [
  ["Services", "/services"],
  ["Work", "/#work"],
  ["Technical Lab", "/technical-lab"],
  ["Approach", "/approach"],
  ["Studio", "/studio"],
];

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AI Engineering Studio",
  description: "An independent, founder-led applied AI engineering practice focused on document intelligence, knowledge systems and controlled workflow automation.",
  url: SITE_URL,
  founder: { "@type": "Person", name: "Asaif Ali", url: "https://www.linkedin.com/in/sk-asaif-ali-134873243" },
  sameAs: ["https://github.com/AsaifAli", "https://www.linkedin.com/in/sk-asaif-ali-134873243"],
  areaServed: ["India", "Worldwide"],
  serviceType: ["Document intelligence", "Knowledge and retrieval systems", "Agentic workflow systems", "AI application engineering", "AI evaluation and reliability"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){var root=document.documentElement;var media=window.matchMedia('(prefers-color-scheme: light)');function applyTheme(){var theme=media.matches?'light':'dark';root.dataset.theme=theme;root.style.colorScheme=theme;}applyTheme();if(typeof media.addEventListener==='function'){media.addEventListener('change',applyTheme);}else if(typeof media.addListener==='function'){media.addListener(applyTheme);}})();",
          }}
        />
      </head>
      <body>
        <AISessionProvider>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }} />
          <ScrollRestoration />
          <a className="skip-link" href="#main-content">Skip to content</a>
          <header className="site-header">
            <div className="studio-container nav-inner">
              <Link className="brand" href="/" aria-label="AI Engineering Studio home">
                <span className="brand-symbol" aria-hidden="true">AE</span>
                <span className="brand-wordmark"><strong>AI ENGINEERING</strong><small>INDEPENDENT STUDIO</small></span>
              </Link>
              <nav className="nav-links" aria-label="Primary navigation">{nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
              <Link className="nav-cta" href="/contact">Discuss a workflow <span aria-hidden="true">↗</span></Link>
              <MobileNav nav={nav} />
            </div>
          </header>
          <div id="main-content" tabIndex={-1}>{children}</div>
          <footer className="site-footer">
            <div className="studio-container footer-main">
              <div className="footer-identity"><Link href="/" className="footer-logo"><span className="brand-symbol" aria-hidden="true">AE</span><span><strong>AI ENGINEERING STUDIO</strong><small>INDEPENDENT APPLIED AI PRACTICE</small></span></Link><p>Applied AI, engineered around real workflows. Directly led by Asaif Ali.</p></div>
              <div className="footer-links">
                <div><span className="footer-label">Explore</span><Link href="/services">Services</Link><Link href="/approach">Approach</Link><Link href="/#work">Selected work</Link><Link href="/technical-lab">Technical Lab</Link><Link href="/studio">The studio</Link></div>
                <div><span className="footer-label">Connect</span><Link href="/contact">Project enquiry</Link><a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
                <div><span className="footer-label">Information</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms of use</Link></div>
              </div>
            </div>
            <div className="studio-container footer-bottom"><span>© {new Date().getFullYear()} AI Engineering Studio</span><span>India / Remote</span><span>Scope clearly. Engineer carefully. Hand over transparently.</span></div>
          </footer>
        </AISessionProvider>
      </body>
    </html>
  );
}
