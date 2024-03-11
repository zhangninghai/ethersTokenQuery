import { ethers } from "ethers";
import ERC20_ABI from "./abi/ERC20ABI.json" assert { type: "json" };
const provider = new ethers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/your-api-key");

// ERC20 代币合约地址和 ABI
const tokenAddress = '0xc69Ad9baB1dEE23F4605a82b3354F8E40d1E5966';
const tokenAbi = ["event Approval(address indexed owner, address indexed spender, uint256 value)"];
const contract = new ethers.Contract(tokenAddress, tokenAbi, provider);

// 特定地址
const addressA = '0xBC83F2711D0749D7454e4A9D53d8594DF0377c05';

export async function getPastApprovals() {
    const filter = contract.filters.Approval(null, addressA);
    const events = await contract.queryFilter(filter, 19215503, 19330912);//16299522-19103806
    events.forEach( event => {
        //eth余额查询
        console.log(`所有者: ${event.args.owner}, 被授权者: ${event.args.spender}, 数额: ${event.args.value}`);
    });
}
