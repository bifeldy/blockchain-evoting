// @ts-nocheck
const fs = require("fs");
const find = require('find');
const execFile = require('child_process').execFile;

const Web3 = require('web3');
const Miner = require('web3-eth-miner').Miner;

const db = require('./db');

const nodeDirectory = `${__dirname}/../../node_kpu`;
const truffleDir = `${__dirname}/../../contract/build/contracts`;

const truffleCompiled = JSON.parse(fs.readFileSync(`${truffleDir}/Ballot.json`));
const defaultAccount = fs.readFileSync(`${nodeDirectory}/pub.key`).toString().toLowerCase();
const defaultPassword = fs.readFileSync(`${nodeDirectory}/pass.key`).toString();

const gethPath = "C:/Program Files (x86)/Geth/geth.exe";
const gethNetworkPortRpcWs = [9999, 9001, 9002, 9003];
const gethBootNodeUrl = '127.0.0.1:0?discport=9000';

const defaultHttp = `http://localhost:${gethNetworkPortRpcWs[2]}`;
const defaultWs = `ws://localhost:${gethNetworkPortRpcWs[3]}`;
const defaultEnode = `enode://31212ed29e7a80d3e6d5ef7211397c22a599f08a74630768b796f82d387384b3eec80efe594e44422c5bd216b9fca5e8d46e0012aa907221795594186c55f730`;

const gethApi = 'admin,db,eth,debug,miner,net,shh,txpool,personal,web3';

var geth = null;
var web3 = null;
var miner = null;

var ballotContract = null;
var ballotContractAddress = null;
var ballotInstance = null;

const defaultOptions = {};

/** Utilities */

function toHex(number) {
  return web3.utils.toHex(number);
}

function fromWei(number, unit = 'ether') {
  return web3.utils.fromWei(number, unit);
}

async function makeBatchRequest(calls, callParameter) {
  let batch = new web3.BatchRequest();
  let promises = calls.map(call => {
    return new Promise((res, rej) => {
      let req = call.request(callParameter, (err, data) => {
        if(err) rej(err);
        else res(data);
      });
      console.log(req);
      batch.add(req);
    });
  });
  batch.execute();
  return await Promise.all(promises);
}

/** Procedural */

function gethInitWeb3() {
  // execFile('rmdir', [
  //   '/Q', '/S', `${nodeDirectory}/geth`
  // ], (err, stdout, stderr) => {
  //   if (err) throw err;
  //   if(stdout) console.log('[RMDIR-STDOUT] \x1b[95m%s\x1b[0m', stdout.toString());
  //   if(stderr) console.log('[RMDIR-STDERR] \x1b[91m%s\x1b[0m', stderr.toString());
  //   geth = execFile(gethPath, [
  //     '--identity', 'node_kpu', '--datadir', nodeDirectory,
  //     '--port', gethNetworkPortRpcWs[1], '--syncmode', "full", '--networkid', gethNetworkPortRpcWs[0],
  //     '--rpc', '--rpcport', gethNetworkPortRpcWs[2], '--rpccorsdomain', "*", '--rpcapi', gethApi,
  //     '--ws', '--wsport', gethNetworkPortRpcWs[3], '--wsorigins', "*", '--wsapi', gethApi,
  //     '--nat', 'none', '--ipcdisable', '--allow-insecure-unlock',
  //     '--unlock', defaultAccount, '--password', `${nodeDirectory}/pass.key`,
  //     '--bootnodes', `${defaultEnode}@${gethBootNodeUrl}`, '--mine', '--verbosity', 5
  //   ], (err, stdout, stderr) => {
  //     if (err) throw err;
  //     if(stdout) console.log('[GETH-CONSOLE_STDOUT] \x1b[95m%s\x1b[0m', stdout.toString());
  //     if(stderr) console.log('[GETH-CONSOLE_STDERR] \x1b[91m%s\x1b[0m', stderr.toString());
  //   });
  // });
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

function web3NewContractInstance(abi, contractAddress, version = 1) {
  ballotInstance = new web3.eth.Contract(abi, contractAddress);
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

/** One-Time Run Only */

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
          }, (error, results) => {
            if (error) {
              console.log('[ETH-DEPLOY_CONTRACT_INSTANCE] \x1b[91m%s\x1b[0m', JSON.parse(error));
            }
            else {
              ballotContractAddress = contractInstance.options.address;
              ballotInstance = contractInstance;
              console.log('[ETH-DEPLOY_CONTRACT_INSTANCE] \x1b[95m%s\x1b[0m - v%s', ballotContractAddress, results.insertId);
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
      }).then((receipt) => {
        console.log('[ETH-TRANSFER_ETHER] \x1b[95m%s\x1b[0m - \x1b[35m%s\x1b[0m :: \x1b[91m%s\x1b[0m', fromPubKey, toPubKey, amount);
        callback(null, {
          pubKey: toPubKey,
          receipt
        });
      }).catch((error) => {
        console.log('ETH-TRANSFER_ETHER] \x1b[91m%s\x1b[0m', error);
        callback(error, null);
      });
    });
  });
}

function web3CreateAccount(password, callback) {
  console.log(password);
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
    console.log(results);
    callback(null, results);
  }).catch((error) => {
    console.log(error);
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

module.exports = {
  toHex, fromWei, gethInitWeb3, web3InitProvider, web3InitMiner, web3SetAccount, web3ChangeProvider,
  web3NewContractInstance, web3UnlockAccount, web3LockAccount, web3MiningStart, web3GetAccountBalance,
  web3MiningStop, web3GetEstimatedGasPriceTransaction, web3GetGasPriceNetwork, web3GetEstimatedGasPriceDeployContract,
  web3GetEstimatedGasPriceMethodContract, web3DeployContract, web3TransferCoin, web3CreateAccount,
  web3ImportAccountFromUtc, web3ImportAccountFromPrivKey, web3ExportAccount, web3CreateElection, web3AddCandidate,
  web3AddParticipant, web3EndElection, web3Vote, web3ShowMyVote, web3ShowResultCount, web3ShowResultCountByCandidateAddress
};
