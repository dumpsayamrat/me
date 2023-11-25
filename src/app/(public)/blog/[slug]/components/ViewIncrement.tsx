'use client'

import { useEffect } from 'react'
import incrementView from '../action'

export const ViewIncrement = ({ slug }: { slug: string }) => {
  useEffect(() => {
    incrementView(slug)
  }, [slug])
  return <></>
}
