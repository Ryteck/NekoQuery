import { showProjectById } from "@/repositories/project";

interface Params {
	id: string;
}

interface Props {
	params: Promise<Params>;
}

export default async function Page(props: Props) {
	const params = await props.params;

	const project = await showProjectById(params.id);

	return (
		<div className="flex flex-col gap-2">
			<h3>Project:</h3>

			<pre>
				<code>{JSON.stringify(project, null, 2)}</code>
			</pre>
		</div>
	);
}
