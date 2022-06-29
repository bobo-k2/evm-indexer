import { Deposit } from "../types";
import { FrontierEvmCall, FrontierEvmEvent } from "@subql/frontier-evm-processor";

// type CallArgs = [BigNumber] & { value: BigNumber; };

export async function handleEvmEvent(event: FrontierEvmEvent): Promise<void> {
    logger.info(`event: ${event.address}, ${event.args}, ${event.data} ${event.topics}`);
}

export async function handleFrontierEvmCall(call: FrontierEvmCall): Promise<void> { 
    logger.info(`call: ${call.from} ${call.success} ${call.value}`);
    
    let record = new Deposit(call.hash);
    record.block = call.blockNumber;
    record.sender = call.from;
    record.success = call.success;
    record.value = BigInt(call.value.toString());
    record.timestamp = call.timestamp;

    await record.save();
}
