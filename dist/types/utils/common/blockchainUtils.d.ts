import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
export declare class Blockchain {
    _provider: Web3Provider | JsonRpcProvider;
    private _snapshotId;
    constructor(_provider: Web3Provider | JsonRpcProvider);
    saveSnapshotAsync(): Promise<string>;
    revertAsync(): Promise<void>;
    revertByIdAsync(id: string): Promise<void>;
    resetAsync(): Promise<void>;
    increaseTimeAsync(duration: number): Promise<any>;
    getCurrentTimestamp(): Promise<any>;
    setNextBlockTimestamp(timestamp: number): Promise<any>;
    waitBlocksAsync(count: number): Promise<void>;
    private sendJSONRpcRequestAsync;
}
