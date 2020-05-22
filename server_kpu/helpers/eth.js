// @ts-nocheck
const fs = require("fs");
const find = require('find');
const execFile = require('child_process').execFile;

const Web3 = require('web3');
const Miner = require('web3-eth-miner').Miner;

const db = require('./db');

var env = null;
try {
  env = require(`${__dirname}/../environments/secretKeyProd.json`);
} catch (error) {
  env = JSON.parse(process.env.secretKeyProduction);
}

const nodeDirectory = `${__dirname}/../../node_kpu`;
const truffleDir = `${__dirname}/../../contract/build/contracts`;

const truffleCompiled = JSON.parse(fs.readFileSync(`${truffleDir}/Ballot.json`));
const defaultAccount = fs.readFileSync(`${nodeDirectory}/pub.key`).toString().toLowerCase();
const defaultPassword = fs.readFileSync(`${nodeDirectory}/pass.key`).toString();

const gethIP = env.indihomeIp;
const gethNetworkPortRpcWs = [9999, 9001, 9002, 9003];

const defaultHttp = `http://${gethIP}:${gethNetworkPortRpcWs[2]}`;
const defaultWs = `ws://${gethIP}:${gethNetworkPortRpcWs[3]}`;

var web3 = null;
var miner = null;

var ballotInstance = null;
var ballotContract = null;
var ballotContractAddress = null;

const defaultOptions = {};

/** Utilities */

function toHex(number) {
  return web3.utils.toHex(number);
}

function fromWei(number, unit = 'ether') {
  return web3.utils.fromWei(number, unit);
}

function getContractAddress() {
  return ballotContractAddress;
}

async function makeBatchRequest(calls, callParameter) {
  let batch = new web3.BatchRequest();
  let promises = calls.map(call => {
    return new Promise((res, rej) => {
      let req = call.request(callParameter, (err, data) => {
        if(err) rej(err);
        else res(data);
      });
      batch.add(req);
    });
  });
  batch.execute();
  return await Promise.all(promises);
}

/** Procedural */

function gethInitWeb3() {
  web3InitProvider();
  web3InitMiner();
}

function web3InitProvider(rpcHttp = defaultHttp) {
  web3 = new Web3(Web3.givenProvider || rpcHttp, null, defaultOptions);
  console.log('[ETH-INIT_PROVIDER] \x1b[95m%s\x1b[0m', Web3.givenProvider || rpcHttp);
}

function web3InitMiner(rpcHttp = defaultHttp) {
  miner = new Miner(Web3.givenProvider || rpcHttp, null, defaultOptions);
  console.log('[ETH-INIT_MINER] \x1b[95m%s\x1b[0m', Web3.givenProvider || rpcHttp);
}

function web3SetAccount(ethAccountAddress = defaultAccount) {
  web3.eth.defaultAccount = ethAccountAddress;
  console.log('[ETH-SET_ACCOUNT] \x1b[95m%s\x1b[0m', web3.eth.defaultAccount);
}

function web3ChangeProvider(webSocket = defaultWs) {
  web3.setProvider(webSocket);
  console.log('[ETH-CHANGE_PROVIDER] \x1b[95m%s\x1b[0m', webSocket);
}

function web3NewContractInstance(abi, contractAddress, version = 0) {
  ballotInstance = new web3.eth.Contract(abi, contractAddress);
  ballotContractAddress = contractAddress;
  console.log('[ETH-CONTRACT_INSTANCE] \x1b[95m%s\x1b[0m - v%s', contractAddress, version);
}

/** Promises */

function web3UnlockAccount(password, accountAddress = defaultAccount, callback) {
  return web3.eth.personal.unlockAccount(
    accountAddress,
    password,
    9223372036 // Unlock Time Forever
  ).then(() => {
    console.log('[ETH-UNLOCK_ACCOUNT] \x1b[95m%s\x1b[0m', accountAddress);
    web3SetAccount(accountAddress);
    callback(null);
  }).catch((error) => {
    console.log('[ETH-UNLOCK_ACCOUNT] \x1b[91m%s\x1b[0m', JSON.stringify(error));
    callback({
      message: 'Wrong Passphrase For Unlocking Account'
    });
  });
}

function web3LockAccount(accountAddress) {
  web3.eth.personal.lockAccount(accountAddress).then(() => {
    console.log('[ETH-LOCK_ACCOUNT] \x1b[95m%s\x1b[0m', accountAddress);
    web3SetAccount();
  }).catch((error) => {
    console.log('[ETH-LOCK_ACCOUNT] \x1b[91m%s\x1b[0m', JSON.stringify(error));
  });
}

function web3MiningStart() {
  web3SetAccount();
  miner.startMining().then((status) => {
    console.log('[ETH-MINER_START] \x1b[95m%s\x1b[0m', status);
  }).catch((error) => {
    console.log('[ETH-MINER_START] \x1b[91m%s\x1b[0m', JSON.stringify(error));
  });
}

function web3MiningStop() {
  web3SetAccount();
  miner.stopMining().then((status) => {
    console.log('[ETH-MINER_STOP] \x1b[95m%s\x1b[0m', status);
    web3LockAccount(defaultAccount);
  }).catch((error) => {
    console.log('[ETH-MINER_STOP] \x1b[91m%s\x1b[0m', JSON.stringify(error));
  });
}

/** Utilities */

function web3GetEstimatedGasPriceTransaction(transactionObject, callback) {
  web3.eth.estimateGas(transactionObject).then((estimatedGas) => {
    console.log('[ETH-GAS_PRICE_TRANSACTION] \x1b[95m%s\x1b[0m', estimatedGas);
    callback(estimatedGas);
  }).catch((error) => {
    console.log('[ETH-GAS_PRICE_TRANSACTION] \x1b[91m%s\x1b[0m', JSON.stringify(error));
  });
}

function web3GetGasPriceNetwork(callback) {
  web3.eth.getGasPrice().then((networkGas) => {
    console.log('[ETH-GAS_PRICE_NETWORK] \x1b[95m%s\x1b[0m', networkGas);
    callback(networkGas);
  }).catch((error) => {
    console.log('[ETH-GAS_PRICE_NETWORK] \x1b[91m%s\x1b[0m', JSON.stringify(error));
  });
}

function web3GetEstimatedGasPriceDeployContract(abi, bytecode, callback) {
  const myContract = new web3.eth.Contract(abi);
  myContract.deploy({
    data: bytecode,
    arguments: []
  }).estimateGas().then((estimatedGas) => {
    console.log('[ETH-GAS_PRICE_DEPLOY_CONTRACT] \x1b[95m%s\x1b[0m', estimatedGas);
    callback(estimatedGas);
  }).catch((error) => {
    console.log('[ETH-GAS_PRICE_DEPLOY_CONTRACT] \x1b[91m%s\x1b[0m', JSON.stringify(error));
  });
}

function web3GetEstimatedGasPriceMethodContract(functionName, myContractFunction, accountExecutor, callback) {
  myContractFunction.estimateGas({
    from: accountExecutor
  }).then((estimatedGas) => {
    console.log('[ETH-GAS_PRICE_METHOD_CONTRACT] \x1b[96m%s\x1b[0m - \x1b[95m%s\x1b[0m', functionName, estimatedGas);
    callback(null, estimatedGas);
  }).catch((error) => {
    console.log('[ETH-GAS_PRICE_METHOD_CONTRACT] \x1b[96m%s\x1b[0m - \x1b[91m%s\x1b[0m', functionName, JSON.stringify(error));
    callback(error, null);
  });
}

/** One-Time Run Only, Maybe In The Future Can Run From API */

function web3DeployContract(abi = truffleCompiled.abi, bytecode = truffleCompiled.bytecode, contractOwnerAddress = defaultAccount, contractOwnerPassword = defaultPassword) {
  web3SetAccount(contractOwnerAddress);
  web3UnlockAccount(contractOwnerPassword, contractOwnerAddress, (err) => {
    if(err) return;
    web3MiningStart();
    web3GetGasPriceNetwork((networkGas) => {
      web3GetEstimatedGasPriceDeployContract(abi, bytecode, (estimatedGas) => {
        ballotContract = new web3.eth.Contract(abi);
        return ballotContract.deploy({
          data: bytecode,
          arguments: []
        })
        .send({
          from: contractOwnerAddress,
          gasPrice: estimatedGas.toString()
        })
        .then((contractInstance) => {
          return db.mySqlQuery('INSERT INTO contracts SET ?', {
            active: 1,
            address: contractInstance.options.address,
            abi: JSON.stringify(abi),
            bytecode: JSON.stringify(bytecode)
          }, (error, resultsSql1) => {
            if (error) {
              console.log('[ETH-DEPLOY_CONTRACT_INSTANCE] \x1b[91m%s\x1b[0m', JSON.parse(error));
            }
            else {
              ballotInstance = contractInstance;
              ballotContractAddress = contractInstance.options.address;
              db.mySqlQuery(`UPDATE elections SET electionIsActive = 0`, null, (errorSql2, resultsSql2, fieldsSql2) => {});
              console.log('[ETH-DEPLOY_CONTRACT_INSTANCE] \x1b[95m%s\x1b[0m - v%s', ballotContractAddress, resultsSql1.insertId);
            }
            // web3MiningStop();
          });
        });
      });
    });
  });
}

/** Miscellaneous */

function web3TransferCoin(toPubKey, amount = '1', coinType= 'ether', callback, fromPubKey = defaultAccount, fromPassword = defaultPassword) {
  web3SetAccount(fromPubKey);
  const trxObj = {
    from: fromPubKey,
    to: toPubKey,
    value: web3.utils.toWei(amount.toString(), coinType)
  };
  return web3GetEstimatedGasPriceTransaction(trxObj, (estimatedGas) => {
    return web3UnlockAccount(fromPassword, fromPubKey, (err) => {
      return web3.eth.sendTransaction({
        ...trxObj,
        gasPrice: estimatedGas.toString()
      }).then((transactionRecipt) => {
        console.log('[ETH-TRANSFER_ETHER] \x1b[95m%s\x1b[0m - \x1b[35m%s\x1b[0m :: \x1b[91m%s\x1b[0m', fromPubKey, toPubKey, amount);
        callback(null, transactionRecipt);
      }).catch((error) => {
        console.log('ETH-TRANSFER_ETHER] \x1b[91m%s\x1b[0m', error);
        callback(error, null);
      });
    });
  });
}

function web3CreateAccount(password, callback) {
  return web3.eth.personal.newAccount(password).then((pubKey) => {
    console.log('[ETH-CREATE_ACCOUNT] \x1b[95m%s\x1b[0m', pubKey);
    return web3TransferCoin(pubKey, '1', 'ether', callback, defaultAccount, defaultPassword);
  }).catch((error) => {
    console.log('ETH-CREATE_ACCOUNT] \x1b[91m%s\x1b[0m', error);
    callback(error, null);
  });
}

function web3AddWallet(pubKey, privKey, password, callback) {
  console.log('[ETH-IMPORT_ACCOUNT_PUB] \x1b[95m%s\x1b[0m', pubKey);
  console.log('[ETH-IMPORT_ACCOUNT_PRIV] \x1b[95m%s\x1b[0m', privKey);
  let slicedPrivKey = privKey;
  if(slicedPrivKey.startsWith('0x')) {
    slicedPrivKey = slicedPrivKey.slice(2, slicedPrivKey.length);
  }
  return web3.eth.personal.importRawKey(slicedPrivKey, password).then((address => {
    return web3TransferCoin(address, '1', 'ether', callback, defaultAccount, defaultPassword);
  })).catch(error => {
    console.log('ETH-ADD_WALLET] \x1b[91m%s\x1b[0m', error);
    callback(error, null);
  });
}

function web3ImportAccountFromUtc(password, utcFileJsonKeystoreObject, callback) {
  const account = web3.eth.accounts.decrypt(utcFileJsonKeystoreObject, password);
  web3AddWallet(account.address, account.privateKey, password, callback);
}

function web3ImportAccountFromPrivKey(password, privateKey, callback) {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3AddWallet(account.address, account.privateKey, password, callback);
}

function web3ExportAccount(pubKey, callback) {
  find.file(/$/, `${nodeDirectory}/keystore`, (files) => {
    const fIdx = files.findIndex(f => f.toLowerCase().includes(pubKey.toLowerCase()));
    if (fIdx >= 0) {
      console.log('[ETH-EXPORT_ACCOUNT_SUCCESS] \x1b[95m%s\x1b[0m', pubKey);
      callback(files[fIdx]);
    }
    else {
      console.log('[ETH-EXPORT_ACCOUNT_FAILED] \x1b[91m%s\x1b[0m', pubKey);
      callback(null);
    }
  });
}

/** Smart Contract -- Setter */

function web3CreateElection(electionId, electionCreator, passphrase, callback) {
  web3SetAccount(electionCreator);
  return web3UnlockAccount(passphrase, electionCreator, (e) => {
    if(e) return callback(e, null);
    return web3GetEstimatedGasPriceMethodContract(
      'createElection',
      ballotInstance.methods.createElection(electionId),
      electionCreator,
      (error, estimatedGas) => {
        if (error) {
          callback(error, null);
        }
        else {
          return ballotInstance.methods.createElection(electionId).send({
            from: electionCreator,
            gasPrice: estimatedGas.toString()
          }).then((transactionRecipt) => {
            callback(null, transactionRecipt);
          }).catch((error) => {
            callback(error, null);
          });
        }
      }
    );
  });
}

function web3AddCandidate(electionId, candidateAddress, electionCreator, passphrase, callback) {
  web3SetAccount(electionCreator);
  return web3UnlockAccount(passphrase, electionCreator, (e) => {
    if(e) return callback(e, null);
    return web3GetEstimatedGasPriceMethodContract(
      'addCandidate',
      ballotInstance.methods.addCandidate(electionId, candidateAddress),
      electionCreator,
      (error, estimatedGas) => {
        if (error) {
          callback(error, null);
        }
        else {
          return ballotInstance.methods.addCandidate(electionId, candidateAddress).send({
            from: electionCreator,
            gasPrice: estimatedGas.toString()
          }).then((transactionRecipt) => {
            callback(null, transactionRecipt);
          }).catch((error) => {
            callback(error, null);
          });
        }
      }
    );
  });
}

function web3CreateElectionWithCandidates(electionId, candidateAddress, electionCreator, passphrase, callback) {
  web3SetAccount(electionCreator);
  return web3UnlockAccount(passphrase, electionCreator, (e) => {
    if(e) return callback(e, null);
    return web3GetEstimatedGasPriceMethodContract(
      'createElectionWithCandidates',
      ballotInstance.methods.createElectionWithCandidates(electionId, candidateAddress),
      electionCreator,
      (error, estimatedGas) => {
        if (error) {
          callback(error, null);
        }
        else {
          return ballotInstance.methods.createElectionWithCandidates(electionId, candidateAddress).send({
            from: electionCreator,
            gasPrice: estimatedGas.toString()
          }).then((transactionRecipt) => {
            callback(null, transactionRecipt);
          }).catch((error) => {
            callback(error, null);
          });
        }
      }
    );
  });
}

function web3EndElection(electionId, electionCreator, passphrase, callback) {
  web3SetAccount(electionCreator);
  return web3UnlockAccount(passphrase, electionCreator, (e) => {
    if(e) return callback(e, null);
    return web3GetEstimatedGasPriceMethodContract(
      'endElection',
      ballotInstance.methods.endElection(electionId),
      electionCreator,
      (error, estimatedGas) => {
        if (error) {
          callback(error, null);
        }
        else {
          return ballotInstance.methods.endElection(electionId).send({
            from: electionCreator,
            gasPrice: estimatedGas.toString()
          }).then((transactionRecipt) => {
            callback(null, transactionRecipt);
          }).catch((error) => {
            callback(error, null);
          });
        }
      }
    );
  });
}

function web3AddParticipant(electionId, voterAddress, electionCreator, passphrase, callback) {
  web3SetAccount(electionCreator);
  return web3UnlockAccount(passphrase, electionCreator, (e) => {
    if(e) return callback(e, null);
    return web3GetEstimatedGasPriceMethodContract(
      'addParticipant',
      ballotInstance.methods.addParticipant(electionId, voterAddress),
      electionCreator,
      (error, estimatedGas) => {
        if (error) {
          callback(error, null);
        }
        else {
          return ballotInstance.methods.addParticipant(electionId, voterAddress).send({
            from: electionCreator,
            gasPrice: estimatedGas.toString()
          }).then((transactionRecipt) => {
            callback(null, transactionRecipt);
          }).catch((error) => {
            callback(error, null);
          });
        }
      }
    );
  });
}

function web3Vote(electionId, candidateAddress, voterAddress, passphrase, callback) {
  web3SetAccount(voterAddress);
  return web3UnlockAccount(passphrase, voterAddress, (e) => {
    if(e) return callback(e, null);
    return web3GetEstimatedGasPriceMethodContract(
      'vote',
      ballotInstance.methods.vote(electionId, candidateAddress, voterAddress),
      voterAddress,
      (error, estimatedGas) => {
        if (error) {
          callback(error, null);
        }
        else {
          return ballotInstance.methods.vote(electionId, candidateAddress, voterAddress).send({
            from: voterAddress,
            gasPrice: estimatedGas.toString()
          }).then((transactionRecipt) => {
            callback(null, transactionRecipt);
          }).catch((error) => {
            callback({
              message: 'Whoops, Terjadi Kesalahan! Tidak Dapat Memilih.'
            }, null);
          });
        }
      }
    );
  });
}

/** Smart Contract -- Getter */

function web3GetAccountBalance(accountAddress, callback) {
  return web3.eth.getBalance(accountAddress).then((result) => {
    callback(null, result);
  }).catch((error) => {
    callback(error, null);
  });
}

function web3ShowMyVote(electionId, voterAddress, passphrase, callback) {
  web3SetAccount(voterAddress);
  return web3UnlockAccount(passphrase, voterAddress, (e) => {
    if(e) return callback(e, null);
    return ballotInstance.methods.showMyVote(electionId, voterAddress).call({
      from: voterAddress,
    })
    .then((result) => {
      callback(null, result);
    }).catch((error) => {
      callback(error, null);
    });
  });
}

function web3ShowResultCount(electionId, candidatesAddress, callback) {
  web3SetAccount(defaultAccount);
  let calls = [];
  candidatesAddress.forEach(candidateAddress => {
    calls.push(ballotInstance.methods.showResultCount(electionId, candidateAddress).call);
  });
  makeBatchRequest(calls, {
    from: defaultAccount
  }).then((results) => {
    callback(null, results);
  }).catch((error) => {
    callback(error, null);
  });
}

function web3ShowResultCountByCandidateAddress(electionId, candidateAddress, callback) {
  web3SetAccount(defaultAccount);
  ballotInstance.methods.showResultCount(electionId, candidateAddress).call({
    from: defaultAccount,
  })
  .then((result) => {
    callback(null, result);
  }).catch((error) => {
    callback(error, null);
  });
}

/** Explorer */

function web3GetLastestBlocks(page = 1, row = 10, callback) {
  let latestBlocks = [];
  web3.eth.getBlockNumber()
  .then((result1) => {
    const lastBlockNumber = result1;
    for (let index = lastBlockNumber - ((page - 1) * row); index > lastBlockNumber - ((page - 1) * row) - row; index--) {
      web3.eth.getBlock(index)
      .then((result2) => {
        latestBlocks.push(result2);
        if (latestBlocks.length == row) {
          callback(null, latestBlocks);
        }
      }).catch((error) => {
        callback(error, null);
      });
    }
  }).catch((error) => {
    callback(error, null);
  });
}

function web3GetBlock(blockNumberOrHash = 1, detailTransaction = false, callback) {
  web3.eth.getBlock(blockNumberOrHash, detailTransaction)
  .then((result) => {
    callback(null, result);
  }).catch((error) => {
    callback(error, null);
  });
}

function web3GetTransaction(transactionHash, callback) {
  web3.eth.getTransaction(transactionHash)
  .then((result) => {
    callback(null, result);
  }).catch((error) => {
    callback(error, null);
  });
}

module.exports = {
  toHex, fromWei, getContractAddress, gethInitWeb3, web3InitProvider, web3InitMiner, web3SetAccount, web3ChangeProvider,
  web3NewContractInstance, web3UnlockAccount, web3LockAccount, web3MiningStart, web3GetAccountBalance,
  web3MiningStop, web3GetEstimatedGasPriceTransaction, web3GetGasPriceNetwork, web3GetEstimatedGasPriceDeployContract,
  web3GetEstimatedGasPriceMethodContract, web3DeployContract, web3TransferCoin, web3CreateAccount, web3ImportAccountFromUtc,
  web3ImportAccountFromPrivKey, web3ExportAccount, web3CreateElection, web3AddCandidate, web3CreateElectionWithCandidates,
  web3AddParticipant, web3EndElection, web3Vote, web3ShowMyVote, web3ShowResultCount, web3ShowResultCountByCandidateAddress,
  web3GetLastestBlocks, web3GetBlock, web3GetTransaction
};
