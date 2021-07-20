import { BigNumber } from "ethers";
import { ExchangeQuote, Address } from "../../types";
import DeployHelper from "../../../utils/deploys";
export declare function getUniswapV3Quote(deployHelper: DeployHelper, token: Address, targetPriceImpact: BigNumber): Promise<ExchangeQuote>;
