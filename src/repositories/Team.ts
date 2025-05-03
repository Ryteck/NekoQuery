import Repository from "@/domain/Repository";
import TeamEntity from "@/entities/Team";
import type { RenderedUser } from "@/entities/User";
import type { Team } from "@/generated/prisma";
import { ParticipantLevel } from "@/generated/prisma";
import { generateSlug, generateStamp } from "@/libs/slug";
import { encryptMessage } from "@/services/seedbox";
import { nanoid } from "nanoid";

type StoreTeamData = Omit<Team, "id" | "slug" | "stamp">;
type UpdateTeamData = Partial<StoreTeamData>;

export default class TeamRepository extends Repository {
	public async list(user: RenderedUser): Promise<Array<TeamEntity>> {
		const databaseTeams = await this.prismaClient.team.findMany({
			where: {
				participants: {
					some: {
						userId: user.id,
						level: ParticipantLevel.ADMIN,
					},
				},
			},
		});

		return databaseTeams.map((team) => new TeamEntity(team));
	}

	public async store(
		user: RenderedUser,
		{ name }: StoreTeamData,
		secretKey: string,
	): Promise<TeamEntity> {
		const slug = generateSlug(name);
		const stamp = generateStamp();

		const nanoId = encryptMessage(nanoid(), user.publicKey, secretKey);

		const databaseTeam = await this.prismaClient.team.create({
			data: {
				name,
				slug,
				stamp,
				participants: {
					create: {
						userId: user.id,
						level: ParticipantLevel.ADMIN,
						nanoIdNonce: nanoId.nonce,
						nanoIdCiphertext: nanoId.ciphertext,
					},
				},
			},
		});

		return new TeamEntity(databaseTeam);
	}

	public async show(id: string, user: RenderedUser): Promise<TeamEntity> {
		const databaseTeam = await this.prismaClient.team.findUniqueOrThrow({
			where: {
				id,
				participants: {
					some: {
						userId: user.id,
						level: ParticipantLevel.ADMIN,
					},
				},
			},
		});

		return new TeamEntity(databaseTeam);
	}

	public async update(
		id: string,
		user: RenderedUser,
		{ name }: UpdateTeamData,
	): Promise<TeamEntity> {
		const slug = name ? generateSlug(name) : undefined;
		const stamp = name ? generateStamp() : undefined;

		const databaseTeam = await this.prismaClient.team.update({
			where: {
				id,
				participants: {
					some: {
						userId: user.id,
						level: ParticipantLevel.ADMIN,
					},
				},
			},
			data: {
				name,
				slug,
				stamp,
			},
		});

		return new TeamEntity(databaseTeam);
	}

	public async destroy(id: string, user: RenderedUser): Promise<TeamEntity> {
		const databaseTeam = await this.prismaClient.team.delete({
			where: {
				id,
				participants: {
					some: {
						userId: user.id,
						level: ParticipantLevel.ADMIN,
					},
				},
			},
		});

		return new TeamEntity(databaseTeam);
	}
}
