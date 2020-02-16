const Ballot = artifacts.require("../contracts/Ballot.sol");

module.exports = function(deployer) {
  deployer.deploy(Ballot);
};
