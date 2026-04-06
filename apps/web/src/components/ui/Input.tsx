/**
 * Input – eLearning UI
 *
 * Figma audit (Login / Register forms):
 *   - Bounds:        435×54px
 *   - Corner-radius: 40px  → --radius-3xl (nearest token = 40px ✓)
 *   - Fill:          #ffffff → --color-neutral-00
 *   - Border:        1px solid #49bbbd → --color-teal-500
 *   - Label text:    Poppins 16px Regular, #000000 → --color-neutral-1000
 *   - Placeholder:   Poppins 15px Light, #acacac → --color-neutral-400
 *   - Padding:       inferred ~16px horizontal, 14px vertical
 *
 * Usage:
 *   <Input label="User name" placeholder="Enter your User name" />
 *   <Input type="password" label="Password" status="error" hint="Wrong password" />
 *   <Input leftIcon={<Mail />} placeholder="Email address" />
 */

import React from 'react'

// ─── Types ───────────────────────────────────────────────────────────

type InputStatus = 'default' | 'error' | 'success' | 'warning'
type InputSize   = 'sm' | 'md' | 'lg'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?:     string
  hint?:      string
  status?:    InputStatus
  size?:      InputSize
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  /** Full-width wrapper class */
  wrapperClassName?: string
}

// ─── Style maps ──────────────────────────────────────────────────────

/*
 * Figma: border = 1px solid #49bbbd (teal)
 * Figma: corner-radius 40px → --radius-3xl
 * Figma: height 54px → size md
 */
const sizeStyles: Record<InputSize, { wrapper: React.CSSProperties; input: string }> = {
  sm: {
    wrapper: { height: '40px' },
    input:   'px-3 text-sm',
  },
  md: {
    wrapper: { height: '54px' }, /* exact Figma: 54px */
    input:   'px-4 text-md',
  },
  lg: {
    wrapper: { height: '64px' },
    input:   'px-5 text-xl',
  },
}

const statusBorderColor: Record<InputStatus, string> = {
  default: 'var(--color-teal-500)',    /* Figma: #49bbbd teal border */
  error:   'var(--color-border-error-default)',
  success: 'var(--color-border-success-default)',
  warning: 'var(--color-border-warning-default)',
}

const statusFocusRing: Record<InputStatus, string> = {
  default: 'var(--app-ring)',
  error:   'rgba(241,60,60,0.20)',
  success: 'rgba(52,231,165,0.20)',
  warning: 'rgba(244,140,6,0.20)',
}

const statusHintColor: Record<InputStatus, string> = {
  default: 'var(--color-text-neutral-tertiary)',
  error:   'var(--color-text-error-default)',
  success: 'var(--color-text-success-default)',
  warning: 'var(--color-text-warning-default)',
}

// ─── Component ───────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      status           = 'default',
      size             = 'md',
      leftIcon,
      rightIcon,
      wrapperClassName = '',
      className        = '',
      disabled,
      id,
      style,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const inputId     = id ?? generatedId
    const [focused, setFocused] = React.useState(false)

    const wrapperStyle: React.CSSProperties = {
      ...sizeStyles[size].wrapper,
      display:         'flex',
      alignItems:      'center',
      gap:             'calc(var(--spacing) * 2)',  /* 8px */
      width:           '100%',
      backgroundColor: disabled
        ? 'var(--color-surface-neutral-disabled)'
        : 'var(--color-neutral-00)',               /* Figma: #ffffff */
      borderRadius:    'var(--radius-3xl)',          /* Figma: 40px → token 40px ✓ */
      border:          `1px solid ${statusBorderColor[status]}`,
      boxShadow: focused
        ? `0 0 0 3px ${statusFocusRing[status]}, var(--shadow-input)`
        : 'var(--shadow-input)',
      transition:      'border-color 150ms ease, box-shadow 150ms ease',
      paddingInline:   'calc(var(--spacing) * 4)',  /* 16px */
      cursor:           disabled ? 'not-allowed' : 'text',
    }

    const inputStyle: React.CSSProperties = {
      flex:           1,
      background:     'transparent',
      border:         'none',
      outline:        'none',
      fontFamily:     'var(--font-sans)',            /* Figma: Poppins */
      fontSize:       'var(--font-size-base)',       /* Figma: 15px placeholder / 16px label */
      lineHeight:     'var(--leading-md)',
      fontWeight:     'var(--font-weight-light)',    /* Figma placeholder: Light 300 */
      color:          disabled
        ? 'var(--color-text-neutral-disabled)'
        : 'var(--color-neutral-1000)',              /* Figma: #000000 → --color-neutral-1000 */
      cursor:          disabled ? 'not-allowed' : 'text',
      ...style,
    }

    return (
      <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontFamily:  'var(--font-sans)',
              fontSize:    'var(--font-size-base)',   /* Figma: 16px */
              fontWeight:  'var(--font-weight-regular)',/* Figma: Regular 400 */
              color:       'var(--color-neutral-1000)', /* Figma: #000000 */
              lineHeight:  'var(--leading-sm)',
              userSelect:  'none',
            }}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div style={wrapperStyle}>
          {leftIcon && (
            <span
              style={{
                display:   'flex',
                flexShrink: 0,
                color:     focused
                  ? 'var(--color-teal-500)'
                  : 'var(--color-text-neutral-tertiary)',
                transition: 'color 150ms ease',
              }}
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={['w-full', sizeStyles[size].input, className].join(' ')}
            style={inputStyle}
            onFocus={(e) => {
              setFocused(true)
              onFocus?.(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              onBlur?.(e)
            }}
            {...rest}
          />

          {rightIcon && (
            <span
              style={{
                display:    'flex',
                flexShrink: 0,
                color:      'var(--color-text-neutral-tertiary)',
              }}
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </div>

        {/* Hint / error message */}
        {hint && (
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize:   'var(--font-size-xs)',  /* 12px */
              lineHeight: 'var(--leading-xs)',
              color:      statusHintColor[status],
            }}
            role={status === 'error' ? 'alert' : undefined}
          >
            {hint}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
