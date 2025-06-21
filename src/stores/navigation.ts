import { create } from "zustand";

interface NavigationPage {
	title: string;
	url: string;
}

interface NavigationState {
	basePage: null | NavigationPage;
	enableOrganizations: boolean;
	currentPage: null | string;
}

const navigationInitialState: NavigationState = {
	basePage: null,
	enableOrganizations: false,
	currentPage: null,
};

interface NavigationActions {
	reset: () => void;

	setBasePath: (basePage: null | NavigationPage) => void;
	setEnableOrganizations: (enableOrganizations: boolean) => void;
	setCurrentPage: (currentPage: null | string) => void;
}

type NavigationStore = NavigationState & NavigationActions;

export const useNavigationStore = create<NavigationStore>()((set) => ({
	...navigationInitialState,

	reset: () => set({ ...navigationInitialState }),

	setBasePath: (basePage) => set({ basePage }),
	setEnableOrganizations: (enableOrganizations) => set({ enableOrganizations }),
	setCurrentPage: (currentPage) => set({ currentPage }),
}));
