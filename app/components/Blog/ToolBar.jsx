// "use client";
// import { List } from "lucide-react";
// import { Toggle } from "../ui/toggle";

// import {
//   Heading1,
//   Heading2,
//   Heading3,
//   Code,
//   Bold,
//   Italic,
//   Strikethrough,
//   AlignCenter,
//   AlignLeft,
//   AlignRight,
//   Highlighter,
//   Upload,
// } from "lucide-react";
// import { ListOrdered } from "lucide-react";

// export default function ToolBar({ editor }) {
//   if (!editor) return null;
//   const addImage = () => {
//     const url = window.prompt("URL");
//     if (url) {
//       editor.chain().focus().setImage({ src: url }).run();
//     }
//   };

//   const Options = [
//     {
//       icon: <Heading1 className="size-4" />,
//       onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
//       preesed: editor.isActive("heading", { level: 1 }),
//     },
//     {
//       icon: <Heading2 className="size-4" />,
//       onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
//       preesed: editor.isActive("heading", { level: 2 }),
//     },
//     {
//       icon: <Heading3 className="size-4" />,
//       onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
//       preesed: editor.isActive("heading", { level: 3 }),
//     },
//     {
//       icon: <Bold className="size-4" />,
//       onClick: () => editor.chain().focus().toggleBold().run(),
//       preesed: editor.isActive("bold"),
//     },
//     {
//       icon: <Italic className="size-4" />,
//       onClick: () => editor.chain().focus().toggleItalic().run(),
//       preesed: editor.isActive("italic"),
//     },
//     {
//       icon: <Strikethrough className="size-4" />,
//       onClick: () => editor.chain().focus().toggleStrike().run(),
//       preesed: editor.isActive("strike"),
//     },
//     {
//       icon: <AlignLeft className="size-4" />,
//       onClick: () => editor.chain().focus().setTextAlign("left").run(),
//       preesed: editor.isActive({ textAlign: "left" }),
//     },
//     {
//       icon: <AlignCenter className="size-4" />,
//       onClick: () => editor.chain().focus().setTextAlign("center").run(),
//       preesed: editor.isActive({ textAlign: "center" }),
//     },
//     {
//       icon: <AlignRight className="size-4" />,
//       onClick: () => editor.chain().focus().setTextAlign("right").run(),
//       preesed: editor.isActive({ textAlign: "right" }),
//     },
//     {
//       icon: <List className="size-4" />,
//       onClick: () => editor.chain().focus().toggleBulletList().run(),
//       preesed: editor.isActive("bulletList"),
//     },
//     {
//       icon: <ListOrdered className="size-4" />,
//       onClick: () => editor.chain().focus().toggleOrderedList().run(),
//       preesed: editor.isActive("orderedList"),
//     },
//     {
//       icon: <Code className="size-4" />,
//       onClick: () => editor.chain().focus().toggleCodeBlock().run(),
//       preesed: editor.isActive("code"),
//     },
//     {
//       icon: <Highlighter className="size-4" />,
//       onClick: () => editor.chain().focus().toggleHighlight().run(),
//       preesed: editor.isActive("highlight"),
//     },
//     {
//       icon: <Upload className="size-4" />,
//       onClick: () => addImage(),
//       preesed: editor.isActive("image"),
//     },
//   ];

//   return (
//     <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky  top-10 z-50">
//       {Options.map((option, i) => (
//         <Toggle
//           key={i}
//           size="sm"
//           pressed={option.preesed}
//           onPressedChange={option.onClick}
//           className="text-black"
//         >
//           {option.icon}
//         </Toggle>
//       ))}
//     </div>
//   );
// }

"use client";
import React from "react";
import { List } from "lucide-react";
import { Toggle } from "../ui/toggle";

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
  Video,
} from "lucide-react";
import { ListOrdered } from "lucide-react";

export default function ToolBar({ editor }) {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addVideo = () => {
    const url = window.prompt("Enter video URL (YouTube or MP4):");
    if (url) {
      let videoEmbed;
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        // Convert YouTube URL to embeddable format
        const youtubeId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1];
        videoEmbed = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen></iframe>`;
      } else if (url.endsWith(".mp4")) {
        // Embed MP4 video
        videoEmbed = `<video width="560" height="315" controls><source src="${url}" type="video/mp4"></video>`;
      } else {
        alert("Invalid video URL. Please use a YouTube or MP4 link.");
        return;
      }
      editor.chain().focus().insertContent(videoEmbed).run();
    }
  };

  const Options = [
    ...Array.from({ length: 6 }, (_, i) => ({
      icon: React.createElement([Heading1, Heading2, Heading3, Heading4, Heading5, Heading6][i], { className: "size-4" }),
      onClick: () => editor.chain().focus().toggleHeading({ level: i + 1 }).run(),
      preesed: editor.isActive("heading", { level: i + 1 }),
    })),
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
      preesed: editor.isActive("code"),
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
      icon: <Video className="size-4" />,
      onClick: () => addVideo(),
      preesed: false,
    },
  ];

  return (
    <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky  top-10 z-50">
      {Options.map((option, i) => (
        <Toggle
          key={i}
          size="sm"
          pressed={option.preesed}
          onPressedChange={option.onClick}
          className="text-black"
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};
