import * as wasm from "./lib/capi_crypto_wrappers.generated.js"

wasm.instantiate()
wasm.init()

export * from "./lib/capi_crypto_wrappers.generated.js"
