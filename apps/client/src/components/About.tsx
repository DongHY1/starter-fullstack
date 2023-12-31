import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { getReportData } from '@/api'

import { Button } from './ui/button'

export default function About() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: getReportData
  })

  if (isLoading) return <>Loading...</>

  if (error) return <>'An error has occurred: ' + {error}</>

  return (
    <div className="flex flex-col">
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <Button>
        <Link to="/">Home</Link>
      </Button>
    </div>
  )
}
