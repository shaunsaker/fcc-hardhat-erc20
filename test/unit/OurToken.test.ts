import { expect } from "chai"
import { deployments, ethers, getNamedAccounts } from "hardhat"
import { isDevelopment, networkConfig } from "../../helper-hardhat-config"
import { OurToken } from "../../typechain"

!isDevelopment
  ? describe.skip
  : describe("OurToken Unit Tests", () => {
      let deployer: string
      let ourToken: OurToken
      const networkName = "hardhat"

      beforeEach(async () => {
        const namedAccounts = await getNamedAccounts()
        deployer = namedAccounts.deployer

        await deployments.fixture(["all"])

        ourToken = await ethers.getContract("OurToken", deployer)
      })

      describe("constructor", () => {
        it("initialises the contract correctly", async () => {
          const totalSupply = await ourToken.totalSupply()

          // the totalSupply should match the initialSupply
          expect(totalSupply.toString()).to.equal(networkConfig[networkName].initialSupply)
        })
      })
    })
