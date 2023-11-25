'use client'

import React, { useRef, useEffect } from 'react'
import * as StackBlur from 'stackblur-canvas'

interface BlurImageGeneratorProps {
  sourceImage: string
  blurRadius: number
  onBlurReady: (blurredImageData: string) => void
  quality?: number
}

const BlurImageGenerator: React.FC<BlurImageGeneratorProps> = ({
  sourceImage,
  blurRadius,
  onBlurReady,
  quality = 0.1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) {
      return
    }

    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = sourceImage

    image.onload = () => {
      const { width, height } = image

      let newWidth = 768
      let newHeight = 768 / (3 / 2)

      // Calculate new dimensions while maintaining the aspect ratio
      if (width / height > newWidth / newHeight) {
        newHeight = (newWidth / width) * height
      } else {
        newWidth = (newHeight / height) * width
      }

      canvas.width = newWidth
      canvas.height = newHeight

      ctx.drawImage(image, 0, 0, newWidth, newHeight)

      StackBlur.canvasRGBA(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        blurRadius
      )

      const blurredImageDataURL = canvas.toDataURL('image/jpeg', quality)

      onBlurReady(blurredImageDataURL)
    }
  }, [sourceImage, blurRadius, onBlurReady, quality])

  return <canvas ref={canvasRef} />
}

export default BlurImageGenerator
