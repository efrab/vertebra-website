export type FormTone = 'dark' | 'light'
export type FormSize = 'md' | 'lg'

const controlSizes: Record<FormSize, string> = {
  md: 'min-h-11 px-4 py-2.5 text-base',
  lg: 'min-h-[3.25rem] px-4 py-3.5 text-lg',
}

const controlTones: Record<FormTone, string> = {
  dark: [
    'border-white/35 bg-white/[0.03] text-white placeholder:text-white/45',
    'hover:border-white/55 hover:bg-white/[0.06]',
    'focus:border-white focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]',
  ].join(' '),
  light: [
    'border-border bg-white text-navy placeholder:text-navy-muted',
    'hover:border-navy-tint hover:shadow-[0_2px_12px_rgba(6,26,59,0.06)]',
    'focus:border-magenta focus:shadow-[0_0_0_3px_rgba(139,24,88,0.14)]',
  ].join(' '),
}

const labelTones: Record<FormTone, string> = {
  dark: 'text-white',
  light: 'text-navy',
}

const hintTones: Record<FormTone, string> = {
  dark: 'text-white/60',
  light: 'text-navy-muted',
}

const errorTones: Record<FormTone, string> = {
  dark: 'text-cream',
  light: 'text-magenta',
}

export function formFieldClass(className = '') {
  return ['grid gap-1.5', className].filter(Boolean).join(' ')
}

export function formLabelClass(tone: FormTone, className = '') {
  return ['text-sm font-normal leading-snug', labelTones[tone], className].filter(Boolean).join(' ')
}

export function formHintClass(tone: FormTone, className = '') {
  return ['text-sm leading-snug', hintTones[tone], className].filter(Boolean).join(' ')
}

export function formErrorClass(tone: FormTone, className = '') {
  return ['text-sm leading-snug', errorTones[tone], className].filter(Boolean).join(' ')
}

export function formControlClass(
  tone: FormTone,
  size: FormSize = 'md',
  className = '',
) {
  return [
    'form-control w-full rounded-[4px] border outline-none',
    'transition-[border-color,background-color,box-shadow,transform] duration-300 ease-[var(--ease-out)]',
    'focus-visible:outline-none',
    controlSizes[size],
    controlTones[tone],
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

export function formCheckboxLabelClass(tone: FormTone, className = '') {
  return [
    'form-checkbox group/check flex cursor-pointer items-start gap-3 text-left',
    tone === 'dark' ? 'text-white/85' : 'text-navy-muted',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

export function formCheckboxBoxClass(tone: FormTone) {
  return [
    'form-checkbox__box',
    tone === 'dark' ? 'form-checkbox__box--dark' : 'form-checkbox__box--light',
  ].join(' ')
}

export function formCheckboxInputClass() {
  return 'form-checkbox__input peer sr-only'
}

export function formHeadingClass(tone: FormTone, className = '') {
  return [
    'm-0 font-normal leading-[1.05]',
    tone === 'dark' ? 'text-white' : 'text-navy',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}
