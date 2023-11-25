'use server'

import {
  PutObjectCommand,
  S3Client,
  CopyObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT || undefined,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

const BUCKET = process.env.AWS_BUCKET

export const getSignedUpload = async (
  key: string,
  size: number
): Promise<string> => {
  const putCommandObj = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
  })
  const url = await getSignedUrl(s3, putCommandObj, { expiresIn: 60 })
  return url
}

export const copy = async (source: string, target: string) => {
  const copyCommand = new CopyObjectCommand({
    CopySource: `${BUCKET}/${source}`,
    Bucket: BUCKET,
    Key: target,
  })
  return s3.send(copyCommand).then(res => {
    return res
  })
}

export async function put(url: string, file: File): Promise<boolean> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer) // Assuming you have a Buffer class defined

  const headers = {
    'Content-Length': buffer.length.toString(),
    'Content-Type': 'image/jpeg', // Set the correct content type for JPEG
  }

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: buffer,
    })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)
    }
    return response.ok
  } catch (error) {
    throw error
  }
}

export const getPresignedURL = async (key: string) => {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key })
  return getSignedUrl(s3, command, { expiresIn: 120 })
}
