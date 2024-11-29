// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

import {ERC20} from "solady/tokens/ERC20.sol";

contract TestUSDC is ERC20 {
    function name() public view override returns (string memory) {
        return "Test USDC";
    }

    /// @dev Returns the symbol of the token.
    function symbol() public view override returns (string memory) {
        return "TUSDC";
    }

    function mint(
        address to,
        uint256 value
    ) public virtual {
        _mint(to, value);
    }
}