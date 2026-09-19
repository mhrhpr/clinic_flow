import Link from "next/link";

export function AidaBrand({ compact = false, href = "/" }: { compact?: boolean; href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-3" aria-label="کلینیک آیدا">
      <span className="aida-mark" aria-hidden="true">
        <svg viewBox="0 0 44 44" fill="none" role="img">
          <path d="M22 6.5 34.8 13.9v16.2L22 37.5 9.2 30.1V13.9L22 6.5Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14.7 28.5 22 15l7.3 13.5M17.8 23h8.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={compact ? "hidden sm:inline-flex flex-col leading-none" : "flex flex-col leading-none"}>
        <strong className="text-[1.05rem] font-bold tracking-tight">کلینیک آیدا</strong>
        <span className="mt-1 text-[10px] font-medium tracking-[0.18em] text-[var(--muted)]">AIDA CLINIC</span>
      </span>
    </Link>
  );
}