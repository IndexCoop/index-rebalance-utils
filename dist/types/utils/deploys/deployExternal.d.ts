import { Signer } from "ethers";
import { Address } from "./../types";
export default class DeployExternalContracts {
    private _deployerSigner;
    constructor(deployerSigner: Signer);
    getUniswapV2FactoryInstance(factory: Address): Promise<any>;
    getUniswapV2PairInstance(pair: Address): Promise<any>;
    getUniswapV3QuoterInstance(quoter: Address): Promise<any>;
    getUniswapV3FactoryInstance(factory: Address): Promise<any>;
    getUniswapV3PoolInstance(pool: Address): Promise<any>;
}
