pragma solidity 0.5.10;

import { IPayoutRateModel } from './IPayoutRateModel.sol';
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract AutoPayoutRateModel is IPayoutRateModel {
  using SafeMath for uint256;

  uint constant DENOMINATOR = 1e18;

  function getRate(uint availableAmount, uint originalAmount) external view returns(uint) {
    return availableAmount.mul(DENOMINATOR).div(originalAmount);
  }
}
