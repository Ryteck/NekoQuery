export default function SocialLoginComponent() {
	return (
		<div className="grid grid-cols-3 gap-3">
			{["Google", "GitHub", "Facebook"].map((arg) => (
				<button
					key={arg}
					type="button"
					className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-neutral-600 rounded-md shadow-sm bg-neutral-700 text-sm font-medium text-neutral-300 hover:bg-neutral-600"
				>
					{arg}
				</button>
			))}
		</div>
	);
}
