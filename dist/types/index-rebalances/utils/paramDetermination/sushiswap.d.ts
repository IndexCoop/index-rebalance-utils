import { BigNumber } from "ethers";
import { ExchangeQuote, Address } from "../../types";
import DeployHelper from "../../../utils/deploys";
export declare function getSushiswapQuote(deployHelper: DeployHelper, tokenAddress: Address, targetPriceImpact: BigNumber): Promise<ExchangeQuote>;
