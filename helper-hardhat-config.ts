import { BigNumber } from "ethers"
import { ethers, network } from "hardhat"

export const networkConfig: {
  [name: string]: {
    initialSupply: string
  }
} = {
  localhost: {
    initialSupply: "5000000000", // 50e18
  },
  hardhat: {
    initialSupply: "5000000000",
  },
  rinkeby: {
    initialSupply: "5000000000",
  },
}

export const developmentChains = ["hardhat", "localhost"]

export const isDevelopment = developmentChains.includes(network.name)

export const BLOCK_CONFIRMATIONS = 6
