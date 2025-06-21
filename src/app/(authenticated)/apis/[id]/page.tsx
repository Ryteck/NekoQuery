import { showApiById } from "@/repositories/api";
import { ApiView } from "@/views/api";

interface Params {
	id: string;
}

interface Props {
	params: Promise<Params>;
}
export default async function Page(props: Props) {
	const params = await props.params;
	const api = await showApiById(params.id);

	return <ApiView api={api} />;
}
