"use client";

import "highlight.js/styles/tokyo-night-dark.min.css";
import "./styles/placeholder.css";

import { lowlight } from "@/lib/lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorBlockPlugin } from "./plugins/EditorBlock";
import { TrailingNodePlugin } from "./plugins/TrailingNode";

export function EditorComponent() {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class: "prose prose-invert outline-none max-w-none w-full",
			},
		},
		extensions: [
			StarterKit.configure({
				codeBlock: false,
				document: false,
			}),
			Document.extend({
				content: "heading block*",
			}),
			CodeBlockLowlight.configure({
				lowlight,
			}),
			Placeholder.configure({
				placeholder: ({ node }) => {
					if (node.type.name === "heading") {
						return "Untitled";
					}

					if (node.type.name === "editorBlock") {
						return "";
					}

					return "Type '/' to see commands...";
				},
			}),

			EditorBlockPlugin,
			TrailingNodePlugin,
		],
		content: "",
	});

	if (editor) return <EditorContent editor={editor} />;
}
