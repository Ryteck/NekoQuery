import { t } from "elysia";

const userTypeBoxSchema = t.Object({
	id: t.String({
		format: "uuid",
		description: "Unique identifier for the user, represented in UUID format.",
	}),
	name: t.String({
		description: "Full name of the user.",
	}),
	email: t.String({
		format: "email",
		description:
			"Email address of the user, used for identification and communication.",
	}),
	password: t.String({
		description:
			"Password for the user account. It should be securely hashed before storage.",
	}),
	publicKey: t.String({
		description:
			"User's public key used for cryptographic operations such as secure communication or authentication.",
	}),
});

export default userTypeBoxSchema;
