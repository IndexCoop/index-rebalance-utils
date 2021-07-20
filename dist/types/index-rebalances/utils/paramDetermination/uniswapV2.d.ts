import { BigNumber } from "ethers";
import { ExchangeQuote, Address } from "../../types";
export declare function getUniswapV2Quote(tokenAddress: Address, targetPriceImpact: BigNumber): Promise<ExchangeQuote>;
