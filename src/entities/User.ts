import Entity from "@/domain/Entity";
import type { UserSchema } from "@/schemas/zod/user";

export type RenderedUser = Omit<UserSchema, "password">;

export default class UserEntity extends Entity<UserSchema, RenderedUser> {
	public render(): RenderedUser {
		const { id, name, email, publicKey } = this.props;
		return { id, name, email, publicKey };
	}

	public static generatePasswordHash(password: string): Promise<string> {
		return Bun.password.hash(password);
	}

	public async validatePassword(password: string): Promise<void> {
		const isCorrectPassword = await Bun.password.verify(
			password,
			this.props.password,
		);

		if (!isCorrectPassword) throw new Error("Wrong Password");
	}
}
