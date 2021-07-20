import { Signer } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { Address } from "../types";
import { IndexPowah, IndexToken, MerkleDistributor, OtcEscrow, Vesting } from "../contracts";
export default class DeployToken {
    private _deployerSigner;
    constructor(deployerSigner: Signer);
    deployIndexToken(initialAccount: Address): Promise<IndexToken>;
    deployMerkleDistributor(token: Address, merkleRoot: string): Promise<MerkleDistributor>;
    deployVesting(token: Address, recipient: Address, vestingAmount: BigNumber, vestingBegin: BigNumber, vestingCliff: BigNumber, vestingEnd: BigNumber): Promise<Vesting>;
    deployOtcEscrow(beneficiary: Address, indexGov: Address, vestingStart: BigNumber, vestingCliff: BigNumber, vestingEnd: BigNumber, usdcAmount: BigNumber, indexAmount: BigNumber, usdcAddress: Address, indexAddress: Address): Promise<OtcEscrow>;
    deployIndexPowah(owner: Address, indexToken: Address, uniPair: Address, sushiPair: Address, masterChef: Address, masterChefId: BigNumber, farms: Address[], vesting: Address[]): Promise<IndexPowah>;
}
