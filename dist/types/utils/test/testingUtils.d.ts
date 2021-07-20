/// <reference types="mocha" />
import { BigNumber } from "@ethersproject/bignumber";
import { JsonRpcProvider } from "@ethersproject/providers";
export declare const getProvider: () => JsonRpcProvider;
export declare const getWaffleExpect: () => Chai.ExpectStatic;
export declare const addSnapshotBeforeRestoreAfterEach: () => void;
export declare function cacheBeforeEach(initializer: Mocha.AsyncFunc): void;
export declare function getTransactionTimestamp(asyncTxn: any): Promise<BigNumber>;
export declare function getLastBlockTimestamp(): Promise<BigNumber>;
export declare function mineBlockAsync(): Promise<any>;
export declare function increaseTimeAsync(duration: BigNumber): Promise<any>;
