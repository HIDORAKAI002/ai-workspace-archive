'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Paperclip, Mic, Square, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  multiline?: boolean
  supportFiles?: boolean
  supportVoice?: boolean
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = 'Type your message...',
  className,
  multiline = false,
  supportFiles = false,
  supportVoice = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled && !multiline) {
      inputRef.current?.focus()
    }
  }, [disabled, multiline])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
      setFiles([])
      if (multiline) {
        textareaRef.current?.focus()
      } else {
        inputRef.current?.focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false)
      // Stop recording logic would go here
    } else {
      setIsRecording(true)
      // Start recording logic would go here
    }
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`
    }
  }

  useEffect(() => {
    if (multiline) {
      adjustTextareaHeight()
    }
  }, [message, multiline])

  return (
    <div className={cn('space-y-2', className)}>
      {/* File attachments */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 rounded-md bg-muted px-2 py-1 text-sm"
            >
              <Paperclip className="h-3 w-3" />
              <span className="max-w-32 truncate">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Voice recording indicator */}
      {isRecording && (
        <div className="flex items-center space-x-2 rounded-md bg-red-100 px-3 py-2 text-red-800">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-sm">Recording...</span>
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="relative flex-1">
          {multiline ? (
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                'max-h-32 min-h-10 w-full resize-none px-3 py-2 text-sm',
                'rounded-md border border-input bg-background',
                'ring-offset-background placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent'
              )}
              style={{ height: '40px' }}
            />
          ) : (
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className="pr-24"
            />
          )}

          {/* Input actions */}
          <div className="absolute bottom-1 right-1 flex items-center space-x-1">
            {supportFiles && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                  className="h-8 w-8 p-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".txt,.json,.csv,.md"
                />
              </>
            )}

            {supportVoice && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleVoiceRecord}
                disabled={disabled}
                className={cn(
                  'h-8 w-8 p-0',
                  isRecording && 'text-red-500 hover:text-red-600'
                )}
              >
                {isRecording ? (
                  <Square className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>

        <Button
          type="submit"
          size="sm"
          disabled={!message.trim() || disabled}
          className="h-10 px-3"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>

      {/* Usage hints */}
      <div className="text-xs text-muted-foreground">
        {multiline ? (
          <span>Press Enter + Shift for new line, Enter to send</span>
        ) : (
          <span>Press Enter to send</span>
        )}
        {supportFiles && <span> • Attach files with the paperclip icon</span>}
        {supportVoice && <span> • Hold mic to record voice message</span>}
      </div>
    </div>
  )
}
