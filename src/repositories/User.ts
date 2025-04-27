import Repository from "@/domain/Repository";
import UserEntity from "@/entities/User";
import type { User } from "@/generated/prisma";

type StoreUserData = Omit<User, "id">;
type UpdateUserData = Partial<Omit<StoreUserData, "password">>;

export default class UserRepository extends Repository {
	public async list(): Promise<Array<UserEntity>> {
		const databaseUsers = await this.prismaClient.user.findMany();

		return databaseUsers.map((user) => new UserEntity(user));
	}

	public async store({
		name,
		email,
		password,
		publicKey,
	}: StoreUserData): Promise<UserEntity> {
		const passwordHash = await UserEntity.generatePasswordHash(password);

		const databaseUser = await this.prismaClient.user.create({
			data: {
				name,
				email,
				password: passwordHash,
				publicKey,
			},
		});

		return new UserEntity(databaseUser);
	}

	public async show(id: string): Promise<UserEntity> {
		const databaseUser = await this.prismaClient.user.findUniqueOrThrow({
			where: { id },
		});

		return new UserEntity(databaseUser);
	}

	public async showByEmail(email: string): Promise<UserEntity> {
		const databaseUser = await this.prismaClient.user.findUniqueOrThrow({
			where: { email },
		});

		return new UserEntity(databaseUser);
	}

	public async update(
		id: string,
		{ name, email, publicKey }: UpdateUserData,
	): Promise<UserEntity> {
		const databaseUser = await this.prismaClient.user.update({
			where: { id },
			data: { name, email, publicKey },
		});

		return new UserEntity(databaseUser);
	}

	public async destroy(id: string): Promise<UserEntity> {
		const databaseUser = await this.prismaClient.user.delete({ where: { id } });

		return new UserEntity(databaseUser);
	}
}
