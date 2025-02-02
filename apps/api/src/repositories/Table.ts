import type { Table } from "@prisma/client";
import RepositoryDomain from "../domain/Repository";

export default class TableRepository extends RepositoryDomain {
	index(): Promise<Array<Table>> {
		return this.prismaClient.table.findMany();
	}

	find(id: string): Promise<Table> {
		return this.prismaClient.table.findUniqueOrThrow({ where: { id } });
	}

	store({ name }: Omit<Table, "id">): Promise<Table> {
		return this.prismaClient.table.create({
			data: {
				name,
			},
		});
	}

	update(id: string, { name }: Partial<Omit<Table, "id">>): Promise<Table> {
		return this.prismaClient.table.update({
			where: { id },
			data: {
				name,
			},
		});
	}

	destroy(id: string): Promise<Table> {
		return this.prismaClient.table.delete({ where: { id } });
	}
}
