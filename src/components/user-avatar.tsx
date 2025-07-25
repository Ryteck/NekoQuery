import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserAvatarComponent() {
	return (
		<Avatar className="h-8 w-8 rounded-lg">
			<AvatarImage src="/api/avatar" alt="@shadcn" />
			<AvatarFallback className="rounded-lg">CN</AvatarFallback>
		</Avatar>
	);
}
