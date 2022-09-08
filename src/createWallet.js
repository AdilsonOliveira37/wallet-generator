const bip39 = require("bip39");
const bip32 = require("bip32");
const bitcoin = require("bitcoinjs-lib");

// Define network
const network = bitcoin.networks.testnet;

// Generate a random mnemonic (uses crypto.randomBytes under the hood), defaults to 128-bits of entropy
const path = "m/49'/1'/0'/0";

// Create mnemonic seed
const mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Create master HDNode
const root = bip32.fromSeed(seed, network);

// Create HDNode for BIP44 account - PVT/PUB keys
const account = root.derivePath(path);
const node = account.derive(0).derive(0);

const btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address;

console.log("Mnemonic: ", mnemonic);
console.log("BTC Address: ", btcAddress);
console.log("PVT Key: ", node.toWIF());
