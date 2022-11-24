import * as wasm from "./lib/async/capi_crypto_wrappers.generated.js"

await wasm.instantiate()
wasm.init()

export { wasm }
