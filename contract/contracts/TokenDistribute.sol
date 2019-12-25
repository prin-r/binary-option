pragma solidity 0.5.10;

import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";

interface SnapshotToken {
    function historicalVotingPowerAtNonce(address owner, uint nonce) external view returns (uint256);
}

interface IERC20 {
    function transfer(address recipient, uint amount) external returns (bool);
}

contract TokenDistribute is Ownable {
  uint public selectedNonce;

  SnapshotToken public baseToken;
  IERC20 public distributedToken;

  mapping(address => bool) public claimed;

  constructor(address _baseToken, uint _selectedNonce, address _distributedToken) public {
    selectedNonce = _selectedNonce;
    baseToken = SnapshotToken(_baseToken);
    distributedToken = IERC20(_distributedToken);
  }

  function claim() public {
    require(!claimed[msg.sender], "ALREADY_CLAIMED");
    claimed[msg.sender] = true;

    uint tokenAtSnapshot = baseToken.historicalVotingPowerAtNonce(msg.sender, selectedNonce);
    distributedToken.transfer(msg.sender, tokenAtSnapshot / 10);
  }

  function withdraw(uint amount) external onlyOwner {
    distributedToken.transfer(msg.sender, amount);
  }
}
