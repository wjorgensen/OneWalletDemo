// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

import {TestUSDC} from "../src/testUSDC.sol";
import {Script} from "contracts/lib/forge-std/src/Script.sol";

contract DeployTUSD is Script {
    TestUSDC public tusdc;
    function run() public {
        vm.startBroadcast();
        tusdc = new TestUSDC();
        vm.stopBroadcast();
    }
}