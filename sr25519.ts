import { sr25519_from_seed, sr25519_pubkey, sr25519_sign, sr25519_verify } from "./wasm.ts"

export class Sr25519 {
  constructor(readonly pubkey: Uint8Array, readonly secret: Uint8Array) {
    if (pubkey.length !== 32) throw new Error("Invalid pubkey")
    if (secret.length !== 64) throw new Error("Invalid secret")
  }

  static fromSecret(secret: Uint8Array) {
    return new Sr25519(sr25519_pubkey(secret), secret)
  }

  static fromSeed(seed: Uint8Array) {
    const pair = sr25519_from_seed(seed)
    return new Sr25519(pair.slice(64), pair.slice(0, 64))
  }

  sign = (msg: Uint8Array) => sr25519_sign(this.pubkey, this.secret, msg)

  static verify(pubkey: Uint8Array, msg: Uint8Array, sig: Uint8Array) {
    return sr25519_verify(pubkey, msg, sig)
  }
}
