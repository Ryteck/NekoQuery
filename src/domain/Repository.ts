import { PrismaClient } from "@/generated/prisma/client";

export default abstract class Repository {
	private static _prismaClient = new PrismaClient();

	protected get prismaClient(): PrismaClient {
		return Repository._prismaClient;
	}
}
