import React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ModernTextarea({
  label = "Modern Textarea",
  placeholder = "Start typing here...",
  rows = 5,
  className = ""
}: {
  label?: string
  placeholder?: string
  rows?: number
  className?: string
}) {
  return (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor="modern-textarea">{label}</Label>
      <Textarea
        id="modern-textarea"
        placeholder={placeholder}
        rows={rows}
        className={`resize-none overflow-y-auto ${className} 
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
          hover:scrollbar-thumb-gray-400 focus:scrollbar-thumb-gray-400
          dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800
          dark:hover:scrollbar-thumb-gray-500 dark:focus:scrollbar-thumb-gray-500`}
      />
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: var(--scrollbar-track, rgb(20, 20, 20));
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: var(--scrollbar-thumb, #888);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: var(--scrollbar-thumb-hover, #555);
        }
      `}</style>
    </div>
  )
}