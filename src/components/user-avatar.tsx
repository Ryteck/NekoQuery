import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserAvatarComponent() {
	return (
		<Avatar className="h-8 w-8 rounded-lg">
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback className="rounded-lg">CN</AvatarFallback>
		</Avatar>
	);
}
