"use client";

import React, { useState } from 'react';
import { Book, Mic, Plus, Trash2, Download, Wand2 } from 'lucide-react';
// import type { AudioBook, Chapter } from './types';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Chapter {
  id: string;
  title: string;
  content: string;
  audioUrl?: string;
}

interface AudioBook {
  title: string;
  author: string;
  chapters: Chapter[];
}


export default function AudiobookCreator() {
  const [book, setBook] = useState<AudioBook>({
    title: '',
    author: '',
    chapters: []
  });

  const addChapter = () => {
    const newChapter: Chapter = {
      id: crypto.randomUUID(),
      title: `Chapter ${book.chapters.length + 1}`,
      content: ''
    };
    setBook(prev => ({
      ...prev,
      chapters: [...prev.chapters, newChapter]
    }));
  };

  const removeChapter = (id: string) => {
    setBook(prev => ({
      ...prev,
      chapters: prev.chapters.filter(chapter => chapter.id !== id)
    }));
  };

  const updateChapter = (id: string, updates: Partial<Chapter>) => {
    setBook(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter =>
        chapter.id === id ? { ...chapter, ...updates } : chapter
      )
    }));
  };

  const generateChapterContent = async (id: string) => {
    // TODO: Implement AI generation
    alert('AI Generation would happen here');
  };

  const generateAudio = async (id: string) => {
    // TODO: Implement TTS
    alert('Text-to-Speech would happen here');
  };

  const downloadFullAudiobook = async () => {
    // TODO: Implement full audiobook download
    alert('Full audiobook download would happen here');
  };

  return (
    <div className="min-h-screen">
      {/* <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Book className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Audiobook Creator</h1>
          </div>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="shadow rounded-lg p-6 mb-8 border">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Book Title</label>
              <Input
                type="text"
                value={book.title}
                onChange={(e) => setBook(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                placeholder="Enter book title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Author</label>
              <Input
                type="text"
                value={book.author}
                onChange={(e) => setBook(prev => ({ ...prev, author: e.target.value }))}
                className="mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                placeholder="Enter author name"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Chapters</h2>
            <button
              onClick={addChapter}
              className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Chapter
            </button>
          </div>

          {book.chapters.map((chapter, index) => (
            <div key={chapter.id} className="shadow rounded-lg p-6 border">
              <div className="flex justify-between items-start mb-4">
                <Input
                  type="text"
                  value={chapter.title}
                  onChange={(e) => updateChapter(chapter.id, { title: e.target.value })}
                  className="text-lg font-medium border-none focus:ring-0 p-0"
                  placeholder={`Chapter ${index + 1}`}
                />
                <button
                  onClick={() => removeChapter(chapter.id)}
                  className="hover:opacity-75 transition-opacity"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <Textarea
                value={chapter.content}
                onChange={(e) => updateChapter(chapter.id, { content: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                placeholder="Enter chapter content..."
              />

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => generateChapterContent(chapter.id)}
                  className="inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Content
                </button>
                <button
                  onClick={() => generateAudio(chapter.id)}
                  className="inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Generate Audio
                </button>
              </div>
            </div>
          ))}

          {book.chapters.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={downloadFullAudiobook}
                className="inline-flex items-center px-6 py-3 border rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Complete Audiobook
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

