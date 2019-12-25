const { BN, expectRevert } = require("openzeppelin-test-helpers");

const { expect } = require("chai");

const AutoPayoutRateModel = artifacts.require("AutoPayoutRateModel");

contract("AutoPayoutRateModel", ([alice, bob]) => {
  beforeEach(async () => {
    this.contract = await AutoPayoutRateModel.new({ from: alice });
  });

  it("should get correct rate without fee", async () => {
    expect(
      await this.contract.getRate(
        "1000000000000000000",
        "1000000000000000000",
        "0"
      )
    ).to.be.bignumber.equal(new BN("1000000000000000000"));

    expect(
      await this.contract.getRate(
        "1000000000000000000",
        "1500000000000000000",
        "0"
      )
    ).to.be.bignumber.equal(new BN("1500000000000000000"));

    expect(
      await this.contract.getRate(
        "1500000000000000000",
        "1000000000000000000",
        "0"
      )
    ).to.be.bignumber.equal(new BN("666666666666666666"));
  });

  it("should revert if winningValue equal 0", async () => {
    await expectRevert(
      this.contract.getRate("0", "1000000000000000000", "0"),
      "SafeMath: division by zero"
    );
  });

  it("should get correct rate with fee", async () => {
    expect(
      await this.contract.getRate(
        "1000000000000000000",
        "1000000000000000000",
        "50000000000000000"
      )
    ).to.be.bignumber.equal(new BN("900000000000000000"));

    expect(
      await this.contract.getRate(
        "1000000000000000000",
        "1500000000000000000",
        "50000000000000000"
      )
    ).to.be.bignumber.equal(new BN("1375000000000000000"));

    expect(
      await this.contract.getRate(
        "1500000000000000000",
        "1000000000000000000",
        "50000000000000000"
      )
    ).to.be.bignumber.equal(new BN("583333333333333333"));
  });
});
