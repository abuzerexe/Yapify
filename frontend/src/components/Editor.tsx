"use client"

import React from "react"
import RichTextEditor from "reactjs-tiptap-editor"

// Core Extensions
import { BaseKit } from "reactjs-tiptap-editor"

// Basic Formatting
import { Bold } from "reactjs-tiptap-editor/bold"
import { Italic } from "reactjs-tiptap-editor/italic"
import { TextUnderline } from "reactjs-tiptap-editor/textunderline"
import { Strike } from "reactjs-tiptap-editor/strike"

// Text Styling
import { Highlight } from "reactjs-tiptap-editor/highlight"
import { Color } from "reactjs-tiptap-editor/color"
import { FontSize } from "reactjs-tiptap-editor/fontsize"
import { FontFamily } from "reactjs-tiptap-editor/fontfamily"
import { LineHeight } from "reactjs-tiptap-editor/lineheight"

// Headers
import { Heading } from "reactjs-tiptap-editor/heading"

// Lists
import { BulletList } from "reactjs-tiptap-editor/bulletlist"
import { OrderedList } from "reactjs-tiptap-editor/orderedlist"

// Alignment
import { TextAlign } from "reactjs-tiptap-editor/textalign"
import { Indent } from "reactjs-tiptap-editor/indent"

// Block Elements
import { Blockquote } from "reactjs-tiptap-editor/blockquote"
import { CodeBlock } from "reactjs-tiptap-editor/codeblock"
import { HorizontalRule } from "reactjs-tiptap-editor/horizontalrule"

// Media
import { Link } from "reactjs-tiptap-editor/link"
import { Image } from "reactjs-tiptap-editor/image"
import { ImageGif } from "reactjs-tiptap-editor/imagegif"
import { Attachment } from "reactjs-tiptap-editor/attachment"
import { Iframe } from "reactjs-tiptap-editor/iframe"
import { Twitter } from "reactjs-tiptap-editor/twitter"

// Utilities
import { SlashCommand } from "reactjs-tiptap-editor/slashcommand"
import { SearchAndReplace } from "reactjs-tiptap-editor/searchandreplace"
import { Emoji } from "reactjs-tiptap-editor/emoji"
import { History } from "reactjs-tiptap-editor/history"
import { Document } from "reactjs-tiptap-editor/document"
import { Code } from "reactjs-tiptap-editor/code"
import { SubAndSuperScript } from "reactjs-tiptap-editor/subandsuperscript"
import { Selection } from "reactjs-tiptap-editor/selection"
import { Mention } from "reactjs-tiptap-editor/mention"
import { Table } from "reactjs-tiptap-editor/table"
import { ExportPdf } from "reactjs-tiptap-editor/exportpdf"
import { ExportWord } from "reactjs-tiptap-editor/exportword"

// Styles
import "reactjs-tiptap-editor/style.css"
import "prism-code-editor-lightweight/layout.css"
import "prism-code-editor-lightweight/themes/github-dark.css"
import "prism-code-editor-lightweight/themes/github-light.css"
import "react-image-crop/dist/ReactCrop.css"

// ⚡ Extensions Setup
const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 20_000,
    },
  }),

  // Basic Formatting
  Bold,
  Italic,
  TextUnderline,
  // Strike,

  // Text Styling
  Highlight,
  Color,
  // FontSize,
  // FontFamily,
  // LineHeight,

  // Headers
  Heading,

  // Lists
  // BulletList,
  // OrderedList,

  // Alignment
  TextAlign.configure({
    alignments: ["left", "center", "right", "justify"],
    types: ["heading", "paragraph"],
  }),
  // Indent,

  // Block Elements
  Blockquote,
  // CodeBlock,
  HorizontalRule,

  // Media
  Link,
  // Image.configure({
    // Image upload function placeholder
    // Commented out to avoid errors
    // uploadImage: async (file) => {
    //   // Upload logic would go here
    //   return '';
    // },
  // }),
  // ImageGif.configure({
  //   GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY || "",
  // }),
  // Attachment,
  // Iframe,
  // Twitter,

  // Utilities
  // SlashCommand,
  // SearchAndReplace,
  Emoji,
  History,
  // Document,
  // Code,
  // SubAndSuperScript,
  Selection,
  // Mention,
  // Table,
  // ExportPdf,
  // ExportWord,
]

// Enhanced editor component with internal content handling
const Editor = React.memo(({ content, setContent }: { content: string; setContent: (newContent: string) => void }) => {
  // Use local handler to avoid re-renders
  const handleContentChange = (newContent: string) => {
    setContent(newContent)
  }

  return (
    <div className="editor-wrapper">
      <RichTextEditor
        toolbar={{
            //@ts-ignore
          items: [
            "bold",
            "italic",
            "underline",
            "strike",
            "highlight",
            "textColor",
            "fontFamily",
            "fontSize",
            "lineHeight",
            "heading",
            "bulletList",
            "orderedList",
            "textAlign",
            "indent",
            "blockquote",
            "codeBlock",
            "horizontalRule",
            "link",
            "image",
            "imageGif",
            "attachment",
            "iframe",
            "twitter",
            "slashCommand",
            "searchAndReplace",
            "emoji",
            "table",
            "exportPdf",
            "exportWord",
            "code",
            "subAndSuperScript",
          ],
        }}
        output="html"
        content={content}
        onChangeContent={handleContentChange}
        extensions={extensions}
        placeholder="Write your amazing story here..."
      />
      <style>{`
        .editor-wrapper {
          --editor-text: #1f2937;
          --editor-bg: #ffffff;
          --editor-border: #d1d5db;
          --editor-toolbar-bg: #f9fafb;
          --editor-highlight: #10b981;
          --editor-selection: rgba(16, 185, 129, 0.2);
        }
        
        .dark .editor-wrapper {
          --editor-text: #e5e7eb;
          --editor-bg: #1f2937;
          --editor-border: #374151;
          --editor-toolbar-bg: #111827;
          --editor-highlight: #10b981;
          --editor-selection: rgba(16, 185, 129, 0.2);
        }
        
        .editor-wrapper :global(.ProseMirror) {
          min-height: 300px;
          color: var(--editor-text);
          background: var(--editor-bg);
        }
        
        .editor-wrapper :global(.tiptap-toolbar) {
          background: var(--editor-toolbar-bg);
          border-color: var(--editor-border);
        }
        
        .editor-wrapper :global(.tiptap-toolbar button) {
          color: var(--editor-text);
        }
        
        .editor-wrapper :global(.tiptap-toolbar button:hover) {
          background: var(--editor-selection);
        }
      `}</style>
    </div>
  )
})

export default Editor
