import { WebContainer } from "@webcontainer/api";
import { create } from "zustand";

interface WebContainerState {
	instance: null | WebContainer;
}

const webContainerInitialState: WebContainerState = {
	instance: null,
};

interface WebContainerActions {
	reset: () => void;

	getInstance: () => Promise<WebContainer>;
}

type WebContainerStore = WebContainerState & WebContainerActions;

export const useWebContainerStore = create<WebContainerStore>()((set, get) => ({
	...webContainerInitialState,

	reset: () => set({ ...webContainerInitialState }),

	getInstance: async () => {
		const currentInstance = get().instance;

		if (currentInstance) return currentInstance;

		const newInstance = await WebContainer.boot();

		set({ instance: newInstance });

		return newInstance;
	},
}));
