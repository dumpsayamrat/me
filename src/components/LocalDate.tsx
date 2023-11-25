'use client'

const LocalDate = ({ date }: { date: number }) => (
  <>
    {new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })}
  </>
)

export default LocalDate
