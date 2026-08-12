import Link from 'next/link';
import { Clock3, FileCheck2, Mail, Phone, ShieldCheck } from 'lucide-react';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { siteConfig } from '@/lib/seo/site';
import type { LegalPageContent, LegalSection } from '@/lib/legal-pages';

const DISPLAY_PHONE = '+1 (860) 770-9893';

function LegalIcon({ variant }: { variant: LegalPageContent['variant'] }) {
  const Icon = variant === 'privacy' ? ShieldCheck : FileCheck2;

  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}

function LegalSectionBlock({ section }: { section: LegalSection }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-7"
    >
      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {section.title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-300">
        {section.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {section.bullets ? (
        <ul className="mt-5 space-y-3 text-base leading-relaxed text-neutral-300">
          {section.bullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default function LegalPage({ content }: { content: LegalPageContent }) {
  return (
    <div className="bg-brand-dark text-brand-text">
      <section
        aria-labelledby="legal-page-title"
        className="section-hero site-section--reveal relative flex min-h-[52svh] items-end overflow-hidden border-b border-white/5 bg-brand-dark pt-32 pb-12 sm:pt-36 md:pb-16"
      >
        <PageHeroBackground />

        <div className="relative z-10 mx-auto w-full max-w-[1344px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <LegalIcon variant={content.variant} />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                  {content.eyebrow}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-neutral-400">
                  <Clock3 size={15} aria-hidden="true" />
                  Last updated {content.lastUpdated}
                </p>
              </div>
            </div>

            <h1
              id="legal-page-title"
              className="max-w-4xl text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {content.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              {content.description}
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {content.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white/10 bg-black/25 p-4"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-neutral-300">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="site-section site-section--reveal legal-page-content-section relative border-b border-white/5 bg-brand-dark py-12 md:py-16">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
          <aside className="legal-page-sidebar">
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                On This Page
              </h2>
              <nav aria-label={`${content.title} sections`} className="mt-4 space-y-2">
                {content.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-md px-3 py-2 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-brand-gold"
                  >
                    {section.title.replace(/^\d+\.\s*/, '')}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-4 rounded-lg border border-brand-gold/20 bg-brand-gold/10 p-5">
              <p className="text-sm font-semibold text-white">Need help?</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                Contact vBiz Me about account, billing, privacy, or legal questions.
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-neutral-300 transition-colors hover:text-brand-gold"
                >
                  <Mail size={15} aria-hidden="true" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 text-neutral-300 transition-colors hover:text-brand-gold"
                >
                  <Phone size={15} aria-hidden="true" />
                  <span>{DISPLAY_PHONE}</span>
                </a>
              </div>
            </div>
          </aside>

          <article className="space-y-5">
            {content.sections.map((section) => (
              <LegalSectionBlock key={section.id} section={section} />
            ))}

            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-7">
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Related Legal Page
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-300">
                Review the companion legal page for the other terms that apply to vBiz Me.
              </p>
              <div className="mt-5">
                {content.variant === 'privacy' ? (
                  <Link
                    href="/terms-and-conditions"
                    className="inline-flex items-center justify-center rounded-full border border-brand-gold/35 bg-brand-gold/10 px-5 py-2.5 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-black"
                  >
                    Terms and Conditions
                  </Link>
                ) : (
                  <Link
                    href="/privacy-policy"
                    className="inline-flex items-center justify-center rounded-full border border-brand-gold/35 bg-brand-gold/10 px-5 py-2.5 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-black"
                  >
                    Privacy Policy
                  </Link>
                )}
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
