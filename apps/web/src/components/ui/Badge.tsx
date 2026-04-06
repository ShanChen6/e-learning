/**
 * Badge – eLearning UI
 *
 * Figma audit:
 *   - Icon badge (orange icon container):  50×50px, radius 8px, fill #f88c3d
 *   - Icon badge (pink):                   69×69px, radius 14px, fill #f3627c
 *   - Status dot (active):                 20×20px, fill #4ee381, stroke #fbecd7
 *   - Status dot (inactive):               20×20px, fill #c4c4c4
 *   - Text pill (inferred from design):    auto×28px, radius 6px, semantic colors
 *
 * Mapped to CSS vars:
 *   Orange icon badge → --color-yellow-400 (#fba333 ≈ Figma #f88c3d)
 *   Pink icon badge   → --color-red-300    (#f88080 ≈ Figma #f3627c)
 *   Active status dot → --color-green-300  (#5beb7b ≈ Figma #4ee381)
 *   Inactive dot      → --color-neutral-400
 *   Text pill radius  → --radius-badge     (6px)
 *
 * Usage:
 *   <Badge variant="success">Enrolled</Badge>
 *   <Badge variant="error" size="lg">Failed</Badge>
 *   <Badge variant="neutral" solid>12</Badge>
 *   <StatusDot active />
 *   <IconBadge color="orange"><CheckIcon /></IconBadge>
 */

import React from 'react'

// ══════════════════════════════════════════════════════
// Badge (text pill)
// ══════════════════════════════════════════════════════

type BadgeVariant = 'success' | 'error' | 'warning' | 'brand' | 'teal' | 'neutral' | 'info'
type BadgeSize    = 'sm' | 'md' | 'lg'

interface BadgeProps {
  variant?:  BadgeVariant
  size?:     BadgeSize
  /** Solid filled variant (white text on colored bg) */
  solid?:    boolean
  children:  React.ReactNode
  className?: string
  style?:    React.CSSProperties
}

/*
 * Figma: text pill radius ~6px → --radius-badge (6px)
 * Figma: small labels use Nunito Sans, 10–12px, 600
 */
const badgeSizeStyles: Record<BadgeSize, React.CSSProperties> = {
  sm: {
    paddingBlock:  'calc(var(--spacing) * 0.5)',   /* 2px  */
    paddingInline: 'calc(var(--spacing) * 1.5)',   /* 6px  */
    fontSize:      'var(--font-size-2xs)',          /* 10px */
    lineHeight:    'var(--leading-2xs)',            /* 14px */
  },
  md: {
    paddingBlock:  'calc(var(--spacing) * 1)',     /* 4px  */
    paddingInline: 'calc(var(--spacing) * 2)',     /* 8px  */
    fontSize:      'var(--font-size-xs)',           /* 12px */
    lineHeight:    'var(--leading-xs)',             /* 16px */
  },
  lg: {
    paddingBlock:  'calc(var(--spacing) * 1)',     /* 4px  */
    paddingInline: 'calc(var(--spacing) * 3)',     /* 12px */
    fontSize:      'var(--font-size-sm)',           /* 14px */
    lineHeight:    'var(--leading-xs)',             /* 16px */
  },
}

type ColorSet = { bg: string; text: string; border: string; solidBg: string }

const variantColors: Record<BadgeVariant, ColorSet> = {
  success: {
    bg:      'var(--color-green-50)',
    text:    'var(--color-text-success-default)',
    border:  'var(--color-border-success-disabled)',
    solidBg: 'var(--color-surface-success-default)',
  },
  error: {
    bg:      'var(--color-red-50)',
    text:    'var(--color-text-error-default)',
    border:  'var(--color-border-error-disabled)',
    solidBg: 'var(--color-surface-error-default)',
  },
  warning: {
    bg:      'var(--color-yellow-50)',
    text:    'var(--color-text-warning-default)',
    border:  'var(--color-border-warning-disabled)',
    solidBg: 'var(--color-surface-warning-default)',
  },
  brand: {
    bg:      'var(--color-primary-50)',
    text:    'var(--color-text-brand-primary)',
    border:  'var(--color-border-brand-disabled)',
    solidBg: 'var(--color-surface-brand-default)',
  },
  teal: {
    bg:      'var(--color-teal-50)',
    text:    'var(--color-teal-700)',
    border:  'var(--color-teal-200)',
    solidBg: 'var(--color-teal-500)',
  },
  neutral: {
    bg:      'var(--color-neutral-100)',
    text:    'var(--color-text-neutral-secondary)',
    border:  'var(--color-neutral-200)',
    solidBg: 'var(--color-surface-neutral-default)',
  },
  info: {
    bg:      'var(--color-lightblue-50)',
    text:    'var(--color-lightblue-500)',
    border:  'var(--color-lightblue-100)',
    solidBg: 'var(--color-lightblue-500)',
  },
}

export function Badge({
  variant   = 'neutral',
  size      = 'md',
  solid     = false,
  children,
  className = '',
  style,
}: BadgeProps) {
  const colors = variantColors[variant]

  const badgeStyle: React.CSSProperties = {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            'calc(var(--spacing) * 1)',      /* 4px */
    borderRadius:   'var(--radius-badge)',           /* Figma: 6–8px */
    border:         `1px solid ${solid ? 'transparent' : colors.border}`,
    fontFamily:     'var(--font-display)',           /* Figma: Nunito Sans */
    fontWeight:     'var(--font-weight-semibold)',   /* Figma: 600 */
    letterSpacing:  'var(--tracking-wider)',         /* Figma: 4% */
    whiteSpace:     'nowrap',
    backgroundColor: solid ? colors.solidBg : colors.bg,
    color:           solid ? 'var(--color-white)' : colors.text,
    ...badgeSizeStyles[size],
    ...style,
  }

  return (
    <span className={className} style={badgeStyle}>
      {children}
    </span>
  )
}

// ══════════════════════════════════════════════════════
// StatusDot  (Figma: 20×20px colored circle)
// ══════════════════════════════════════════════════════

interface StatusDotProps {
  /** Active → green dot; inactive → gray dot */
  active?: boolean
  /** Custom size in px (default: 12) */
  size?: number
  className?: string
}

export function StatusDot({ active = false, size = 12, className = '' }: StatusDotProps) {
  return (
    <span
      className={className}
      style={{
        display:      'inline-block',
        width:        `${size}px`,
        height:       `${size}px`,
        borderRadius: '50%',
        /* Figma: active = #4ee381 ≈ --color-green-300; inactive = #c4c4c4 ≈ --color-neutral-300 */
        backgroundColor: active
          ? 'var(--color-green-300)'
          : 'var(--color-neutral-300)',
        /* Figma: active has stroke #fbecd7 ≈ --color-yellow-50 */
        boxShadow: active
          ? `0 0 0 2px var(--color-yellow-50)`
          : undefined,
        flexShrink: 0,
      }}
      aria-label={active ? 'Active' : 'Inactive'}
      role="status"
    />
  )
}

// ══════════════════════════════════════════════════════
// IconBadge  (Figma: 50×50 / 69×69 rounded square icon bg)
// ══════════════════════════════════════════════════════

type IconBadgeColor = 'orange' | 'pink' | 'teal' | 'blue' | 'green'
type IconBadgeSize  = 'sm' | 'md' | 'lg'

interface IconBadgeProps {
  color?:    IconBadgeColor
  size?:     IconBadgeSize
  children:  React.ReactNode
  className?: string
}

const iconBadgeSizes: Record<IconBadgeSize, { box: number; radius: string }> = {
  sm: { box: 36, radius: 'var(--radius-md)' },           /* 8px radius  */
  md: { box: 50, radius: 'var(--radius-md)' },           /* Figma: 50px / 8px radius */
  lg: { box: 69, radius: 'var(--radius-lg)' },           /* Figma: 69px / 14px ≈ --radius-lg=12px */
}

const iconBadgeColors: Record<IconBadgeColor, string> = {
  /* Figma #f88c3d ≈ --color-yellow-400 (#fba333) */
  orange: 'var(--color-yellow-400)',
  /* Figma #f3627c ≈ --color-red-400 (#f56666) */
  pink:   'var(--color-red-400)',
  teal:   'var(--color-teal-500)',
  blue:   'var(--color-primary-500)',
  green:  'var(--color-green-500)',
}

export function IconBadge({
  color     = 'teal',
  size      = 'md',
  children,
  className = '',
}: IconBadgeProps) {
  const { box, radius } = iconBadgeSizes[size]

  return (
    <span
      className={className}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           `${box}px`,
        height:          `${box}px`,
        borderRadius:    radius,
        backgroundColor: iconBadgeColors[color],
        color:           'var(--color-white)',
        flexShrink:      0,
      }}
    >
      {children}
    </span>
  )
}
