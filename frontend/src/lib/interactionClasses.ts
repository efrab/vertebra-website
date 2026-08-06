/** Animated underline link (footer, inline text). */
export const linkUnderlineClass = [
  'group/link relative w-fit no-underline',
  'transition-colors duration-300 ease-[var(--ease-out)]',
  'after:absolute after:bottom-[-0.2rem] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current',
  'after:transition-transform after:duration-300 after:ease-[var(--ease-out)]',
  'hover:after:scale-x-100 focus-visible:after:scale-x-100',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta',
].join(' ')

/** Bottom-border CTA link (case cards, insights). */
export const linkCtaClass = [
  'w-fit border-b border-white py-0.5 text-base leading-none no-underline',
  'transition-[color,border-color,transform] duration-300 ease-[var(--ease-out)]',
  'hover:border-magenta-soft hover:text-magenta-soft hover:-translate-y-px',
  'active:translate-y-0',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta',
].join(' ')

/** Mobile nav primary row link. */
export const mobileNavLinkClass = [
  'border-b border-white/10 py-4 text-white no-underline',
  'transition-[color,background-color,border-color,padding-left] duration-300 ease-[var(--ease-out)]',
  'hover:border-white/25 hover:bg-white/[0.03] hover:pl-1',
  'active:bg-white/[0.06]',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta',
].join(' ')

/** Mobile nav nested link. */
export const mobileNavSubLinkClass = [
  'text-white/80 no-underline',
  'transition-[color,transform] duration-300 ease-[var(--ease-out)]',
  'hover:text-white hover:translate-x-0.5',
  'focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta',
].join(' ')

/** Inline body link (privacy, contact channels). */
export const linkInlineClass = [
  'relative w-fit no-underline',
  'transition-[color,opacity] duration-300 ease-[var(--ease-out)]',
  'hover:text-magenta-soft',
  'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-current',
  'after:transition-transform after:duration-300 after:ease-[var(--ease-out)] hover:after:scale-x-75',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta',
].join(' ')

/** Icon / social button. */
export const iconButtonClass = [
  'inline-flex items-center justify-center',
  'transition-[opacity,transform,box-shadow] duration-300 ease-[var(--ease-out)]',
  'hover:scale-110 hover:opacity-90',
  'active:scale-95',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta',
].join(' ')

/** Card-style outline button (narrative CTAs). */
export const cardOutlineButtonClass = [
  'inline-flex h-12 items-center rounded-[2px] border border-white px-4 text-base leading-none text-white no-underline',
  'transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-[var(--ease-out)]',
  'hover:border-magenta hover:bg-magenta hover:-translate-y-px hover:shadow-[0_10px_28px_rgba(139,24,88,0.35)]',
  'active:scale-[0.98]',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta',
].join(' ')

/** Interactive card image link wrapper. */
export const cardMediaLinkClass = [
  'relative block shrink-0 overflow-hidden no-underline',
  'transition-opacity duration-300 ease-[var(--ease-out)]',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta',
].join(' ')
