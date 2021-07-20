import { ethers } from "ethers";
import { Provider } from "@ethersproject/providers";
export declare const privateKeys: string[];
export declare function generatedWallets(provider: Provider): ethers.Wallet[];
