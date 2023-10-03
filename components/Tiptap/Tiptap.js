'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Bold, Italic, FileImage, Link2 } from 'lucide-react';
import Image from '@tiptap/extension-image'
import { useCallback } from 'react'
import Link from '@tiptap/extension-link'



const Tiptap = ({content, setContent}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document, Paragraph, Text, Bold,Image,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          style: 'color: blue; text-decoration: underline; cursor: pointer;',
        }
      }),
      
      
    ],
    
    content: '<p>Hello World! 🌎️</p>',
    onUpdate: ({ editor }) => {
      setContent({
          content: editor.getHTML(),
      })
  }
  })

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  if (!editor) {
    return null
  }

  

  return (<>
                <div className="flex gap-2 justify-center text-sm ">
                  <span className='border-2 border-darkgray'><Bold onClick={() => editor.chain().focus().toggleBold().run()}
                     style={{cursor: "pointer", fontSize: "small"}} /> </span>
                  <span className='border-2 border-darkgray'><Italic onClick={() => editor.chain().focus().toggleItalic().run()}
                     style={{cursor: "pointer", fontSize: "small"}} />  </span> 
                  <button onClick={addImage} className='border-2 border-darkgray'><FileImage 
                     style={{cursor: "pointer", fontSize: "small"}} />  </button> 
                  <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}><Link2 
                    className='border-2 border-darkgray' style={{fontSize: "small"}} />  </button>
                </div>
                
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap