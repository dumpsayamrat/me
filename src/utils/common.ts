import { customAlphabet } from 'nanoid'
import {
  BLOB_PHOTO_PREFIX,
  KV_BLOG_VIEW_PREFIX,
  KV_PHOTO_PREFIX,
} from '../constants'

export const generateBlogKey = (slug: string): string =>
  `${process.env.NODE_ENV}:${KV_BLOG_VIEW_PREFIX}:${slug}`

export const generatePhotoKey = (id: string): string =>
  `${process.env.NODE_ENV}:${KV_PHOTO_PREFIX}:${id}`

export const generateBlobPhotoPrefix = (fileName: string): string =>
  `${process.env.NODE_ENV}/${BLOB_PHOTO_PREFIX}/${fileName}`

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function waitForXSeconds(seconds: number): Promise<void> {
  console.log(`Waiting for ${seconds} seconds...`)
  await wait(seconds * 1000)
  console.log(`Done waiting for ${seconds} seconds!`)
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
export const generateID = customAlphabet(alphabet, 16)

export const convertDecimalToExposure = (decimalValue: number): string => {
  if (decimalValue <= 0) {
    return 'Invalid input'
  }

  // If the decimal value is greater than or equal to 1, return it as a whole second
  if (decimalValue >= 1) {
    return `${Math.floor(decimalValue)}`
  }

  // Calculate the denominator based on the decimal value
  const denominator = 1 / decimalValue

  // Find the nearest standard fraction
  const fractions = [
    1, 2, 4, 8, 15, 30, 60, 125, 250, 500, 1000, 2000, 4000, 8000,
  ]
  const closestFraction = fractions.reduce((prev, curr) => {
    return Math.abs(curr - denominator) < Math.abs(prev - denominator)
      ? curr
      : prev
  })

  // Return the exposure time as a string
  return `1/${closestFraction}`
}
