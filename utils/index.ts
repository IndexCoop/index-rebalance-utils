import { Blockchain } from "@setprotocol/index-coop-contracts/dist/utils/common";
import { ethers } from "hardhat";

const provider = ethers.provider;
export const getBlockchainUtils = () => new Blockchain(provider);