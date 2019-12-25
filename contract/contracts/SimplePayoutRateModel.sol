pragma solidity 0.5.10;

import { IPayoutRateModel } from './IPayoutRateModel.sol';
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract SimeplePayoutRateModel is IPayoutRateModel {
  using SafeMath for uint256;

  uint public payoutRate = 1e18;

  function getRate(uint, uint) external view returns(uint) {
    return payoutRate;
  }

  function setRate(uint _newRate) public {
    payoutRate = _newRate;
  }
}
