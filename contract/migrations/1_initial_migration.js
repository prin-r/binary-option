const Migrations = artifacts.require("Migrations");
const AutoPayoutRateModel = artifacts.require("AutoPayoutRateModel");
const BinaryOption = artifacts.require("BinaryOption");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(AutoPayoutRateModel).then(async model => {
    await deployer.deploy(
      BinaryOption,
      90,
      120,
      120,
      model.address,
      "0x0476511c1C447742856a909eC6Ae8f0cd9cD939f"
    );
  });
};
