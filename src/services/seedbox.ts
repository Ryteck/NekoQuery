import { sha256 } from "js-sha256";
import nacl from "tweetnacl";
import * as naclUtil from "tweetnacl-util";

/**
 * Represents a base64-encoded asymmetric key pair derived from a seed.
 *
 * Both keys are encoded as base64 strings for easy storage, transmission,
 * and compatibility with JSON, files, or databases.
 */
export interface KeyPair {
	/**
	 * Public key encoded in base64 (used to encrypt or verify messages).
	 */
	publicKey: string;

	/**
	 * Secret/private key encoded in base64 (used to decrypt or sign messages).
	 */
	secretKey: string;
}

/**
 * Represents an encrypted message using NaCl box encryption.
 *
 * Both the nonce and ciphertext are encoded in base64 to ensure
 * safe transmission and compatibility with text-based storage formats.
 */
export interface EncryptedMessage {
	/**
	 * A unique nonce (number used once) used during encryption, encoded in base64.
	 */
	nonce: string;

	/**
	 * The encrypted ciphertext, encoded in base64.
	 */
	ciphertext: string;
}

/**
 * Generates a deterministic asymmetric key pair from a given seed string.
 *
 * This function derives a 32-byte secret key using the SHA-256 hash of the input seed.
 * It then uses NaCl's Curve25519 key generation to produce a public/secret key pair.
 * The resulting keys are returned as base64-encoded strings for easy storage and transport.
 *
 * Note: Since this is deterministic, using the same seed will always produce the same key pair.
 *
 * @param seed A user-defined string used to deterministically derive the key pair
 * @returns An object containing the base64-encoded public and secret keys
 */
export function generateKeyPairFromSeed(seed: string): KeyPair {
	const hash = sha256.digest(seed); // Generate 32-byte hash from seed

	const uint8Seed = new Uint8Array(hash); // Convert hash to Uint8Array

	const keyPair = nacl.box.keyPair.fromSecretKey(uint8Seed); // Deterministic key generation

	return {
		publicKey: naclUtil.encodeBase64(keyPair.publicKey),
		secretKey: naclUtil.encodeBase64(keyPair.secretKey),
	};
}

/**
 * Encrypts a UTF-8 plaintext message using NaCl's public-key authenticated encryption (box).
 *
 * This function takes a plaintext string, and base64-encoded keys (recipient's public key and sender's secret key),
 * and returns an EncryptedMessage object containing the ciphertext and nonce, both encoded in base64.
 *
 * The nonce is randomly generated for each encryption and ensures uniqueness and security.
 *
 * @param message The plaintext message to encrypt (UTF-8 string)
 * @param recipientPublicKey The recipient's public key, encoded as a base64 string
 * @param senderSecretKey The sender's private/secret key, encoded as a base64 string
 * @returns An EncryptedMessage object with base64-encoded ciphertext and nonce
 */
export function encryptMessage(
	message: string,
	recipientPublicKey: string,
	senderSecretKey: string,
): EncryptedMessage {
	const nonce = nacl.randomBytes(nacl.box.nonceLength);

	const box = nacl.box(
		naclUtil.decodeUTF8(message),
		nonce,
		naclUtil.decodeBase64(recipientPublicKey),
		naclUtil.decodeBase64(senderSecretKey),
	);

	return {
		nonce: naclUtil.encodeBase64(nonce),
		ciphertext: naclUtil.encodeBase64(box),
	};
}

/**
 * Decrypts a message encrypted using NaCl's asymmetric box method.
 *
 * This function takes an EncryptedMessage object (containing base64-encoded ciphertext and nonce),
 * along with the sender's public key and the recipient's secret key (both as base64 strings).
 * It attempts to decrypt the message using these keys.
 *
 * @param encryptedMessage An object containing the base64-encoded ciphertext and nonce
 * @param senderPublicKey The sender's public key, encoded as a base64 string
 * @param recipientSecretKey The recipient's private/secret key, encoded as a base64 string
 * @returns The original decrypted plaintext message as a UTF-8 string
 * @throws Error if decryption fails (e.g., keys do not match or message is tampered)
 */
export function decryptMessage(
	encryptedMessage: EncryptedMessage,
	senderPublicKey: string,
	recipientSecretKey: string,
): string {
	const messageUint8 = nacl.box.open(
		naclUtil.decodeBase64(encryptedMessage.ciphertext),
		naclUtil.decodeBase64(encryptedMessage.nonce),
		naclUtil.decodeBase64(senderPublicKey),
		naclUtil.decodeBase64(recipientSecretKey),
	);

	if (!messageUint8) throw new Error("Decryption failed");

	return naclUtil.encodeUTF8(messageUint8);
}
