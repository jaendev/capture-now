/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
  Edit3,
  Strikethrough,
  Quote,
  Table,
  Minus,
  Heading2,
  Heading3
} from 'lucide-react'

interface MarkdownEditorProps {
  value: string
  editing: boolean
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Type your description here...",
  className = "",
  editing
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
    italic: () => wrapSelection('_'),
    strikethrough: () => wrapSelection('~~'),
    heading: () => insertAtCursor('# '),
    heading2: () => insertAtCursor('## '),
    heading3: () => insertAtCursor('### '),
    code: () => wrapSelection('`'),
    codeBlock: () => wrapSelection('```\n', '\n```'),
    link: () => wrapSelection('[', '](url)'),
    unorderedList: () => insertLinePrefix('- '),
    orderedList: () => insertLinePrefix('1. '),
    taskList: () => insertLinePrefix('- [ ] '),
    blockquote: () => insertLinePrefix('> '),
    horizontalRule: () => insertAtCursor('\n---\n'),
    table: () => {
      const tableTemplate = [
        '| Column 1 | Column 2 | Column 3 |',
        '|----------|----------|----------|',
        '| Data 1   | Data 2   | Data 3   |',
        '| Data 4   | Data 5   | Data 6   |'
      ].join('\n')
      insertAtCursor(tableTemplate)
    },
    mention: () => insertAtCursor('@'),
  }

  const renderPreview = () => {
    return (
      <div className="prose prose-invert max-w-none p-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Headings
            h1: ({ ...props }) => (
              <h1 className="text-2xl font-bold text-foreground mb-4 c pb-2" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-xl font-bold text-foreground mb-3 mt-6" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4" {...props} />
            ),
            h4: ({ ...props }) => (
              <h4 className="text-base font-bold text-foreground mb-2 mt-3" {...props} />
            ),
            h5: ({ ...props }) => (
              <h5 className="text-sm font-bold text-foreground mb-2 mt-2" {...props} />
            ),
            h6: ({ ...props }) => (
              <h6 className="text-xs font-bold text-foreground mb-2 mt-2" {...props} />
            ),

            // Paragraphs
            p: ({ ...props }) => (
              <p className="text-foreground mb-3 leading-relaxed" {...props} />
            ),

            // Lists
            ul: ({ ...props }) => (
              <ul className="list-disc ml-6 mb-3 text-foreground space-y-1" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal ml-6 mb-3 text-foreground space-y-1" {...props} />
            ),
            li: ({ ...props }) => (
              <li className="text-foreground" {...props} />
            ),

            // Code
            code: ({ children, ...props }) => {
              return (
                <code className="block bg-surface p-4 rounded-lg text-accent font-mono text-sm overflow-x-auto mb-3 whitespace-pre" {...props}>
                  {children}
                </code>
              )
            },
            pre: ({ ...props }) => (
              <pre className="mb-3" {...props} />
            ),

            // Blockquote
            blockquote: ({ ...props }) => (
              <blockquote className="border-l-4 border-accent pl-4 italic text-muted mb-3 py-1" {...props} />
            ),

            // Links
            a: ({ ...props }) => (
              <a
                className="text-accent hover:underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),

            // Images
            img: ({ ...props }) => (
              <img alt={props.alt} className="rounded-lg max-w-full h-auto my-4" {...props} />
            ),

            // Horizontal rule
            hr: ({ ...props }) => (
              <hr className="border-border my-6" {...props} />
            ),

            // Tables
            table: ({ ...props }) => (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-border" {...props} />
              </div>
            ),
            thead: ({ ...props }) => (
              <thead className="bg-surface" {...props} />
            ),
            tbody: ({ ...props }) => (
              <tbody {...props} />
            ),
            tr: ({ ...props }) => (
              <tr className="border-b border-border" {...props} />
            ),
            th: ({ ...props }) => (
              <th className="px-4 py-2 text-left text-foreground font-semibold" {...props} />
            ),
            td: ({ ...props }) => (
              <td className="px-4 py-2 text-foreground" {...props} />
            ),

            // Task list checkbox
            input: ({ ...props }) => (
              <input
                className="mr-2 accent-accent cursor-pointer"
                type="checkbox"
                disabled
                {...props}
              />
            ),

            // Strong and emphasis
            strong: ({ ...props }) => (
              <strong className="font-bold text-foreground" {...props} />
            ),
            em: ({ ...props }) => (
              <em className="italic text-foreground" {...props} />
            ),

            // Strikethrough (with remark-gfm)
            del: ({ ...props }) => (
              <del className="line-through text-muted" {...props} />
            ),
          }}
        >
          {value}
        </ReactMarkdown>
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
                  title="Heading 1"
                >
                  <Heading className="w-4 h-4" />
                </button>
                <button
                  onClick={toolbarActions.heading2}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Heading 2"
                >
                  <Heading2 className="w-5 h-5" />
                </button>
                <button
                  onClick={toolbarActions.heading3}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Heading 3"
                >
                  <Heading3 className="w-5 h-5" />
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
                <button
                  onClick={toolbarActions.strikethrough}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Strikethrough"
                >
                  <Strikethrough className="w-4 h-4" />
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

              {/* Block elements */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={toolbarActions.blockquote}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Blockquote"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  onClick={toolbarActions.table}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Table"
                >
                  <Table className="w-4 h-4" />
                </button>
                <button
                  onClick={toolbarActions.horizontalRule}
                  className="p-2 text-muted hover:text-foreground hover:bg-hover rounded-lg transition-colors"
                  title="Horizontal rule"
                >
                  <Minus className="w-4 h-4" />
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
            disabled={!editing}
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