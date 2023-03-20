import * as wasm from "./lib/sync/capi_crypto_wrappers.generated.js"

wasm.instantiate()
wasm.init()

export { wasm }
