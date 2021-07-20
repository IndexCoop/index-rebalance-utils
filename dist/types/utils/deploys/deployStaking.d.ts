import { Signer, BigNumberish } from "ethers";
import { Address } from "../types";
import { StakingRewardsV2 } from "../contracts/index";
export default class DeployStaking {
    private _deployerSigner;
    constructor(deployerSigner: Signer);
    deployStakingRewardsV2(owner: Address, rewardToken: Address, stakingToken: Address, duration: BigNumberish): Promise<StakingRewardsV2>;
}
