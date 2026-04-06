/**
 * Button – eLearning UI
 *
 * Figma audit:
 *  - CTA pill buttons:  corner-radius 80px, fill teal #49bbbd or pink #d8587e
 *  - Tab/form buttons:  corner-radius 33–36px, fill teal #49bbbd
 *  - Ghost nav button:  transparent, text #5b5b5b (Login nav link)
 *  - All text:          Poppins, 16–24px, Medium/SemiBold, white
 *
 * Mapped to CSS vars:
 *  - Primary CTA   → --color-teal-500   (#49bbbd)
 *  - Accent/Danger → --color-red-300    (#f88080 ≈ Figma #d8587e pink CTA)
 *  - Radius pill   → --radius-full      (9999px – covers Figma 80px)
 *  - Radius form   → --radius-3xl       (40px ≈ Figma 36–40px form buttons)
 *
 * Usage:
 *   <Button variant="primary">Join for free</Button>
 *   <Button variant="accent" size="sm" rightIcon={<Arrow />}>See all</Button>
 *   <Button variant="ghost">Login</Button>
 */

import React from 'react'

// ─── Types ───────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant
  size?:      ButtonSize
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  /** Render as <a> or any other element */
  as?: React.ElementType
  href?: string
}

// ─── Styles ──────────────────────────────────────────────────────────

const base = [
  'inline-flex items-center justify-center gap-2',
  'font-sans font-medium tracking-wide',
  'border transition-all duration-150',
  'cursor-pointer select-none',
  'disabled:cursor-not-allowed disabled:opacity-60',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
].join(' ')

/*
 * Figma radius:
 *   Nav / hero buttons → 80px   → CSS: rounded-btn (--radius-full)
 *   Form submit buttons → 36px  → CSS: rounded-3xl (--radius-3xl = 40px, nearest token)
 */
const variants: Record<ButtonVariant, string> = {
  /**
   * Teal filled – Figma: Login/Register submit, Tab pill
   * fill: --color-teal-500 | text: white | radius: --radius-3xl
   */
  primary: [
    'rounded-btn text-white',
    'border-transparent',
    'focus-visible:outline-[var(--app-ring)]',
  ].join(' '),

  /**
   * Indigo filled – secondary actions
   * fill: --color-primary-500 | text: white
   */
  secondary: [
    'rounded-btn text-white',
    'border-transparent',
    'focus-visible:outline-[var(--app-ring)]',
  ].join(' '),

  /**
   * Accent pink – Figma: "Join Now" CTA (#d8587e → --color-red-300 nearest)
   * fill: --color-red-400 | text: white
   */
  accent: [
    'rounded-btn text-white',
    'border-transparent',
    'focus-visible:outline-[var(--color-red-300)]',
  ].join(' '),

  /**
   * Outline – border only, no fill
   * border: --color-teal-500 | text: --color-teal-500
   */
  outline: [
    'rounded-btn bg-transparent',
    'focus-visible:outline-[var(--app-ring)]',
  ].join(' '),

  /**
   * Ghost – Figma: "Login" nav link (transparent, dark text)
   * fill: transparent | text: --color-neutral-600
   */
  ghost: [
    'rounded-btn bg-transparent border-transparent',
    'focus-visible:outline-[var(--color-neutral-300)]',
  ].join(' '),
}

/*
 * Figma sizing:
 *   Hero Join: 220×80px → lg
 *   Nav Login/SignUp: 160×60px → md
 *   Tab / Submit: ~232×49px → md
 *   See All link button: 171×39px → sm
 */
const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-base  gap-1.5',   /* Figma: 39px h, 16px text */
  md: 'h-14 px-6 text-xl   gap-2',      /* Figma: ~50-60px h, 22px  */
  lg: 'h-20 px-8 text-2xl  gap-2.5',    /* Figma: 80px h, 24px      */
}

// Inline style maps (can't express with static classes since values come from CSS vars)
const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-teal-500)',
    borderRadius:    'var(--radius-3xl)',
  },
  secondary: {
    backgroundColor: 'var(--color-primary-500)',
    borderRadius:    'var(--radius-3xl)',
  },
  accent: {
    backgroundColor: 'var(--color-red-400)',
    borderRadius:    'var(--radius-pill)',
  },
  outline: {
    border:      '1.5px solid var(--color-teal-500)',
    color:       'var(--color-teal-600)',
    borderRadius: 'var(--radius-pill)',
  },
  ghost: {
    color:        'var(--color-neutral-600)',
    borderRadius: 'var(--radius-pill)',
  },
}

const hoverStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary:   { backgroundColor: 'var(--color-teal-700)' },
  secondary: { backgroundColor: 'var(--color-primary-700)' },
  accent:    { backgroundColor: 'var(--color-red-600)' },
  outline:   { backgroundColor: 'var(--color-surface-teal-secondary-hover)' },
  ghost:     { backgroundColor: 'var(--color-surface-neutral-secondary-hover)' },
}

// ─── Component ───────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant    = 'primary',
      size       = 'md',
      leftIcon,
      rightIcon,
      isLoading  = false,
      as: Tag    = 'button',
      children,
      style,
      className  = '',
      disabled,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref,
  ) => {
    const [hovered, setHovered] = React.useState(false)

    const combinedStyle: React.CSSProperties = {
      ...variantStyles[variant],
      ...(hovered && !disabled && !isLoading ? hoverStyles[variant] : {}),
      // shadow for filled variants
      ...(variant === 'primary' || variant === 'secondary'
        ? { boxShadow: 'var(--shadow-btn)' }
        : {}),
      ...(variant === 'accent'
        ? { boxShadow: 'var(--shadow-btn)' }
        : {}),
      ...style,
    }

    return (
      <Tag
        ref={ref}
        className={[base, variants[variant], sizes[size], className].join(' ')}
        style={combinedStyle}
        disabled={disabled || isLoading}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          setHovered(true)
          onMouseEnter?.(e)
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          setHovered(false)
          onMouseLeave?.(e)
        }}
        {...rest}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </Tag>
    )
  },
)

Button.displayName = 'Button'

// ─── Loading spinner ──────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: 'spin 0.7s linear infinite' }}
    >
      <circle
        cx="8" cy="8" r="6"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
