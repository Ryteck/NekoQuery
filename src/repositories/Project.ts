import Repository from "@/domain/Repository";
import ProjectEntity from "@/entities/Project";
import type { Project } from "@/generated/prisma";
import { generateSlug, generateStamp } from "@/libs/slug";

type StoreProjectData = Omit<Project, "id" | "slug" | "stamp">;
type UpdateProjectData = Partial<Omit<StoreProjectData, "teamId">>;

export default class ProjectRepository extends Repository {
	public async list(): Promise<Array<ProjectEntity>> {
		const databaseProjects = await this.prismaClient.project.findMany();

		return databaseProjects.map((project) => new ProjectEntity(project));
	}

	public async store({
		name,
		teamId,
	}: StoreProjectData): Promise<ProjectEntity> {
		const slug = generateSlug(name);
		const stamp = generateStamp();

		const databaseProject = await this.prismaClient.project.create({
			data: {
				name,
				teamId,
				slug,
				stamp,
			},
		});

		return new ProjectEntity(databaseProject);
	}

	public async show(id: string): Promise<ProjectEntity> {
		const databaseProject = await this.prismaClient.project.findUniqueOrThrow({
			where: { id },
		});

		return new ProjectEntity(databaseProject);
	}

	public async update(
		id: string,
		{ name }: UpdateProjectData,
	): Promise<ProjectEntity> {
		const slug = name ? generateSlug(name) : undefined;
		const stamp = name ? generateStamp() : undefined;

		const databaseProject = await this.prismaClient.project.update({
			where: { id },
			data: {
				name,
				slug,
				stamp,
			},
		});

		return new ProjectEntity(databaseProject);
	}

	public async destroy(id: string): Promise<ProjectEntity> {
		const databaseProject = await this.prismaClient.project.delete({
			where: { id },
		});

		return new ProjectEntity(databaseProject);
	}
}
