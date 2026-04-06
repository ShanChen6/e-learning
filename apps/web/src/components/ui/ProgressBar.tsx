/**
 * ProgressBar – eLearning UI
 *
 * Figma audit:
 *   - Progress bars found in "Tools For Teachers And Learners" section
 *   - Color: #3793ff (blue fill bar) → --color-lightblue-300 (#74b7ff nearest)
 *   - Track: #c9d3e766 (translucent gray) → --color-neutral-200 w/ opacity
 *   - Height: ~4–8px thin bars (inferred from user profile card layout)
 *   - Corner-radius: --radius-xs (2px) for track and fill (Figma: 5.5px → nearest xs=2)
 *   - Label: Poppins, 11px SemiBold (Nunito Sans badge scale)
 *
 * Additional course card progress bars:
 *   - Fill: --color-teal-500 for course completion
 *   - Track height: 6px consistent
 *
 * Usage:
 *   <ProgressBar value={72} />
 *   <ProgressBar value={45} variant="teal" size="sm" label="Course completion" />
 *   <ProgressBar value={90} variant="brand" showValue />
 *   <CircularProgress value={75} size={80} />
 */

import React from 'react'

// ══════════════════════════════════════════════════════
// Linear ProgressBar
// ══════════════════════════════════════════════════════

type ProgressVariant = 'teal' | 'brand' | 'blue' | 'success' | 'warning' | 'error'
type ProgressSize    = 'xs' | 'sm' | 'md' | 'lg'

interface ProgressBarProps {
  /** 0–100 */
  value:       number
  variant?:    ProgressVariant
  size?:       ProgressSize
  label?:      string
  showValue?:  boolean
  /** Animate the fill on mount */
  animated?:   boolean
  className?:  string
  style?:      React.CSSProperties
}

/*
 * Figma: thin bar ~4–8px in instructor profile cards
 * Track radius matches fill radius (Figma: ~5.5px → --radius-xs = 2px is closest;
 * using --radius-sm = 6px for a softer look that rounds full end caps at narrow heights)
 */
const progressSizeMap: Record<ProgressSize, number> = {
  xs: 4,   /* minimal indicator */
  sm: 6,   /* Figma: profile card bars ~6px */
  md: 8,   /* standard */
  lg: 12,  /* prominent */
}

const progressFillColors: Record<ProgressVariant, string> = {
  /* Figma: #3793ff → --color-lightblue-300 (#74b7ff) nearest */
  blue:    'var(--color-lightblue-300)',
  /* Course progress → teal */
  teal:    'var(--color-teal-500)',
  /* Primary brand */
  brand:   'var(--color-primary-500)',
  success: 'var(--color-green-500)',
  warning: 'var(--color-yellow-500)',
  error:   'var(--color-red-500)',
}

export function ProgressBar({
  value,
  variant   = 'teal',
  size      = 'sm',
  label,
  showValue = false,
  animated  = true,
  className = '',
  style,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const height  = progressSizeMap[size]

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`} style={style}>
      {/* Label row */}
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span
              style={{
                fontFamily:  'var(--font-sans)',             /* Figma: Poppins */
                fontSize:    'var(--font-size-2xs)',         /* 10px — Figma badge scale */
                fontWeight:  'var(--font-weight-semibold)',
                color:       'var(--color-text-neutral-secondary)',
                lineHeight:  'var(--leading-2xs)',
                letterSpacing: 'var(--tracking-wide)',
              }}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              style={{
                fontFamily: 'var(--font-display)',          /* Figma: Nunito Sans */
                fontSize:   'var(--font-size-xs)',          /* 12px */
                fontWeight: 'var(--font-weight-bold)',
                color:      progressFillColors[variant],
                lineHeight: 'var(--leading-xs)',
              }}
            >
              {clamped}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `Progress: ${clamped}%`}
        style={{
          position:        'relative',
          width:           '100%',
          height:          `${height}px`,
          /* Figma track: #c9d3e766 → translucent gray */
          backgroundColor: 'var(--color-neutral-200)',
          borderRadius:    'var(--radius-sm)',              /* 6px – soft pill end */
          overflow:        'hidden',
        }}
      >
        {/* Fill */}
        <div
          style={{
            position:        'absolute',
            insetBlock:      0,
            left:            0,
            width:           `${clamped}%`,
            backgroundColor: progressFillColors[variant],
            borderRadius:    'var(--radius-sm)',
            transition:      animated ? 'width 600ms cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        />
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════
// CircularProgress  (ring / donut style)
// ══════════════════════════════════════════════════════

interface CircularProgressProps {
  /** 0–100 */
  value:      number
  variant?:   ProgressVariant
  /** Diameter in px (default: 64) */
  size?:      number
  /** Ring stroke width in px (default: 6) */
  stroke?:    number
  showValue?: boolean
  className?: string
  style?:     React.CSSProperties
}

export function CircularProgress({
  value,
  variant   = 'teal',
  size      = 64,
  stroke    = 6,
  showValue = false,
  className = '',
  style,
}: CircularProgressProps) {
  const clamped  = Math.min(100, Math.max(0, value))
  const radius   = (size - stroke) / 2
  const circ     = 2 * Math.PI * radius
  const dashOffset = circ - (clamped / 100) * circ

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        {/* Track ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-neutral-200)"
          strokeWidth={stroke}
        />
        {/* Fill ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressFillColors[variant]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>

      {showValue && (
        <span
          className="absolute"
          style={{
            fontFamily:  'var(--font-display)',
            fontSize:    `${Math.max(10, size * 0.2)}px`,
            fontWeight:  'var(--font-weight-bold)',
            color:       progressFillColors[variant],
            lineHeight:  1,
          }}
        >
          {clamped}%
        </span>
      )}
    </div>
  )
}
