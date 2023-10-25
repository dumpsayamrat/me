'use client'

import { siteMetadata } from '@/site-metadata.mjs'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const Avatar = () => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const imageSrc = isHovered
    ? '/images/avatar.jpg'
    : '/images/social-banner.png'

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative item-detail rounded-full overflow-hidden"
      style={{ width: 192, height: 192 }}
      initial={{ y: -10 }}
      animate={{
        y: 10,
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ['20%', '20%', '50%', '50%', '100%'],
      }}
      transition={{
        type: 'smooth',
        repeatType: 'mirror',
        duration: 2,
        repeat: 2,
        delay: 2,
      }}
    >
      <Image
        src={imageSrc}
        priority
        className={clsx('rounded-full my-0', {
          'scale-150': isHovered,
        })}
        alt={siteMetadata.author}
        objectFit="cover"
        objectPosition="center"
        layout={'fill'}
      />
    </motion.div>
  )
}

export default Avatar
