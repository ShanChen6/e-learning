"use client"
import React from 'react'
import styles from './input.module.css'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input(props: InputProps) {
  return <input className={styles.input} {...props} />
}
