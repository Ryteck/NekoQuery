import { auth } from "@/lib/auth";
import { OrganizationView } from "@/views/organization";
import { headers } from "next/headers";

interface Params {
	slug: string;
}

interface Props {
	params: Promise<Params>;
}

export default async function Page(props: Props) {
	const params = await props.params;

	const organization = await auth.api.getFullOrganization({
		headers: await headers(),
		query: { organizationSlug: params.slug },
	});

	if (organization) return <OrganizationView organization={organization} />;
}
