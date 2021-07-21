import { Signer } from "ethers";
import { Address } from "../types";
export default class DeploySetV2 {
    private _deployerSigner;
    constructor(deployerSigner: Signer);
    getTokenMock(token: Address): Promise<any>;
    getSetToken(setToken: Address): Promise<any>;
    getGeneralIndexModule(indexModule: Address): Promise<any>;
}
