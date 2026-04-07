"use client"
import React from 'react'
import styles from './card.module.css'

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: any
}

export default function Card({ children, className, ...rest }: CardProps) {
  const cls = [styles.card, className].filter(Boolean).join(' ')
  return <div className={cls} {...rest}>{children}</div>
}
