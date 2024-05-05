# FundSphere
A minimalistic crowd funding web app

## intro 

Introducing Fundsphere: Empowering Crowdfunding through the Web3 Revolution

Fundsphere is a pioneering crowdfunding platform at the forefront of the Web3 movement. With its innovative approach to fundraising, Fundsphere merges the power of blockchain technology with the inclusivity of crowdfunding to create a decentralized ecosystem that empowers creators and backers alike.


## TestNet config

- rpc-url: `https://soroban-testnet.stellar.org:443`
- passphrase: `Test SDF Network ; September 2015`


### Configure soroban CLI

https://developers.stellar.org/docs/smart-contracts/getting-started/setup

#### configure testnet

```ps
soroban network add --global testnet --rpc-url "https://soroban-testnet.stellar.org:443" --network-passphrase "Test SDF Network ; September 2015"
```


## Deploy 

Compile the contracts in `./contracts` directory by running `soroban contract compile` command. This will generate `wasm` files in target directory.

```ps
soroban contract install --rpc-url "https://soroban-testnet.stellar.org:443" --network-passphrase "Test SDF Network ; September 2015" --network testnet --source <IDENTITY> --wasm <WASM FILE PATH>
```