import { Metadata } from 'next'
import { App } from '@/components/App'

export const metadata: Metadata = {
  title: 'Flowise Converter - Flowise to LangChain',
  description: 'Convert your Flowise flows to LangChain applications',
}

export default function HomePage() {
  return <App />
}
