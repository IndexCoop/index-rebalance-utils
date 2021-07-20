import { Signer } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { Address } from "../types";
import { ICManager, BaseManager } from "../contracts/index";
export default class DeployToken {
    private _deployerSigner;
    constructor(deployerSigner: Signer);
    deployICManager(set: Address, indexModule: Address, feeModule: Address, operator: Address, methodologist: Address, coopFeeSplit: BigNumber): Promise<ICManager>;
    deployBaseManager(set: Address, operator: Address, methodologist: Address): Promise<BaseManager>;
}
