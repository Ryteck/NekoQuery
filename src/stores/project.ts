import type ShowProjectByIdReturn from "@/types/ShowProjectByIdReturn";
import { create } from "zustand";

interface ProjectState {
	project: null | ShowProjectByIdReturn;
	setProjet: (project: ShowProjectByIdReturn) => void;
}

export const useProjectStore = create<ProjectState>()((set) => ({
	project: null,

	setProjet: (project) => set({ project }),
}));
