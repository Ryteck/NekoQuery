import { useWebContainerStore } from "@/stores/webContainer";
import { NodeViewWrapper } from "@tiptap/react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import ANSIToHTML from "ansi-to-html";
import { LoaderIcon, ZapIcon } from "lucide-react";
import { useState } from "react";

const initialCode = [
	`import 'isomorphic-fetch';`,
	`import chalk from 'chalk';`,
	"",
	`console.log(chalk.green("Hello World"));`,
].join("\n");

const ANSIConverter = new ANSIToHTML();

export function WebContainerEditor() {
	const [code, setCode] = useState(initialCode);
	const [output, setOutput] = useState<string[]>([]);
	const [isRunning, setIsRunning] = useState(false);

	const webContainerStore = useWebContainerStore();

	async function handleEvaluateCode() {
		setIsRunning(true);

		const webContainer = await webContainerStore.getInstance();

		await webContainer.mount({
			"index.js": {
				file: {
					contents: code,
				},
			},
			"package.json": {
				file: {
					contents: `
            {
              "name": "example-app",
              "type": "module",
              "dependencies": {
                "chalk": "latest",
                "isomorphic-fetch": "latest"
              },
              "scripts": {
                "start": "node index.js"
              }
            }
          `.trim(),
				},
			},
		});

		console.log("teste");

		const install = await webContainer.spawn("pnpm", ["i"], {
			// output: false,
		});

		setOutput(["🔥 Installing dependencies!"]);

		install.output.pipeTo(
			new WritableStream({
				write(data) {
					setOutput((state) => [...state, ANSIConverter.toHtml(data)]);
				},
			}),
		);

		await install.exit;

		setOutput((state) => [
			...state,
			"---------",
			"🚀 Running the application!",
		]);

		const start = await webContainer.spawn("pnpm", ["start"]);

		start.output.pipeTo(
			new WritableStream({
				write(data) {
					setOutput((state) => [...state, ANSIConverter.toHtml(data)]);
				},
			}),
		);

		setIsRunning(false);
	}

	function handleStopEvaluation() {
		setIsRunning(false);
	}

	return (
		<NodeViewWrapper className="not-prose">
			<CodeEditor
				value={code}
				language="js"
				placeholder="Please enter JS code."
				onChange={(event) => setCode(event.target.value)}
				minHeight={80}
				padding={20}
				spellCheck={false}
				className="text-sm bg-[#21202e] font-monospace rounded"
			/>
			<div
				className="bg-black p-5 min-h-[64px] w-full rounded mt-2 text-sm relative"
				contentEditable={false}
				spellCheck={false}
			>
				{output.length > 0 ? (
					<div className="font-monospace text-xs leading-loose">
						{output.map((line) => {
							return (
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								<p key={line} dangerouslySetInnerHTML={{ __html: line }} />
							);
						})}
					</div>
				) : (
					<span className="text-zinc-400">
						Click on run to evaluate the code.
					</span>
				)}

				<div className="absolute right-4 top-4">
					{isRunning ? (
						<button
							type="button"
							onClick={handleStopEvaluation}
							contentEditable={false}
							className="text-xs bg-zinc-500 rounded px-3 py-2 flex items-center gap-1 text-white font-semibold hover:bg-zinc-600"
						>
							<LoaderIcon color="#FFF" size={14} className="animate-spin" />
							Stop running
						</button>
					) : (
						<button
							type="button"
							onClick={handleEvaluateCode}
							contentEditable={false}
							className="text-xs bg-emerald-500 rounded px-3 py-2 flex items-center gap-1 text-white font-semibold hover:bg-emerald-600"
						>
							<ZapIcon color="#FFF" size={14} />
							Run code
						</button>
					)}
				</div>
			</div>
		</NodeViewWrapper>
	);
}
