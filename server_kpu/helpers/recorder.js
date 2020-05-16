const db = require('../helpers/db');

function recordTransaction(receipt) {
  console.log(receipt);
  let filteredReceipt = {};
  if ('blockHash' in receipt) filteredReceipt.blockHash = receipt.blockHash;
  if ('blockNumber' in receipt) filteredReceipt.blockNumber = receipt.blockNumber;
  if ('contractAddress' in receipt) filteredReceipt.contractAddress = receipt.contractAddress;
  if ('cumulativeGasUsed' in receipt) filteredReceipt.cumulativeGasUsed = receipt.cumulativeGasUsed;
  if ('from' in receipt) filteredReceipt.from = receipt.from;
  if ('gasUsed' in receipt) filteredReceipt.gasUsed = receipt.gasUsed;
  if ('logsBloom' in receipt) filteredReceipt.logsBloom = receipt.logsBloom;
  if ('status' in receipt) filteredReceipt.status = receipt.status;
  if ('to' in receipt) filteredReceipt.to = receipt.to;
  if ('transactionHash' in receipt) filteredReceipt.transactionHash = receipt.transactionHash;
  if ('transactionIndex' in receipt) filteredReceipt.transactionIndex = receipt.transactionIndex;
  return db.mySqlQuery(`
    INSERT INTO transactions
    SET ?
  `, filteredReceipt, (error, results, fields) => {
    if (error) console.log(error);
    // TODO :: // FIXME :: // LowPriority
  });
}

module.exports = { recordTransaction };
