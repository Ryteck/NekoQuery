import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface Params {
	id: string;
}

interface Props {
	params: Promise<Params>;
}

export default async function Page(props: Props) {
	const params = await props.params;

	const organization = await auth.api.getFullOrganization({
		headers: await headers(),
		query: { organizationId: params.id },
	});

	return (
		<div className="flex flex-col gap-2">
			<h3>Organization:</h3>

			<pre>
				<code>{JSON.stringify(organization, null, 2)}</code>
			</pre>
		</div>
	);
}
