import { Signer } from "ethers";
import { Address } from "../types";
import {
  GeneralIndexModule,
  SetToken,
} from "../contracts/setV2";
// import { StandardTokenMock } from "../contracts/index";

import { GeneralIndexModule__factory } from "@setprotocol/set-protocol-v2/dist/typechain/factories/GeneralIndexModule__factory";
import { SetToken__factory } from "@setprotocol/set-protocol-v2/dist/typechain/factories/SetToken__factory";
// import { StandardTokenMock__factory } from "../../typechain/factories/StandardTokenMock__factory";

export default class DeploySetV2 {
  private _deployerSigner: Signer;

  constructor(deployerSigner: Signer) {
    this._deployerSigner = deployerSigner;
  }

  // public async getTokenMock(token: Address): Promise<StandardTokenMock> {
  //   return await new StandardTokenMock__factory(this._deployerSigner).attach(token);
  // }

  public async getSetToken(setToken: Address): Promise<SetToken> {
    return await new SetToken__factory(this._deployerSigner).attach(setToken);
  }

  public async getGeneralIndexModule(indexModule: Address): Promise<GeneralIndexModule> {
    return await new GeneralIndexModule__factory(this._deployerSigner).attach(indexModule);
  }
}