import Repository from "@/domain/Repository";
import type { RenderedTeam } from "@/entities/Team";
import type { RenderedUser } from "@/entities/User";
import { type EncryptedMessage, decryptMessage } from "@/services/seedbox";

export default class ParticipantRepository extends Repository {
	public async getNanoId(
		user: RenderedUser,
		team: RenderedTeam,
		secretKey: string,
	): Promise<string> {
		const { nanoIdNonce, nanoIdCiphertext } =
			await this.prismaClient.participant.findUniqueOrThrow({
				where: { userId_teamId: { userId: user.id, teamId: team.id } },
				select: { nanoIdNonce: true, nanoIdCiphertext: true },
			});

		const encryptMessage: EncryptedMessage = {
			nonce: nanoIdNonce,
			ciphertext: nanoIdCiphertext,
		};

		return decryptMessage(encryptMessage, user.publicKey, secretKey);
	}
}
