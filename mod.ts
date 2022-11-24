import * as wasm from "./lib/capi_crypto_wrappers.generated.js"

await wasm.instantiate()
wasm.init()

export {
  sr25519_from_seed,
  sr25519_pubkey,
  sr25519_sign,
  sr25519_verify,
} from "./lib/capi_crypto_wrappers.generated.js"
