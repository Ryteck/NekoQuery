import Entity from "@/domain/Entity";
import type { TeamSchema } from "@/schemas/zod/team";

export type RenderedTeam = TeamSchema;

export default class TeamEntity extends Entity<TeamSchema, RenderedTeam> {
	public render(): RenderedTeam {
		const { id, name, slug, stamp } = this.props;
		return { id, name, slug, stamp };
	}
}
