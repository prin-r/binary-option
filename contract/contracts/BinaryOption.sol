pragma solidity 0.5.10;

import { Oracle, usingBandProtocol } from "band-solidity/contracts/Band.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import { Pausable } from "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import { IPayoutRateModel } from "./IPayoutRateModel.sol";


contract BinaryOption is usingBandProtocol, Ownable, Pausable {
  using SafeMath for uint;

  enum Status { INVALID, OPENED, RESOLVED }
  enum ResolveResult { INVALID, CORRECT, INCORRECT, TIME_UP }

  struct Order {
    address payable owner;
    bool isCall;
    Status status;
    uint64 resolveTime;
    uint strikePrice;
    uint placed;
    uint reward;
  }

  mapping (uint => Order) public orders;
  uint public orderCount = 0;
  string constant QUERY_KEY = "BTC-USDT";

  // Fee percentage for operating
  uint public orderPremiumPercentage = 0.05 * 1e18;
  // Maximum exposure percentage protect contract from attacking
  uint public maximumExposurePercentage = 0.20 * 1e18;
  uint public originalAmount = 0;
  uint public availableAmount = 0;
  uint public reservedAmount = 0;
  // Minimum predict duration
  uint public minOptionDuration = 90 seconds;
  // Allowed old data duration
  uint public dataDelayTolerance = 2 minutes;
  // Allowed delay resolve
  uint public resolveDeadline = 2 minutes;
  Oracle public oracle;
  IPayoutRateModel public payoutRateModel;

  event OrderPlaced(
    uint orderId,
    address indexed owner,
    uint64 resolveTime,
    bool isCall,
    uint strikePrice,
    uint placed,
    uint reward
  );

  event OrderResolved(
    uint orderId,
    ResolveResult result,
    uint settlementPrice
  );

  constructor(
    uint _minOptionDuration,
    uint _dataDelayTolerance,
    uint _resolveDeadline,
    IPayoutRateModel _payoutRateModel,
    Oracle _oracle
  ) public {
    minOptionDuration = _minOptionDuration;
    dataDelayTolerance = _dataDelayTolerance;
    resolveDeadline = _resolveDeadline;
    payoutRateModel = _payoutRateModel;
    oracle = _oracle;
  }

  function deposit(uint availableContribution) external payable {
    require(availableContribution <= msg.value, "AVAILABLE_CONTRIBUTION_TOO_HIGH");
    availableAmount = availableAmount.add(availableContribution);
    originalAmount = originalAmount.add(msg.value);
  }

  function buy(uint64 resolveTime, bool isCall, bytes calldata data) external payable whenNotPaused {
    uint64 currentTime = uint64(now);
    require(
      resolveTime >= currentTime && resolveTime - currentTime >= minOptionDuration,
      "TOO_LONG_BETWEEN_TX_GEN_AND_BLOCK_CONFIRM"
    );
    uint queryFee = queryFee();
    require(msg.value >= queryFee, "ETH_INSUFFICIENT_FOR_QUERY_FEE");
    uint afterFee = msg.value.sub(queryFee);
    uint premium = afterFee.mul(orderPremiumPercentage).div(1e18);
    availableAmount = availableAmount.add(premium);
    originalAmount = originalAmount.add(premium);
    uint placed = afterFee.sub(premium);

    uint currentPrice = reportAndQuery(data);
    orderCount = orderCount + 1;
    uint reward = placed.mul(getPayoutRate()).div(1e18);
    orders[orderCount] = Order({
      owner: msg.sender,
      resolveTime: resolveTime,
      isCall: isCall,
      strikePrice: currentPrice,
      placed: placed,
      reward: reward,
      status: Status.OPENED
    });

    // Post check exposure
    reservedAmount = reservedAmount.add(reward);
    require(_checkExposure(), "INSUFFICIENT_AVAILABLE_BALANCE");
    emit OrderPlaced(orderCount, msg.sender, resolveTime, isCall, currentPrice, afterFee, reward);
  }

  function resolve(uint orderId, bytes calldata data) external {
    Order storage order = orders[orderId];
    require(order.status == Status.OPENED, "INVALID_ORDER_STATUS");
    require(order.resolveTime <= uint64(now), "TOO_EARLY_TO_RESOLVE");
    ResolveResult result;
    uint currentPrice;
    if (now > uint256(order.resolveTime).add(minOptionDuration)) {
      // Transfer placed token back to owner
      currentPrice = 0;
      order.owner.transfer(order.placed);
      result = ResolveResult.TIME_UP;
      uint queryFee = oracle.queryPrice();
      availableAmount = availableAmount.add(queryFee);
      originalAmount = originalAmount.add(queryFee);
    } else {
      bool isCorrect = false;
      // Get Price here
      currentPrice = reportAndQuery(data);
      if (order.isCall) {
        isCorrect = currentPrice > order.strikePrice;
      } else {
        isCorrect = currentPrice < order.strikePrice;
      }
      if (isCorrect) {
        order.owner.transfer(order.placed.add(order.reward));
        availableAmount = availableAmount.sub(order.reward);
        result = ResolveResult.CORRECT;
      } else {
        availableAmount = availableAmount.add(order.placed);
        result = ResolveResult.INCORRECT;
      }
    }
    reservedAmount = reservedAmount.sub(order.reward);
    order.status = Status.RESOLVED;

    emit OrderResolved(orderId, result, currentPrice);
  }

  function reportAndQuery(bytes memory data) internal returns (uint256) {
    address(oracle).call(data);
    return oracle.querySpotPriceWithExpiry(QUERY_KEY, dataDelayTolerance);
  }

  function getPayoutRate() public view returns (uint) {
    return payoutRateModel.getRate(availableAmount, originalAmount);
  }

  function queryFee() public view returns (uint) {
    return oracle.queryPrice().mul(2);
  }

  function _checkExposure() internal view returns (bool) {
    return reservedAmount.mul(1e18).div(availableAmount) <= maximumExposurePercentage;
  }

  // Admin functions
  function withdraw(uint value) external onlyOwner {
    msg.sender.transfer(value);
    uint newAvailable = availableAmount.sub(value);
    originalAmount = originalAmount.mul(newAvailable).div(availableAmount);
    availableAmount = newAvailable;
  }

  function _withdrawEmergency() external onlyOwner {
    msg.sender.transfer(address(this).balance);
  }

  function _setOrderPremiumPercentage(uint _orderPremiumPercentage) external onlyOwner {
    orderPremiumPercentage = _orderPremiumPercentage;
  }

  function _setPayoutRateModel(address _payoutRateModel) external onlyOwner {
    payoutRateModel = IPayoutRateModel(_payoutRateModel);
  }

  function _setMaximumExposurePercentage(uint _maximumExposurePercentage) external onlyOwner {
    maximumExposurePercentage = _maximumExposurePercentage;
  }

  function _setdataDelayTolerance(uint _dataDelayTolerance) external onlyOwner {
    dataDelayTolerance = _dataDelayTolerance;
  }

  function _setminOptionDuration(uint _minOptionDuration) external onlyOwner {
    minOptionDuration = _minOptionDuration;
  }

  function _setResolveDeadline(uint _resolveDeadline) external onlyOwner {
    resolveDeadline = _resolveDeadline;
  }

  function _setOracle(address _oracle) external onlyOwner {
    oracle = Oracle(_oracle);
  }
}
