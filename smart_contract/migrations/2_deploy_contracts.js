const Transactions = artifacts.require("Transactions");

module.exports = function (deployer) {
  deployer
    .deploy(Transactions)
    .then(() => {
      console.log("Transactions contract deployed successfully!");
    })
    .catch((error) => {
      console.error("Deployment failed:", error);
    });
};
