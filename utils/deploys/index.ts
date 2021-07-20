import { Signer } from "ethers";

import DeploySetV2 from "./deploySetV2";
import DeployExternalContracts from "./deployExternal";

export default class DeployHelper {
  public setV2: DeploySetV2;
  public external: DeployExternalContracts;

  constructor(deployerSigner: Signer) {
    this.setV2 = new DeploySetV2(deployerSigner);
    this.external = new DeployExternalContracts(deployerSigner);
  }
}