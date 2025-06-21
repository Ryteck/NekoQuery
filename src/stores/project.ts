import type ShowProjectByIdReturn from "@/types/ShowProjectByIdReturn";
import { create } from "zustand";

interface ProjectState {
	project: null | ShowProjectByIdReturn;
}

const projectInitialState: ProjectState = {
	project: null,
};

interface ProjectActions {
	reset: () => void;

	setProject: (project: ShowProjectByIdReturn) => void;
}

type ProjectStore = ProjectState & ProjectActions;

export const useProjectStore = create<ProjectStore>()((set) => ({
	...projectInitialState,

	reset: () => set({ ...projectInitialState }),

	setProject: (project) => set({ project }),
}));
