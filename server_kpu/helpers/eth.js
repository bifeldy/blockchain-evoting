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
const maxGasLimit = 4700000;

/** Procedural */

function gethInitWeb3() {
  execFile('rmdir', [
    '/Q', '/S', `${nodeDirectory}/geth`
  ], (err, stdout, stderr) => {
    if (err) throw err;
    if(stdout) console.log('[RMDIR-STDOUT] \x1b[95m%s\x1b[0m', stdout.toString());
    if(stderr) console.log('[RMDIR-STDERR] \x1b[91m%s\x1b[0m', stderr.toString());
    geth = execFile(gethPath, [
      '--datadir', nodeDirectory,
      '--port', gethNetworkPortRpcWs[1], '--syncmode', "full", '--networkid', gethNetworkPortRpcWs[0],
      '--rpc', '--rpcport', gethNetworkPortRpcWs[2], '--rpccorsdomain', "*", '--rpcapi', gethApi,
      '--ws', '--wsport', gethNetworkPortRpcWs[3], '--wsorigins', "*", '--wsapi', gethApi,
      '--nat', 'none', '--ipcdisable', '--allow-insecure-unlock',
      '--unlock', defaultAccount, '--password', `${nodeDirectory}/pass.key`,
      '--bootnodes', `${defaultEnode}@${gethBootNodeUrl}`, '--mine', '--verbosity', 5
    ], (err, stdout, stderr) => {
      if (err) throw err;
      if(stdout) console.log('[GETH-CONSOLE_STDOUT] \x1b[95m%s\x1b[0m', stdout.toString());
      if(stderr) console.log('[GETH-CONSOLE_STDERR] \x1b[91m%s\x1b[0m', stderr.toString());
    });
  });
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
  console.log('[ETH-CONTRACT_INSTANCE] \x1b[95m%s\x1b[0m - v%s', contractAddress, version + 1);
}

/** Promises */

function web3UnlockAccount(password, accountAddress = defaultAccount) {
  return web3.eth.personal.unlockAccount(accountAddress, password, 9223372036).then(() => {
    console.log('[ETH-UNLOCK_ACCOUNT] \x1b[95m%s\x1b[0m', accountAddress);
    web3SetAccount(accountAddress);
  }).catch((error) => {
    console.log('[ETH-UNLOCK_ACCOUNT] \x1b[91m%s\x1b[0m', JSON.stringify(error));
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

function web3GetGasPriceNetwork(callback) {
  web3.eth.getGasPrice().then((networkGas) => {
    console.log('[ETH-GAS_PRICE_NETWORK] \x1b[95m%s\x1b[0m', networkGas);
    callback(networkGas);
  }).catch((error) => {
    console.log('[ETH-GAS_PRICE_NETWORK] \x1b[91m%s\x1b[0m', JSON.stringify(error));
  });
}

function web3GetGasPriceDeployContract(abi, bytecode, callback) {
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

function web3GetGasPriceMethodContract(functionName, myContractFunction, callback) {
  myContractFunction.estimateGas({}).then((estimatedGas) => {
    console.log('[ETH-GAS_PRICE_METHOD_CONTRACT] \x1b[96m%s\x1b[0m - \x1b[95m%s\x1b[0m', functionName, estimatedGas);
    callback(estimatedGas);
  }).catch((error) => {
    console.log('[ETH-GAS_PRICE_METHOD_CONTRACT] \x1b[96m%s\x1b[0m - \x1b[91m%s\x1b[0m', functionName, JSON.stringify(error));
  });
}

/** One-Time Run Only */

function web3DeployContract(abi = truffleCompiled.abi, bytecode = truffleCompiled.bytecode, deployer = web3.eth.defaultAccount) {
  web3SetAccount(deployer);
  web3UnlockAccount(defaultPassword).then(() => {
    web3MiningStart();
    web3GetGasPriceNetwork((networkGas) => {
      web3GetGasPriceDeployContract(abi, bytecode, (estimatedGas) => {
        ballotContract = new web3.eth.Contract(abi);
        ballotContract.deploy({
          data: bytecode,
          arguments: []
        })
        .send({
          from: deployer,
          gasPrice: estimatedGas.toString(),
          gas: maxGasLimit
        })
        .then((contractInstance) => {
          db.mySqlQuery('INSERT INTO contracts SET ?', {
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
            web3MiningStop();
          });
        });
      });
    });
  });
}

/** Miscellaneous */

function web3CreateAccount(password, callback) {
  web3.eth.personal.newAccount(password).then((pubKey) => {
    console.log('[ETH-CREATE_ACCOUNT] \x1b[95m%s\x1b[0m', pubKey);
    callback(pubKey);
  }).catch((error) => {
    console.log('[ETH-CREATE_ACCOUNT] \x1b[91m%s\x1b[0m', JSON.stringify(error));
  });
}

function web3ImportAccount(password, utcFileJsonKeystoreArray, callback) {
  web3.eth.accounts.wallet.decrypt([utcFileJsonKeystoreArray], password);
  console.log('[ETH-IMPORT_ACCOUNT] \x1b[95m%s\x1b[0m', utcFileJsonKeystore.address);
  callback(utcFileJsonKeystore.address);
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

/** Smart Contract */

function web3CreateElection(electionId, electionName, contractOwner) {
  web3SetAccount(contractOwner);
  web3GetGasPriceMethodContract(
    'createElection',
    ballotInstance.methods.createElection(electionId, electionName),
    (estimatedGas) => {
      ballotInstance.methods.createElection(electionId, electionName).send({
        from: contractOwner,
        gasPrice: estimatedGas.toString(),
        gas: maxGasLimit
      })
      .on('transactionHash', (transactionHash) => {
        console.log('[CONTRACT-CREATE_ELECTION_TRANSACTION] \x1b[95m%s\x1b[0m', transactionHash);
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('[CONTRACT-CREATE_ELECTION_CONFIRMATION] \x1b[95m%s\x1b[0m', confirmationNumber);
      })
      .on('receipt', (receipt) => {
        console.log('[CONTRACT-CREATE_ELECTION_RECEIPT] \x1b[95m%s\x1b[0m', JSON.stringify(receipt));
      })
      .on('error', (error) => {
        console.log('[CONTRACT-CREATE_ELECTION_ERROR] \x1b[91m%s\x1b[0m', JSON.stringify(error));
      });
    }
  );
}

function web3AddCandidate(electionId, candidateName, candidateAddress, electionCreator) {
  web3SetAccount(electionCreator);
  web3GetGasPriceMethodContract(
    'addCandidate',
    ballotInstance.methods.addCandidate(electionId, candidateName, candidateAddress),
    (estimatedGas) => {
      ballotInstance.methods.addCandidate(electionId, candidateName, candidateAddress).send({
        from: electionCreator,
        gasPrice: estimatedGas.toString(),
        gas: maxGasLimit
      })
      .on('transactionHash', (transactionHash) => {
        console.log('[CONTRACT-ADD_CANDIDATE_TRANSACTION] \x1b[95m%s\x1b[0m', transactionHash);
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('[CONTRACT-ADD_CANDIDATE_CONFIRMATION] \x1b[95m%s\x1b[0m', confirmationNumber);
      })
      .on('receipt', (receipt) => {
        console.log('[CONTRACT-ADD_CANDIDATE_RECEIPT] \x1b[95m%s\x1b[0m', JSON.stringify(receipt));
      })
      .on('error', (error) => {
        console.log('[CONTRACT-ADD_CANDIDATE_ERROR] \x1b[91m%s\x1b[0m', JSON.stringify(error));
      });
    }
  );
}

function web3AddParticipant(electionId, voterName, voterAddress, electionCreator) {
  web3SetAccount(electionCreator);
  web3GetGasPriceMethodContract(
    'addParticipant',
    ballotInstance.methods.addParticipant(electionId, voterName, voterAddress),
    (estimatedGas) => {
      ballotInstance.methods.addParticipant(electionId, voterName, voterAddress).send({
        from: electionCreator,
        gasPrice: estimatedGas.toString(),
        gas: maxGasLimit
      })
      .on('transactionHash', (transactionHash) => {
        console.log('[CONTRACT-ADD_PARTICIPANT_TRANSACTION] \x1b[95m%s\x1b[0m', transactionHash);
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('[CONTRACT-ADD_PARTICIPANT_CONFIRMATION] \x1b[95m%s\x1b[0m', confirmationNumber);
      })
      .on('receipt', (receipt) => {
        console.log('[CONTRACT-ADD_PARTICIPANT_RECEIPT] \x1b[95m%s\x1b[0m', JSON.stringify(receipt));
      })
      .on('error', (error) => {
        console.log('[CONTRACT-ADD_PARTICIPANT_ERROR] \x1b[91m%s\x1b[0m', JSON.stringify(error));
      });
    }
  );
}

function web3EndElection(electionId, electionCreator) {
  web3SetAccount(electionCreator);
  web3GetGasPriceMethodContract(
    'endElection',
    ballotInstance.methods.endElection(electionId),
    (estimatedGas) => {
      ballotInstance.methods.endElection(electionId).send({
        from: electionCreator,
        gasPrice: estimatedGas.toString(),
        gas: maxGasLimit
      })
      .on('transactionHash', (transactionHash) => {
        console.log('[CONTRACT-END_ELECTION_TRANSACTION] \x1b[95m%s\x1b[0m', transactionHash);
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('[CONTRACT-END_ELECTION_CONFIRMATION] \x1b[95m%s\x1b[0m', confirmationNumber);
      })
      .on('receipt', (receipt) => {
        console.log('[CONTRACT-END_ELECTION_RECEIPT] \x1b[95m%s\x1b[0m', JSON.stringify(receipt));
      })
      .on('error', (error) => {
        console.log('[CONTRACT-END_ELECTION_ERROR] \x1b[91m%s\x1b[0m', JSON.stringify(error));
      });
    }
  );
}

function web3Vote(electionId, candidateAddress, voterAddress) {
  web3SetAccount(voterAddress);
  web3GetGasPriceMethodContract(
    'vote',
    ballotInstance.methods.vote(electionId, candidateAddress, voterAddress),
    (estimatedGas) => {
      ballotInstance.methods.vote(electionId, candidateAddress, voterAddress).send({
        from: voterAddress,
        gasPrice: estimatedGas.toString(),
        gas: maxGasLimit
      })
      .on('transactionHash', (transactionHash) => {
        console.log('[CONTRACT-VOTE_TRANSACTION] \x1b[95m%s\x1b[0m', transactionHash);
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('[CONTRACT-VOTE_CONFIRMATION] \x1b[95m%s\x1b[0m', confirmationNumber);
      })
      .on('receipt', (receipt) => {
        console.log('[CONTRACT-VOTE_RECEIPT] \x1b[95m%s\x1b[0m', JSON.stringify(receipt));
      })
      .on('error', (error) => {
        console.log('[CONTRACT-VOTE_ERROR] \x1b[91m%s\x1b[0m', JSON.stringify(error));
      });
    }
  );
}

function web3ShowMyVote(electionId, voterAddress) {
  web3SetAccount(voterAddress);
  ballotInstance.methods.showMyVote(electionId, voterAddress).call({
    from: voterAddress,
  })
  .then((result) => {
    console.log('[CONTRACT-MY_VOTE] \x1b[95m%s\x1b[0m', JSON.stringify(result));
  });
}

function web3ShowResultCount(electionId, candidateAddress, voterAddress) {
  web3SetAccount(voterAddress);
  ballotInstance.methods.showResultCount(electionId, candidateAddress).call({
    from: voterAddress,
  })
  .then((result) => {
    console.log('[CONTRACT-ELECTION_VOTE_RESULT] \x1b[95m%s\x1b[0m', JSON.stringify(result));
  });
}

module.exports = {
  gethInitWeb3, web3InitProvider, web3InitMiner, web3SetAccount, web3ChangeProvider,
  web3NewContractInstance, web3UnlockAccount, web3LockAccount, web3MiningStart,
  web3MiningStop, web3GetGasPriceNetwork, web3GetGasPriceDeployContract,
  web3GetGasPriceMethodContract, web3DeployContract, web3CreateAccount,
  web3ImportAccount, web3ExportAccount, web3CreateElection, web3AddCandidate,
  web3AddParticipant, web3EndElection, web3Vote, web3ShowMyVote, web3ShowResultCount
};
