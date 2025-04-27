import Entity from "@/domain/Entity";
import UserRepository from "@/repositories/User";
import type { TeamSchema } from "@/schemas/zod/team";
import type { RenderedUser } from "./User";

export interface RenderedTeam extends Omit<TeamSchema, "userId"> {
	user: RenderedUser;
}

export default class TeamEntity extends Entity<TeamSchema, RenderedTeam> {
	public async render(): Promise<RenderedTeam> {
		const { id, name, userId, slug, stamp } = this.props;

		const userRepository = new UserRepository();
		const userEntity = await userRepository.show(userId);
		const user = userEntity.render();

		return { id, name, slug, stamp, user };
	}
}
