import { create } from "zustand";

interface NavigationPage {
	title: string;
	url: string;
}

interface NavigationState {
	basePage: null | NavigationPage;
	enableOrganizations: boolean;
	subPages: null | NavigationPage[];
	currentPage: null | string;
}

const navigationInitialState: NavigationState = {
	basePage: null,
	enableOrganizations: false,
	subPages: null,
	currentPage: null,
};

interface NavigationActions {
	reset: () => void;

	setBasePath: (basePage: null | NavigationPage) => void;
	setEnableOrganizations: (enableOrganizations: boolean) => void;
	setSubPages: (subPages: null | NavigationPage[]) => void;
	setCurrentPage: (currentPage: null | string) => void;
}

type NavigationStore = NavigationState & NavigationActions;

export const useNavigationStore = create<NavigationStore>()((set) => ({
	...navigationInitialState,

	reset: () => set({ ...navigationInitialState }),

	setBasePath: (basePage) => set({ basePage }),
	setEnableOrganizations: (enableOrganizations) => set({ enableOrganizations }),
	setSubPages: (subPages) => set({ subPages }),
	setCurrentPage: (currentPage) => set({ currentPage }),
}));
