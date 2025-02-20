"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "./ToolBar";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-resize-image"; // Use only this for images

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        image: false, // Ensure image is disabled in StarterKit
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      Highlight,
      ImageResize, // Use only ImageResize, not Image
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 text-black py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
    immediatelyRender: false, // Avoids SSR hydration mismatch
  });

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
