import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { Address, Account } from "../types";
import { Uni, UniswapV2Factory, UniswapV2Pair, UniswapV2Router02 } from "../contracts/uniswap";
import { UniswapV2ExchangeAdapter } from "../contracts/setV2";
export declare class UniswapFixture {
    private _deployer;
    private _provider;
    private _ownerSigner;
    owner: Account;
    uni: Uni;
    factory: UniswapV2Factory;
    pair: UniswapV2Pair;
    router: UniswapV2Router02;
    wethUsdcPool: UniswapV2Pair;
    wethWbtcPool: UniswapV2Pair;
    wbtcUsdcPool: UniswapV2Pair;
    uniswapTradeAdapter: UniswapV2ExchangeAdapter;
    uniWethPool: UniswapV2Pair;
    weth: Address;
    constructor(provider: Web3Provider | JsonRpcProvider, ownerAddress: Address);
    initialize(_owner: Account, _weth: Address, _wbtc: Address, _usdc: Address, minimumInit?: boolean): Promise<void>;
    createNewPair(_tokenOne: Address, _tokenTwo: Address): Promise<UniswapV2Pair>;
    getTokenOrder(_tokenOne: Address, _tokenTwo: Address): [Address, Address];
}
