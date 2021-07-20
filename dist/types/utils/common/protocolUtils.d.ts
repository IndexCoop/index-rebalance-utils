import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
export declare class ProtocolUtils {
    _provider: Web3Provider | JsonRpcProvider;
    constructor(_provider: Web3Provider | JsonRpcProvider);
    getCreatedSetTokenAddress(txnHash: string | undefined): Promise<string>;
}
