import { Signer } from "ethers";
import { Address } from "../types";
import { FLIRebalanceViewer } from "../contracts";
export default class DeployViewers {
    private _deployerSigner;
    constructor(deployerSigner: Signer);
    deployFLIRebalanceViewer(fliStrategyExtension: Address, uniswapV3Quoter: Address, uniswapV2Router: Address, uniswapV3Name: string, uniswapV2Name: string): Promise<FLIRebalanceViewer>;
}
