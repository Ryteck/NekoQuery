import { Node, textblockTypeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react";

import { WebContainerEditor } from "../WebContainerEditor";

export const backtickInputRegex = /^```wc-([a-z]+)?[\s\n]$/;

export const EditorBlockPlugin = Node.create({
	name: "editorBlock",
	content: "text*",
	marks: "",
	group: "block",
	code: true,
	defining: true,
	isolating: true,

	addOptions() {
		return {
			languageClassPrefix: "language-",
			exitOnTripleEnter: true,
			exitOnArrowDown: true,
			HTMLAttributes: {},
		};
	},

	addInputRules() {
		return [
			textblockTypeInputRule({
				find: backtickInputRegex,
				type: this.type,
			}),
		];
	},

	addKeyboardShortcuts() {
		return {
			Enter: ({ editor }) => {
				return false;
			},
		};
	},

	addNodeView() {
		return ReactNodeViewRenderer(WebContainerEditor);
	},

	parseHTML() {
		return [{ tag: "editor-block" }];
	},

	renderHTML({ HTMLAttributes }) {
		return ["editor-block", mergeAttributes(HTMLAttributes)];
	},
});
