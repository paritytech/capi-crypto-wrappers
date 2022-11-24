import { wasm } from "./lib.ts"

export const {
  sr25519_from_seed,
  sr25519_pubkey,
  sr25519_sign,
  sr25519_verify,
} = wasm
