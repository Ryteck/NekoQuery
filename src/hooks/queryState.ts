import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useQueryState(key: string, defaultValue = "") {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const queryValue = searchParams.get(key);
	const [value, setValue] = useState(queryValue ?? defaultValue);

	const updateQuery = useCallback(
		(newValue: string) => {
			const params = new URLSearchParams(Array.from(searchParams.entries()));

			if (newValue) {
				params.set(key, newValue);
			} else {
				params.delete(key);
			}

			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
			setValue(newValue);
		},
		[key, pathname, router, searchParams],
	);

	// Sincroniza o estado se a URL mudar
	useEffect(() => {
		const current = searchParams.get(key);
		setValue(current ?? defaultValue);
	}, [key, searchParams, defaultValue]);

	return [value, updateQuery] as const;
}
