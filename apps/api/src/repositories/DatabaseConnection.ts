import type { DatabaseConnection } from "@prisma/client";
import RepositoryDomain from "../domain/Repository";

export default class DatabaseConnectionRepository extends RepositoryDomain {
	index(): Promise<Array<DatabaseConnection>> {
		return this.prismaClient.databaseConnection.findMany();
	}

	find(id: string): Promise<DatabaseConnection> {
		return this.prismaClient.databaseConnection.findUniqueOrThrow({
			where: { id },
		});
	}

	store({
		name,
		url,
	}: Omit<DatabaseConnection, "id">): Promise<DatabaseConnection> {
		return this.prismaClient.databaseConnection.create({
			data: {
				name,
				url,
			},
		});
	}

	update(
		id: string,
		{ name, url }: Partial<Omit<DatabaseConnection, "id">>,
	): Promise<DatabaseConnection> {
		return this.prismaClient.databaseConnection.update({
			where: { id },
			data: {
				name,
				url,
			},
		});
	}

	destroy(id: string): Promise<DatabaseConnection> {
		return this.prismaClient.databaseConnection.delete({ where: { id } });
	}
}
