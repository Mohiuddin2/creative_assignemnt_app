// ToolBar.tsx
"use client";

import React from "react";
import { Link2 } from "lucide-react"; // Make sure to import the icon

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
  List,
  ListOrdered,
} from "lucide-react";
import { Toggle } from "../ui/toggle";

export default function ToolBar({ editor }) {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    let url = window.prompt("URL", previousUrl || ""); // Provide empty string as default if no link

    if (url === null) {
      return; // Canceled
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url; // Or 'http://' if you prefer
    }

    try {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } catch (e) {
      alert(e.message);
    }
  };


  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Heading4 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      preesed: editor.isActive("heading", { level: 4 }),
    },
    {
      icon: <Heading5 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      preesed: editor.isActive("heading", { level: 5 }),
    },
    {
      icon: <Heading6 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      preesed: editor.isActive("heading", { level: 6 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive("codeBlock"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
    {
      icon: <Upload className="size-4" />,
      onClick: () => addImage(),
      preesed: editor.isActive("image"),
    },
    {
      icon: <Link2 className="size-4" />,
      onClick: () => addLink(),
      preesed: editor.isActive("link"),
    },
  ];

  return (
    <div className="border rounded-md p-1.5 mb-1 bg-slate-50 text-black space-x-1 sticky top-10 z-50">
      {Options.map((option, i) => (
        <Toggle
          key={i}
          size="sm"
          pressed={option.preesed}
          onPressedChange={option.onClick}
          className="bg-slate-400"
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
