import { Signer, BigNumber } from "ethers";
import { Address } from "../types";
import { SupplyCapIssuanceHook } from "../contracts/index";
import { SupplyCapAllowedCallerIssuanceHook } from "../contracts/index";
export default class DeployHooks {
    private _deployerSigner;
    constructor(deployerSigner: Signer);
    deploySupplyCapIssuanceHook(initialOwner: Address, supplyCap: BigNumber): Promise<SupplyCapIssuanceHook>;
    deploySupplyCapAllowedCallerIssuanceHook(initialOwner: Address, supplyCap: BigNumber): Promise<SupplyCapAllowedCallerIssuanceHook>;
}
