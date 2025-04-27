import Repository from "@/domain/Repository";
import TeamEntity from "@/entities/Team";
import type { Team } from "@/generated/prisma";
import { generateSlug, generateStamp } from "@/libs/slug";

type StoreTeamData = Omit<Team, "id" | "slug" | "stamp">;
type UpdateTeamData = Partial<Omit<StoreTeamData, "userId">>;

export default class TeamRepository extends Repository {
	public async list(): Promise<Array<TeamEntity>> {
		const databaseTeams = await this.prismaClient.team.findMany();

		return databaseTeams.map((team) => new TeamEntity(team));
	}

	public async store({ name, userId }: StoreTeamData): Promise<TeamEntity> {
		const slug = generateSlug(name);
		const stamp = generateStamp();

		const databaseTeam = await this.prismaClient.team.create({
			data: {
				name,
				userId,
				slug,
				stamp,
			},
		});

		return new TeamEntity(databaseTeam);
	}

	public async show(id: string): Promise<TeamEntity> {
		const databaseTeam = await this.prismaClient.team.findUniqueOrThrow({
			where: { id },
		});

		return new TeamEntity(databaseTeam);
	}

	public async update(
		id: string,
		{ name }: UpdateTeamData,
	): Promise<TeamEntity> {
		const slug = name ? generateSlug(name) : undefined;
		const stamp = name ? generateStamp() : undefined;

		const databaseTeam = await this.prismaClient.team.update({
			where: { id },
			data: {
				name,
				slug,
				stamp,
			},
		});

		return new TeamEntity(databaseTeam);
	}

	public async destroy(id: string): Promise<TeamEntity> {
		const databaseTeam = await this.prismaClient.team.delete({ where: { id } });

		return new TeamEntity(databaseTeam);
	}
}
