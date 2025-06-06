import { Button } from "./ui/button";

export default function SocialLoginComponent() {
	return (
		<div className="grid grid-cols-3 gap-3">
			{["Google", "GitHub", "Facebook"].map((arg) => (
				<Button variant="outline" key={arg} type="button">
					{arg}
				</Button>
			))}
		</div>
	);
}
