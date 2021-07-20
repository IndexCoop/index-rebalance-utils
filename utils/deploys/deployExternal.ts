import { Contract, Signer } from "ethers";

import { Address } from "./../types";

import { abi as V2_FACTORY_ABI } from "@uniswap/v2-core/build/UniswapV2Factory.json";
import { abi as PAIR_ABI } from "@uniswap/v2-core/build/UniswapV2Pair.json";

import {
  abi as QUOTER_ABI
} from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import {
  abi as V3_FACTORY_ABI,
} from "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json";
import {
  abi as POOL_ABI,
} from "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json";

export default class DeployExternalContracts {
  private _deployerSigner: Signer;

  constructor(deployerSigner: Signer) {
    this._deployerSigner = deployerSigner;
  }

  public async getUniswapV2FactoryInstance(factory: Address): Promise<any> {
    return await new Contract(factory, V2_FACTORY_ABI, this._deployerSigner);
  }

  public async getUniswapV2PairInstance(pair: Address): Promise<any> {
    return await new Contract(pair, PAIR_ABI, this._deployerSigner);
  }

  public async getUniswapV3QuoterInstance(quoter: Address): Promise<any> {
    return await new Contract(quoter, QUOTER_ABI, this._deployerSigner);
  }

  public async getUniswapV3FactoryInstance(factory: Address): Promise<any> {
    return await new Contract(factory, V3_FACTORY_ABI, this._deployerSigner);
  }

  public async getUniswapV3PoolInstance(pool: Address): Promise<any> {
    return await new Contract(pool, POOL_ABI, this._deployerSigner);
  }
}