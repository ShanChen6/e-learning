"use client"
import React from 'react'
import styles from './button.module.css'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ variant = 'primary', size = 'md', children, className, ...rest }: ButtonProps) {
  const cls = [styles.btn, styles[`btn_${variant}`], styles[`btn_${size}`], className].filter(Boolean).join(' ')
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
