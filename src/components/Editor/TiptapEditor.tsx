import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import { Toolbar } from './Toolbar';
import { useStore } from '../../store/useStore';

export const TiptapEditor: React.FC = () => {
  const { elements } = useStore();
  const [generatedEmailContent, setGeneratedEmailContent] = React.useState("This is the content of the generated email.");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Your mail text will appear here...</p>',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && elements.length > 0) {
      const latestElement = elements[elements.length - 1];
      setGeneratedEmailContent(latestElement.content);
      editor.commands.setContent(latestElement.content);
    }
  }, [elements, editor]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmailContent).then(() => {
      console.log('Email content copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedEmailContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated_email.txt';
    link.click();
  };

  return (
    <div className="glass-effect rounded-lg overflow-hidden preview-shadow animate-fade p-4 md:p-6">
      <Toolbar 
        editor={editor} 
        generatedEmailContent={generatedEmailContent} 
        onCopy={handleCopy} 
        onDownload={handleDownload} 
        className="flex flex-wrap items-center space-x-2"
      />
      <div className={`mx-auto transition-all duration-300 w-full`}>
        <EditorContent 
          editor={editor} 
          className="overflow-hidden whitespace-normal" 
        />
      </div>
    </div>
  );
};