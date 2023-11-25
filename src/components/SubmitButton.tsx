'use client'

import { useFormStatus } from 'react-dom'
import styles from './styles.module.scss'
import { Loading } from './Loading'

export function SubmitButton({ buttonName }: { buttonName: string }) {
  const { pending } = useFormStatus()
  if (pending) return <Loading />
  return (
    <button type="submit" className={styles.submit}>
      {buttonName}
    </button>
  )
}
