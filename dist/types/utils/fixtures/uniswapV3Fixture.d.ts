import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { BigNumber, BigNumberish } from "ethers";
import { Account, Address } from "../types";
import { UniswapV3Factory, SwapRouter, NonfungiblePositionManager, UniswapV3Pool, Quoter, NFTDescriptor } from "../contracts/uniswapV3";
import { StandardTokenMock } from "../../typechain/StandardTokenMock";
import { WETH9 } from "../../typechain/WETH9";
declare type Token = StandardTokenMock | WETH9;
export declare class UniswapV3Fixture {
    private _deployer;
    private _ownerSigner;
    factory: UniswapV3Factory;
    swapRouter: SwapRouter;
    nftPositionManager: NonfungiblePositionManager;
    nftDescriptor: NFTDescriptor;
    quoter: Quoter;
    wethDaiPool: UniswapV3Pool;
    wethWbtcPool: UniswapV3Pool;
    /**
     * Instantiates a new UniswapV3Fixture
     *
     * @param provider      the ethers web3 provider to use
     * @param ownerAddress  the address of the owner
     */
    constructor(provider: Web3Provider | JsonRpcProvider, ownerAddress: Address);
    /**
     * Deploys contracts and creates weth-dai and weth-wbtc pools
     *
     * @param _owner  the owner of the deployed Uniswap V3 system
     * @param _weth   weth address
     * @param _wbtc   wbtc address
     * @param _dai    dai address
     */
    initialize(_owner: Account, _weth: Token, _wethPrice: number, _wbtc: Token, _wbtcPrice: number, _dai: Token): Promise<void>;
    /**
     * Creates and initializes a new pool
     *
     * @param _token0         address of the first token
     * @param _token1         address of the second token
     * @param _fee            fee tier of either 500, 3000, or 10000
     * @param _ratio          the initial price ratio of the pool equal to priceToken0 / priceToken1
     * @returns               a new Uniswap V3 pool
     */
    createNewPair(_token0: Token, _token1: Token, _fee: BigNumberish, _ratio: number): Promise<UniswapV3Pool>;
    /**
     * Adds liquidity across the widest range, emulating a single Uniswap V2 LP
     *
     * @param _token0     address of token 1
     * @param _token1     address of token 2
     * @param _fee        the fee tier of either 500, 3000, or 10000
     * @param _amount0    maximum amount of token 1 used
     * @param _amount1    maximum amount of token 2 used
     * @param _recipient  the recipient of the LP NFT
     */
    addLiquidityWide(_token0: Token, _token1: Token, _fee: number, _amount0: BigNumber, _amount1: BigNumber, _recipient: Address): Promise<void>;
    /**
     * Fetches a UniswapV3Pool
     *
     * @param _token0   first token
     * @param _token1   second token
     * @param _fee      fee tier of either 500, 3000, or 10000
     * @returns         the UniswapV3Pool
     */
    getPool(_token0: Token, _token1: Token, _fee: BigNumberish): Promise<UniswapV3Pool>;
    /**
     * Gets the proper order of the tokens since Uniswap requires that
     * tokens be passed to it in a particular order for many of its functions
     *
     * @param _token0   first token
     * @param _token1   second token
     * @returns         [ first, second ]
     */
    getTokenOrder(_token0: Token, _token1: Token): [Token, Token];
    _getSqrtPriceX96(_ratio: number): BigNumber;
}
export {};
