import { Signer } from "ethers";
import { Address } from "../types";
import { GeneralIndexModule, SetToken } from "../contracts/setV2";
import { StandardTokenMock } from "../contracts/index";
export default class DeploySetV2 {
    private _deployerSigner;
    constructor(deployerSigner: Signer);
    getTokenMock(token: Address): Promise<StandardTokenMock>;
    getSetToken(setToken: Address): Promise<SetToken>;
    getGeneralIndexModule(indexModule: Address): Promise<GeneralIndexModule>;
}
