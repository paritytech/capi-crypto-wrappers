import { emptyDir } from "https://deno.land/std@0.165.0/fs/empty_dir.ts"

const syncJs = await Deno.readTextFile("lib/sync/capi_crypto_wrappers.generated.js")
const wasmBytesCode = /const wasmBytes = [^;]+;/.exec(syncJs)?.[0]
if (!wasmBytesCode) throw new Error("Invalid code generated by wasmbuild")
const fetchJs = await Deno.readTextFile("lib/fetch/capi_crypto_wrappers.generated.js")

const asyncJs = fetchJs.replace(
  /(.*function instantiateModule.*\n)[^]+?\n\}/m,
  `$1  ${wasmBytesCode}\n  return WebAssembly.instantiate(wasmBytes, imports);\n}`,
) + `
function base64decode(b64) {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}
`

await emptyDir("lib/async")

await Deno.writeTextFile("lib/async/capi_crypto_wrappers.generated.js", asyncJs)
