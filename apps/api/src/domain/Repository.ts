import type { PrismaClient } from "@prisma/client";
import prismaClient from "../services/prisma";

export default abstract class RepositoryDomain {
	protected prismaClient: PrismaClient;

	constructor() {
		this.prismaClient = prismaClient;
	}
}
