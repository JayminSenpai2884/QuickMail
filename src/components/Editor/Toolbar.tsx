import React from 'react';
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Image, Link, Undo, Redo, Download, Copy } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { toast } from 'react-toastify';

interface ToolbarProps {
  editor: Editor | null;
  generatedEmailContent: string;
  onCopy: () => void;
  onDownload: () => void;
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor, onCopy, onDownload, className }) => {
  if (!editor) return null;

  const handleCopy = () => {
    onCopy();
    toast.success('Email💌 copied to clipboard!');
  };

  const handleDownload = () => {
    onDownload();
    toast.success('Email content downloaded⬇️!');
  };

  return (
    <div className={`toolbar ${className}`}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
      >
        <Bold className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
      >
        <Italic className="w-5 h-5" />
      </button>
     

      

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
      >
        <AlignLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
      >
        <AlignCenter className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
      >
        <AlignRight className="w-5 h-5" />
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      <button
        onClick={() => {
          const url = window.prompt('Enter image URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Image className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => {
          const url = window.prompt('Enter link URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
      >
        <Link className="w-5 h-5" />
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
      >
        <Undo className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
      >
        <Redo className="w-5 h-5" />
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      <button
        onClick={handleCopy}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Copy className="w-5 h-5" />
      </button>

      <button
        onClick={handleDownload}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Download className="w-5 h-5" />
      </button>
    </div>
  );
};