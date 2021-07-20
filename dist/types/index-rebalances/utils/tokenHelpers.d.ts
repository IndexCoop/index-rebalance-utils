import { BigNumber } from "ethers";
import { Address } from "../../utils/types";
import DeployHelper from "../../utils/deploys";
export declare function getTokenDecimals(deployHelper: DeployHelper, component: Address): Promise<BigNumber>;
