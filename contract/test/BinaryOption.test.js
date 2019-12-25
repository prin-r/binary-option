const {
  BN,
  expectRevert,
  time,
  balance
} = require("openzeppelin-test-helpers");

const { expect } = require("chai");

require("chai").should();

const BinaryOption = artifacts.require("BinaryOption");
const SimpleOracle = artifacts.require("SimpleOracle");
const AutoPayoutRateModel = artifacts.require("AutoPayoutRateModel");
const SimeplePayoutRateModel = artifacts.require("SimeplePayoutRateModel");

contract("BinaryOption", ([owner, alice, bob]) => {
  beforeEach(async () => {
    this.oracle = await SimpleOracle.new({ from: owner });
    this.payout = await SimeplePayoutRateModel.new({ from: owner });
    this.contract = await BinaryOption.new(
      "1000000000000000000",
      "1000000000000000000",
      this.payout.address,
      { from: owner }
    );

    await this.contract._setOracle(this.oracle.address);
  });

  context("Test basic functionality", () => {
    beforeEach(async () => {
      await this.contract.deposit({
        from: owner,
        value: web3.utils.toWei("1", "ether")
      });
      await this.payout.setRate("1000000000000000000", { from: owner });
      await this.oracle.setValue("5000000000000000000", { from: owner });
    });
    it("should buy order correctly", async () => {
      const now = await time.latest();
      await this.contract.buy(
        now.add(new BN(100)),
        true,
        web3.utils.hexToBytes("0x"),
        {
          from: alice,
          value: web3.utils.toWei("0.052", "ether")
        }
      );

      const order = await this.contract.orders(1);

      order.owner.should.eq(alice);
      order.resolveTime.toString().should.eq(now.add(new BN(100)).toString());
      order.isCall.should.eq(true);
      order.strikePrice.toString().should.eq("5000000000000000000");
      order.placed.toString().should.eq("50000000000000000");
      order.reward.toString().should.eq("50000000000000000");
      order.status.toString().should.eq("1");
    });

    it("should resolve and get reward if win", async () => {
      const now = await time.latest();
      //   const aliceBalance = await balance.current(alice);
      const contractBalance = await balance.current(this.contract.address);
      await this.contract.buy(
        now.add(new BN(100)),
        true,
        web3.utils.hexToBytes("0x"),
        {
          from: alice,
          value: web3.utils.toWei("0.052", "ether")
        }
      );

      //  Price up
      await this.oracle.setValue("5100000000000000000", { from: owner });

      await time.increase(150);
      await this.contract.resolve(1, web3.utils.hexToBytes("0x"), {
        from: owner
      });

      const order = await this.contract.orders(1);

      order.status.toString().should.eq("2");

      // TODO: Check Alice balance (transaction cost make calculation harder)
      //   (await balance.current(alice))
      //     .toString()
      //     .should.eq(aliceBalance.add(new BN("50000000000000000")).toString());

      (await balance.current(this.contract.address))
        .toString()
        .should.eq(contractBalance.sub(new BN("50000000000000000")).toString());
    });

    it("should resolve and get reward if win", async () => {
      const now = await time.latest();
      //   const aliceBalance = await balance.current(alice);
      const contractBalance = await balance.current(this.contract.address);
      await this.contract.buy(
        now.add(new BN(100)),
        true,
        web3.utils.hexToBytes("0x"),
        {
          from: alice,
          value: web3.utils.toWei("0.052", "ether")
        }
      );

      //  Price down
      await this.oracle.setValue("4900000000000000000", { from: owner });

      await time.increase(150);
      await this.contract.resolve(1, web3.utils.hexToBytes("0x"), {
        from: owner
      });

      const order = await this.contract.orders(1);

      order.status.toString().should.eq("2");

      // TODO: Check Alice balance (transaction cost make calculation harder)
      //   (await balance.current(alice))
      //     .toString()
      //     .should.eq(aliceBalance.add(new BN("50000000000000000")).toString());

      (await balance.current(this.contract.address))
        .toString()
        .should.eq(contractBalance.add(new BN("50000000000000000")).toString());
    });

    it("should can resolve after resolve period and cancel order", async () => {
      const now = await time.latest();
      //   const aliceBalance = await balance.current(alice);
      const contractBalance = await balance.current(this.contract.address);
      await this.contract.buy(
        now.add(new BN(100)),
        true,
        web3.utils.hexToBytes("0x"),
        {
          from: alice,
          value: web3.utils.toWei("0.052", "ether")
        }
      );

      //  Price down
      await this.oracle.setValue("4900000000000000000", { from: owner });

      await time.increase(500);
      await this.contract.resolve(1, web3.utils.hexToBytes("0x"), {
        from: owner
      });

      const order = await this.contract.orders(1);

      order.status.toString().should.eq("2");

      // TODO: Check Alice balance (transaction cost make calculation harder)
      //   (await balance.current(alice))
      //     .toString()
      //     .should.eq(aliceBalance.add(new BN("50000000000000000")).toString());

      (await balance.current(this.contract.address))
        .toString()
        .should.eq(
          contractBalance
            .add(new BN(web3.utils.toWei("0.001", "ether")))
            .toString()
        );
    });
  });

  context("Test max exposure", () => {
    beforeEach(async () => {
      await this.contract.deposit({
        from: owner,
        value: web3.utils.toWei("1", "ether")
      });
      await this.payout.setRate("1000000000000000000", { from: owner });
      await this.oracle.setValue("5000000000000000000", { from: owner });
    });

    context("Max exposure 100% (no caps)", () => {
      beforeEach(async () => {
        await this.contract._setMaximumExposurePercentage(
          "1000000000000000000",
          {
            from: owner
          }
        );
      });

      it("should can buy order if reward not more than deposit", async () => {
        const now = await time.latest();
        const contractBalance = await balance.current(this.contract.address);
        await this.contract.buy(
          now.add(new BN(100)),
          true,
          web3.utils.hexToBytes("0x"),
          {
            from: alice,
            value: web3.utils.toWei("1.002", "ether")
          }
        );

        (await this.contract.reservedAmount())
          .toString()
          .should.eq("1000000000000000000");

        (await balance.current(this.contract.address))
          .toString()
          .should.eq(
            contractBalance.add(new BN("1001000000000000000")).toString()
          );
      });

      it("should revert if buy more than deposit", async () => {
        const now = await time.latest();
        await expectRevert(
          this.contract.buy(
            now.add(new BN(100)),
            true,
            web3.utils.hexToBytes("0x"),
            {
              from: alice,
              value: web3.utils.toWei("1.102", "ether")
            }
          ),
          "INSUFFICIENT_AVAILABLE_BALANCE"
        );

        (await this.contract.reservedAmount()).toString().should.eq("0");
      });

      it("should revert if buy more than deposit", async () => {
        const now = await time.latest();
        await this.contract.buy(
          now.add(new BN(100)),
          true,
          web3.utils.hexToBytes("0x"),
          {
            from: alice,
            value: web3.utils.toWei("0.752", "ether")
          }
        );
        await time.increase(50);

        await expectRevert(
          this.contract.buy(
            now.add(new BN(150)),
            true,
            web3.utils.hexToBytes("0x"),
            {
              from: bob,
              value: web3.utils.toWei("0.302", "ether")
            }
          ),
          "INSUFFICIENT_AVAILABLE_BALANCE"
        );

        (await this.contract.reservedAmount())
          .toString()
          .should.eq("750000000000000000");
      });
    });

    context("Max exposure equal 40%", () => {
      beforeEach(async () => {
        await this.contract._setMaximumExposurePercentage(
          "400000000000000000",
          {
            from: owner
          }
        );
      });

      it("should can buy order if reward not more than left over deposit", async () => {
        const now = await time.latest();
        const contractBalance = await balance.current(this.contract.address);
        await this.contract.buy(
          now.add(new BN(100)),
          true,
          web3.utils.hexToBytes("0x"),
          {
            from: alice,
            value: web3.utils.toWei("0.402", "ether")
          }
        );

        (await this.contract.reservedAmount())
          .toString()
          .should.eq("400000000000000000");

        (await balance.current(this.contract.address))
          .toString()
          .should.eq(
            contractBalance.add(new BN("401000000000000000")).toString()
          );
      });

      it("should revert if buy more than deposit", async () => {
        const now = await time.latest();
        await expectRevert(
          this.contract.buy(
            now.add(new BN(100)),
            true,
            web3.utils.hexToBytes("0x"),
            {
              from: alice,
              value: web3.utils.toWei("0.502", "ether")
            }
          ),
          "INSUFFICIENT_AVAILABLE_BALANCE"
        );

        (await this.contract.reservedAmount()).toString().should.eq("0");
      });

      it("should revert if buy more than left over deposit", async () => {
        const now = await time.latest();
        await this.contract.buy(
          now.add(new BN(100)),
          true,
          web3.utils.hexToBytes("0x"),
          {
            from: alice,
            value: web3.utils.toWei("0.352", "ether")
          }
        );
        await time.increase(50);

        await expectRevert(
          this.contract.buy(
            now.add(new BN(150)),
            true,
            web3.utils.hexToBytes("0x"),
            {
              from: bob,
              value: web3.utils.toWei("0.102", "ether")
            }
          ),
          "INSUFFICIENT_AVAILABLE_BALANCE"
        );

        (await this.contract.reservedAmount())
          .toString()
          .should.eq("350000000000000000");
      });

      it("should can buy aften other one resolved", async () => {
        const now = await time.latest();
        await this.contract.buy(
          now.add(new BN(100)),
          true,
          web3.utils.hexToBytes("0x"),
          {
            from: alice,
            value: web3.utils.toWei("0.352", "ether")
          }
        );
        await time.increase(150);
        await this.oracle.setValue("4900000000000000000", { from: owner });
        await this.contract.resolve(1, web3.utils.hexToBytes("0x"), {
          from: owner
        });

        // Check reservedAmount and avilableAmount
        (await this.contract.reservedAmount()).toString().should.eq("0");
        (await this.contract.availableAmount())
          .toString()
          .should.eq("1350000000000000000");

        await this.contract.buy(
          now.add(new BN(250)),
          true,
          web3.utils.hexToBytes("0x"),
          {
            from: bob,
            value: web3.utils.toWei("0.102", "ether")
          }
        );

        (await this.contract.reservedAmount())
          .toString()
          .should.eq("100000000000000000");
      });
    });
  });

  context("Test auto payout rate", () => {
    beforeEach(async () => {
      this.payout = await AutoPayoutRateModel.new({ from: owner });
      await this.contract._setPayoutRateModel(this.payout.address, {
        from: owner
      });
      await this.contract._setOrderFeePercentage("50000000000000000", {
        from: owner
      });
      await this.contract.deposit({
        from: owner,
        value: web3.utils.toWei("1", "ether")
      });
      await this.oracle.setValue("5000000000000000000", { from: owner });
    });

    it("should get less rate if before one win", async () => {
      const now = await time.latest();
      await this.contract.buy(
        now.add(new BN(100)),
        true,
        web3.utils.hexToBytes("0x"),
        {
          from: alice,
          value: web3.utils.toWei("0.052", "ether")
        }
      );

      //  Price up
      await this.oracle.setValue("5100000000000000000", { from: owner });

      await time.increase(150);
      await this.contract.resolve(1, web3.utils.hexToBytes("0x"), {
        from: owner
      });

      (await this.contract.winningValue())
        .toString()
        .should.eq("1050000000000000000");
      (await this.contract.losingValue())
        .toString()
        .should.eq("1000000000000000000");

      await time.increase(500);

      await this.contract.buy(
        (await time.latest()).add(new BN(100)),
        true,
        web3.utils.hexToBytes("0x"),
        {
          from: bob,
          value: web3.utils.toWei("0.062", "ether")
        }
      );

      const bobOrder = await this.contract.orders(2);
      bobOrder.placed.toString().should.eq("60000000000000000");
      bobOrder.reward.toString().should.eq("51285714285714285");
    });

    it("should get more rate if before one loss", async () => {
      const now = await time.latest();
      await this.contract.buy(
        now.add(new BN(100)),
        true,
        web3.utils.hexToBytes("0x"),
        {
          from: alice,
          value: web3.utils.toWei("0.052", "ether")
        }
      );

      //  Price down
      await this.oracle.setValue("4900000000000000000", { from: owner });
      const aliceOrder = await this.contract.orders(1);
      aliceOrder.placed.toString().should.eq("50000000000000000");
      aliceOrder.reward.toString().should.eq("45000000000000000");
      await time.increase(150);
      await this.contract.resolve(1, web3.utils.hexToBytes("0x"), {
        from: owner
      });

      (await this.contract.winningValue())
        .toString()
        .should.eq("1000000000000000000");
      (await this.contract.losingValue())
        .toString()
        .should.eq("1050000000000000000");

      await time.increase(500);

      await this.contract.buy(
        (await time.latest()).add(new BN(100)),
        true,
        web3.utils.hexToBytes("0x"),
        {
          from: bob,
          value: web3.utils.toWei("0.052", "ether")
        }
      );

      const bobOrder = await this.contract.orders(2);
      bobOrder.placed.toString().should.eq("50000000000000000");
      bobOrder.reward.toString().should.eq("47375000000000000");
    });
  });
});
