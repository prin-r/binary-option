import { BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import {
  Contract,
  OrderPlaced,
  OrderResolved,
  OwnershipTransferred
} from "../generated/Contract/Contract";
import { Order, User, Contract as ContractEntity } from "../generated/schema";

export function handleOrderPlaced(event: OrderPlaced): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let contractEntity = ContractEntity.load(event.address.toHexString());
  if (contractEntity == null) {
    contractEntity = new ContractEntity(event.address.toHexString());
    contractEntity.totalCorrectOrder = 0;
    contractEntity.totalMissOrder = 0;
    contractEntity.totalPending = 0;
    contractEntity.totalTimeupOrder = 0;
  }
  contractEntity.totalPending++;
  let contract = Contract.bind(event.address);
  let available = contract.availableAmount();
  let exposurePct = contract.maximumExposurePercentage();

  contractEntity.payoutRate = BigDecimal.fromString("1000000000000000000")
    .plus(contract.getPayoutRate().toBigDecimal())
    .times(
      BigDecimal.fromString("1000000000000000000").minus(
        contract.orderPremiumPercentage().toBigDecimal()
      )
    )
    .div(BigDecimal.fromString("1000000000000000000"));
  contractEntity.reservedAmount = contract.reservedAmount();
  contractEntity.maxUsageAmount = exposurePct
    .toBigDecimal()
    .times(available.toBigDecimal())
    .div(BigDecimal.fromString("1000000000000000000"));

  contractEntity.save();
  let user = User.load(event.params.owner.toHexString());
  if (user === null) {
    user = new User(event.params.owner.toHexString());
  }
  user.hasOpenOrder = true;
  user.save();

  let order = new Order(event.params.orderId.toString());

  order.owner = user.id;
  order.startTime = event.block.timestamp.toI32();
  order.resolveTime = event.params.resolveTime.toI32();
  order.isCall = event.params.isCall;
  order.strikePrice = event.params.strikePrice;
  order.placed = event.params.placed;
  order.reward = event.params.reward.toBigDecimal().minus(
    event.params.placed
      .toBigDecimal()
      .times(contract.orderPremiumPercentage().toBigDecimal())
      .div(BigDecimal.fromString("1000000000000000000"))
  );
  order.status = "WAITING";
  order.buyTxHash = event.transaction.hash;
  order.buyTimestamp = event.block.timestamp.toI32();

  order.save();
}

export function handleOrderResolved(event: OrderResolved): void {
  let contractEntity = ContractEntity.load(event.address.toHexString());
  if (contractEntity === null) {
    contractEntity = new ContractEntity(event.address.toHexString());
    contractEntity.totalCorrectOrder = 0;
    contractEntity.totalMissOrder = 0;
    contractEntity.totalPending = 0;
    contractEntity.totalTimeupOrder = 0;
  }
  contractEntity.totalPending--;
  switch (event.params.result) {
    case 1:
      contractEntity.totalCorrectOrder++;
      break;
    case 2:
      contractEntity.totalMissOrder++;
      break;
    case 3:
      contractEntity.totalTimeupOrder++;
      break;
    default:
      return;
  }
  let contract = Contract.bind(event.address);
  let available = contract.availableAmount();
  let exposurePct = contract.maximumExposurePercentage();

  contractEntity.payoutRate = BigDecimal.fromString("1000000000000000000")
    .plus(contract.getPayoutRate().toBigDecimal())
    .times(
      BigDecimal.fromString("1000000000000000000").minus(
        contract.orderPremiumPercentage().toBigDecimal()
      )
    )
    .div(BigDecimal.fromString("1000000000000000000"));
  contractEntity.reservedAmount = contract.reservedAmount();
  contractEntity.maxUsageAmount = exposurePct
    .toBigDecimal()
    .times(available.toBigDecimal())
    .div(BigDecimal.fromString("1000000000000000000"));

  contractEntity.save();

  let order = Order.load(event.params.orderId.toString());
  if (order === null) return;
  order.status = "RESOLVED";
  order.result = event.params.result;
  order.settlementPrice = event.params.settlementPrice;
  order.resolveTxHash = event.transaction.hash;
  order.resolveTimestamp = event.block.timestamp.toI32();

  order.save();

  let bettorAddress = contract.orders(event.params.orderId).value0;
  let user = User.load(bettorAddress.toHexString());
  if (user === null) {
    user = new User(bettorAddress.toHexString());
  }
  user.hasOpenOrder = false;
  user.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

// export function handleSetOrderFee(call: _setOrderFeeCall): void {
//   let contractEntity = ContractEntity.load(call.to.toHexString());
//   contractEntity.orderFee = call.inputs._orderFee;
//   contractEntity.save();
// }

// export function handleSetMinDuration(call: _setMinDurationCall): void {
//   let contractEntity = ContractEntity.load(call.to.toHexString());
//   contractEntity.minDuration = call.inputs._minDuration.toI32();
//   contractEntity.save();
// }

// export function handleSetMaxOrderValue(call: _setMaxOrderValueCall): void {
//   let contractEntity = ContractEntity.load(call.to.toHexString());
//   contractEntity.maxOrderValue = call.inputs._maxOrderValue;
//   contractEntity.save();
// }
