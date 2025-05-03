import Entity from "@/domain/Entity";
import TeamRepository from "@/repositories/Team";
import type { ProjectSchema } from "@/schemas/zod/project";
import type { RenderedTeam } from "./Team";

export interface RenderedProject extends Omit<ProjectSchema, "teamId"> {
	team: RenderedTeam;
}

export default class ProjectEntity extends Entity<
	ProjectSchema,
	RenderedProject
> {
	public async render(): Promise<RenderedProject> {
		const { id, name, teamId, slug, stamp } = this.props;

		const teamRepository = new TeamRepository();
		const teamEntity = await teamRepository.show(teamId);
		const team = teamEntity.render();

		return { id, name, slug, stamp, team };
	}
}
