import { BigNumber } from "ethers";
import { ExchangeQuote, Address } from "../../types";
export declare function getKyberDMMQuote(tokenAddress: Address, targetPriceImpact: BigNumber): Promise<ExchangeQuote>;
