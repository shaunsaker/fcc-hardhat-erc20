import { ethers, network } from "hardhat"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { BLOCK_CONFIRMATIONS, isDevelopment, networkConfig } from "../helper-hardhat-config"
import { verify } from "../utils/verify"

module.exports = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const initialSupply = networkConfig[network.name].initialSupply

  const ourTokenArgs = [initialSupply]
  const ourToken = await deploy("OurToken", {
    from: deployer,
    args: ourTokenArgs,
    log: true,
    waitConfirmations: !isDevelopment ? BLOCK_CONFIRMATIONS : 1,
  })

  if (!isDevelopment && process.env.ETHERSCAN_API_KEY) {
    // verify the contract if not in development
    await verify(ourToken.address, ourTokenArgs)
  }

  log("--------------------------------")
}

module.exports.tags = ["all", "our-token"]
