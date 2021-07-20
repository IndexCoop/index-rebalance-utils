import { Signer } from "ethers";
import DeploySetV2 from "./deploySetV2";
import DeployExternalContracts from "./deployExternal";
export default class DeployHelper {
    setV2: DeploySetV2;
    external: DeployExternalContracts;
    constructor(deployerSigner: Signer);
}
