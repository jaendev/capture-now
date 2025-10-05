"use client"

import { useState, useRef, useCallback } from 'react'
import {
  Bold,
  Italic,
  Heading,
  Code,
  Link,
  List,
  ListOrdered,
  ListChecks,
  AtSign,
  Maximize2,
  Edit3
} from 'lucide-react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Type your description here...",
  className = ""
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertAtCursor = useCallback((insertText: string, selectionStart?: number, selectionEnd?: number) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = selectionStart ?? textarea.selectionStart
    const end = selectionEnd ?? textarea.selectionEnd

    const newValue = value.substring(0, start) + insertText + value.substring(end)
    onChange(newValue)

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + insertText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }, [value, onChange])

  const wrapSelection = useCallback((prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    if (selectedText) {
      const wrappedText = prefix + selectedText + suffix
      insertAtCursor(wrappedText, start, end)
    } else {
      insertAtCursor(prefix + suffix, start, end)
      // Position cursor between prefix and suffix
      setTimeout(() => {
        textarea.setSelectionRange(start + prefix.length, start + prefix.length)
      }, 0)
    }
  }, [value, insertAtCursor])

  const insertLinePrefix = useCallback((prefix: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    insertAtCursor(prefix, lineStart, lineStart)
  }, [value, insertAtCursor])

  const toolbarActions = {
    bold: () => wrapSelection('**'),
    italic: () => wrapSelection('*'),
    heading: () => insertLinePrefix('# '),
    code: () => wrapSelection('`'),
    codeBlock: () => wrapSelection('```\n', '\n```'),
    link: () => wrapSelection('[', '](url)'),
    unorderedList: () => insertLinePrefix('- '),
    orderedList: () => insertLinePrefix('1. '),
    taskList: () => insertLinePrefix('- [ ] '),
    mention: () => insertAtCursor('@'),
  }

  const renderPreview = () => {
    // Simple markdown preview - you can enhance this with a proper markdown parser
    const lines = value.split('\n')

    return (
      <div className="prose prose-invert max-w-none p-4">
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-2xl font-bold text-foreground mb-4">{line.slice(2)}</h1>
          }
          if (line.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-bold text-foreground mb-3">{line.slice(3)}</h2>
          }
          if (line.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-bold text-foreground mb-2">{line.slice(4)}</h3>
          }
          if (line.startsWith('- ')) {
            return <li key={index} className="text-foreground ml-4">{line.slice(2)}</li>
          }
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={index} className="text-foreground font-bold mb-2">{line.slice(2, line.length - 2)}</p>
          }
          if (line.startsWith('*') && line.endsWith('*')) {
            return <p key={index} className="text-foreground italic mb-2">{line.slice(1, line.length - 1)}</p>
          }
          if (line.trim() === '') {
            return <br key={index} />
          }
          return <p key={index} className="text-foreground mb-2">{line}</p>
        })}
      </div>
    )
  }

  return (
    <div className={`
      bg-card border border-border rounded-xl overflow-hidden
      ${isFullscreen ? 'fixed inset-4 z-50' : ''}
      ${className}
    `}>
      {/* Header with tabs and actions */}
      <div className="border-b border-border bg-surface">
        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('write')}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-colors
                ${activeTab === 'write'
                  ? 'bg-card text-foreground border border-border'
                  : 'text-muted hover:text-foreground hover:bg-hover'
                }
              `}
            >
              Write
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-colors
                ${activeTab === 'preview'
                  ? 'bg-card text-foreground border border-border'
                  : 'text-muted hover:text-foreground hover:bg-hover'
                }
              `}
            >
              Preview
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
              title="Toggle fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toolbar - only show in write mode */}
        {activeTab === 'write' && (
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center space-x-1 flex-wrap gap-2">
              {/* Text formatting */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={toolbarActions.heading}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Heading"
                >
                  <Heading className="w-4 h-4" />
                </button>
                <button
                  onClick={toolbarActions.bold}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  onClick={toolbarActions.italic}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-border mx-2"></div>

              {/* Code and links */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={toolbarActions.code}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Inline code"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  onClick={toolbarActions.codeBlock}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors font-mono text-xs"
                  title="Code block"
                >
                  {'</>'}
                </button>
                <button
                  onClick={toolbarActions.link}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Link"
                >
                  <Link className="w-4 h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-border mx-2"></div>

              {/* Lists */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={toolbarActions.unorderedList}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Bullet list"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={toolbarActions.orderedList}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Numbered list"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button
                  onClick={toolbarActions.taskList}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Task list"
                >
                  <ListChecks className="w-4 h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-border mx-2"></div>

              {/* Other actions */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={toolbarActions.mention}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Mention"
                >
                  <AtSign className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="relative">
        {activeTab === 'write' ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`
              w-full bg-transparent text-foreground placeholder-muted resize-none 
              border-none outline-none p-4 font-mono text-sm leading-relaxed
              ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'min-h-[400px]'}
            `}
          />
        ) : (
          <div className={`
            bg-background min-h-[400px] overflow-auto
            ${isFullscreen ? 'h-[calc(100vh-200px)]' : ''}
          `}>
            {value.trim() ? renderPreview() : (
              <div className="p-4 text-muted italic">
                Nothing to preview yet. Start writing in the Write tab.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer with info */}
      <div className="border-t border-border bg-surface px-4 py-2">
        <div className="flex items-center justify-between text-xs text-muted">
          <div className="flex items-center space-x-4">
            <span>{value.length} characters</span>
            <span>{value.split(/\s+/).filter(word => word.length > 0).length} words</span>
            <span>{value.split('\n').length} lines</span>
          </div>
          <div className="flex items-center space-x-2">
            <Edit3 className="w-3 h-3" />
            <span>Markdown supported</span>
          </div>
        </div>
      </div>
    </div>
  )
}