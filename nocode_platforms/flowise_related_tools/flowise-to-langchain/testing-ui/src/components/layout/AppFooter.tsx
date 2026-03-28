'use client'

import { Heart, Github, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Left section */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for the AI community</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span>© {currentYear} Flowise Converter</span>
          </div>

          {/* Center section */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              v1.0.0
            </Badge>
            <Badge variant="outline" className="text-xs">
              Beta
            </Badge>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() =>
                window.open('https://github.com/iaminawe/flowise-to-langchain', '_blank')
              }
            >
              <Github className="mr-1 h-3 w-3" />
              GitHub
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() =>
                window.open('https://github.com/iaminawe/flowise-to-langchain#readme', '_blank')
              }
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              Docs
            </Button>
          </div>
        </div>

        {/* Bottom section */}
        <Separator className="my-4" />
        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground md:flex-row">
          <div className="flex items-center gap-4">
            <span>Flowise to LangChain Converter</span>
            <Separator orientation="vertical" className="h-3" />
            <span>Automated Testing Suite</span>
            <Separator orientation="vertical" className="h-3" />
            <span>Real-time Monitoring</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
            </a>
            <a
              href="/support"
              className="transition-colors hover:text-foreground"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
