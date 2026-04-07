"use client"
import React from 'react'
import styles from './badge.module.css'

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'success' | 'error' | 'warning' | 'brand' | 'teal' | 'neutral'
  size?: 'sm' | 'md'
}

export default function Badge({ variant = 'neutral', size = 'md', children, className, ...rest }: BadgeProps) {
  const cls = [styles.badge, styles[`badge_${variant}`], styles[`badge_${size}`], className].filter(Boolean).join(' ')
  return <span className={cls} {...rest}>{children}</span>
}
