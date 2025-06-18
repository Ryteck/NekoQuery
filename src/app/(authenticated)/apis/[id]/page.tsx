interface Params {
	id: string;
}

interface Props {
	params: Promise<Params>;
}
export default async function Page(props: Props) {
	const params = await props.params;

	return (
		<div className="flex flex-col gap-2">
			<h3>API:</h3>

			<pre>
				<code>{JSON.stringify({ api: params }, null, 2)}</code>
			</pre>
		</div>
	);
}
