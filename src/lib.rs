use schnorrkel::{
  ExpansionMode, MiniSecretKey, PublicKey, SecretKey, Signature,
};
use wasm_bindgen::prelude::*;

const CTX: &'static [u8] = b"substrate";

#[wasm_bindgen]
pub fn init() {
  std::panic::set_hook(Box::new(console_error_panic_hook::hook));
}

#[wasm_bindgen]
pub fn sr25519_sign(pubkey: &[u8], secret: &[u8], msg: &[u8]) -> Vec<u8> {
  let pubkey = PublicKey::from_bytes(pubkey).expect("Invalid pubkey");
  let secret = SecretKey::from_ed25519_bytes(secret).expect("Invalid secret");
  secret.sign_simple(CTX, msg, &pubkey).to_bytes().to_vec()
}

#[wasm_bindgen]
pub fn sr25519_verify(pubkey: &[u8], msg: &[u8], sig: &[u8]) -> bool {
  let pubkey = PublicKey::from_bytes(pubkey).expect("Invalid pubkey");
  let sig = Signature::from_bytes(sig).expect("Invalid signature");
  pubkey.verify_simple(CTX, msg, &sig).is_ok()
}

#[wasm_bindgen]
pub fn sr25519_pubkey(secret: &[u8]) -> Vec<u8> {
  let secret = SecretKey::from_ed25519_bytes(secret).expect("Invalid secret");
  secret.to_public().to_bytes().to_vec()
}

#[wasm_bindgen]
pub fn sr25519_from_seed(seed: &[u8]) -> Vec<u8> {
  let secret = MiniSecretKey::from_bytes(seed).expect("Invalid seed");
  secret
    .expand_to_keypair(ExpansionMode::Ed25519)
    .to_half_ed25519_bytes()
    .to_vec()
}
