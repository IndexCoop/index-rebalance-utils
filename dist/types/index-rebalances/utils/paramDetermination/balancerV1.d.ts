import { BigNumber } from "ethers";
import { ExchangeQuote, Address } from "../../types";
import { BaseProvider } from "@ethersproject/providers";
export declare function getBalancerV1Quote(provider: BaseProvider, tokenAddress: Address, targetPriceImpact: BigNumber): Promise<ExchangeQuote>;
