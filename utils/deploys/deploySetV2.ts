import { Contract, Signer } from "ethers";
import { Address } from "../types";

import { abi as GIM_ABI } from "@setprotocol/set-protocol-v2/artifacts/contracts/protocol/modules/GeneralIndexModule.sol/GeneralIndexModule.json";
import { abi as SET_TOKEN_ABI } from "@setprotocol/set-protocol-v2/artifacts/contracts/protocol/SetToken.sol/SetToken.json";
import { abi as ERC20_ABI } from "@setprotocol/set-protocol-v2/artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";

export default class DeploySetV2 {
  private _deployerSigner: Signer;

  constructor(deployerSigner: Signer) {
    this._deployerSigner = deployerSigner;
  }

  public async getTokenMock(token: Address): Promise<any> {
    return await new Contract(token, ERC20_ABI, this._deployerSigner);
  }

  public async getSetToken(setToken: Address): Promise<any> {
    return await new Contract(setToken, SET_TOKEN_ABI, this._deployerSigner);
  }

  public async getGeneralIndexModule(indexModule: Address): Promise<any> {
    return await new Contract(indexModule, GIM_ABI, this._deployerSigner);
  }
}