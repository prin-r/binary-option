pragma solidity 0.5.10;

interface IPayoutRateModel {
    function getRate(uint availableAmount, uint originalAmount) external view returns(uint);
}
