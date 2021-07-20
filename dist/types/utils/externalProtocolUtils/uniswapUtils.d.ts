import { BigNumber } from "ethers";
import { UniswapV2Pair, UniswapV2Router02 } from "../contracts/uniswap";
import { StandardTokenMock } from "@utils/contracts/index";
import { WETH9 } from "../../typechain/WETH9";
import { Address } from "../types";
export declare function setUniswapPoolToPrice(uniswapRouter: UniswapV2Router02, uniswapPool: UniswapV2Pair, baseAsset: StandardTokenMock | WETH9, quoteAsset: StandardTokenMock | WETH9, price: BigNumber, to: Address): Promise<void>;
