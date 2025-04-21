import Repository from "../domain/Repository";
import type { User } from "../generated/prisma";

export default class UserRepository extends Repository {
	public list(): Promise<Array<User>> {
		return this.prismaClient.user.findMany();
	}

	public store({
		name,
		email,
		password,
		publicKey,
	}: Omit<User, "id">): Promise<User> {
		return this.prismaClient.user.create({
			data: {
				name,
				email,
				password,
				publicKey,
			},
		});
	}

	public show(id: string): Promise<User> {
		return this.prismaClient.user.findUniqueOrThrow({ where: { id } });
	}

	public update(
		id: string,
		{ name, email, publicKey }: Partial<Omit<User, "id" | "password">>,
	): Promise<User> {
		return this.prismaClient.user.update({
			where: { id },
			data: {
				name,
				email,
				publicKey,
			},
		});
	}

	public destroy(id: string): Promise<User> {
		return this.prismaClient.user.delete({ where: { id } });
	}
}
