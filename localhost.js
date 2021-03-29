var express = require('express')
var app = express()
app.server = require('http').createServer(app)
const { createProxyMiddleware } = require('http-proxy-middleware')
const WyzthWeb = require('wyzthweb')

function onProxyRes(proxyRes, req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    console.log('req.originalUrl')
}

var fullnode = express()
fullnode.use('/', createProxyMiddleware({
    target: 'http://178.128.29.24:16667',
    changeOrigin: true,
    onProxyRes
}))
fullnode.listen(8090)

var soliditynode = express()
soliditynode.use('/', createProxyMiddleware({
    target: 'http://178.128.29.24:16668',
    changeOrigin: true,
    onProxyRes
}))
soliditynode.listen(8091)

const fullNode = 'http://178.128.29.24:16667'
const solidityNode = 'http://178.128.29.24:16668'
const eventServer = 'http://178.128.29.24:8080'
const privateKey = 'aa9dd566dcfbd74f3fdbb44dfe735541f51c2c1c9c95912c7b380881b731597c'

const wyzthWeb = new WyzthWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
)
//console.log('wyzthWeb', wyzthWeb)

app.get('/getNodeInfo', (req,res) => {
	getNodeInfo()
	async function getNodeInfo(){
		await wyzthWeb.wyz.getNodeInfo((err,result) => {
		if (err) return res.json({status: false, "Error": err})
		res.json({status: true, getNodeInfo:result})	
		})
	}
})

app.get('/node', (req,res) => {
	isConnected()
	async function isConnected(){
		const isConnected = await wyzthWeb.isConnected()
		console.log({isConnected: isConnected})
		res.json({status: true, isConnected:isConnected})	
	}
})

app.get('/listnodes', (req,res) => {
	listNodes()
	async function listNodes(){
		await wyzthWeb.wyz.listNodes().then(result => {
		console.log({listNodes: result})
		res.json({status: true, listNodes:result})	
		})
	}
})

app.get('/chainparams', (req,res) => {
	chainparams()
	async function chainparams(){
		const getChainParameters = await wyzthWeb.wyz.getChainParameters()
		res.json({status: true, getChainParameters:getChainParameters})	
	}
})

app.get('/getAddress/:addr', (req,res) => {
		const getAddress = wyzthWeb.address.fromHex(req.params.addr)
		res.json({status: true, getAddress:getAddress})	
})

app.get('/getAddressHex/:addr', (req,res) => {
	const getAddress = wyzthWeb.address.toHex(req.params.addr)
	res.json({status: true, getAddress:getAddress})	
})

app.get('/node', (req,res) => {
	isConnected()
	async function isConnected(){
		const isConnected = await wyzthWeb.isConnected()
		console.log({isConnected: isConnected})
		res.json({status: true, isConnected:isConnected})	
	}
})


app.get('/generateaddr', (req,res) => {
	createAccount()
	async function createAccount(){
		const createAccount = await wyzthWeb.createAccount()
		console.log({createAccount: createAccount})
		res.json({status: true, createAccount:createAccount})	
	}
})

app.get('/isAddress/:addr', (req,res) => {
	isAddress()
	async function isAddress(){
		const isAddress = await wyzthWeb.isAddress(req.params.addr)
		if(isAddress == true)
		res.json({status: true, isAddress:isAddress})
		else
		res.json({status: false, isAddress:isAddress})	
	}
})

app.get('/addrpk/:pk', (req,res) => {
	fromPrivateKey()
	async function fromPrivateKey(){
		pk = req.params.pk
		const fromPrivateKey = await wyzthWeb.address.fromPrivateKey(pk)
		if(pk.length == 64)
		res.json({status: true, fromPrivateKey:fromPrivateKey})
		else
		res.json({status: false, fromPrivateKey:"Invalid length"})	
	}
})

app.get('/getAccount/:addr', (req,res) => {
	getAccount()
	async function getAccount(){
		await wyzthWeb.wyz.getAccount(req.params.addr,(err,result) => {
		if (err) return res.json({status: false, "Error": err})
		res.json({status: true, Account_details:result})	
		})
	}
})

app.get('/balance/:addr', (req,res) => {
	getAccount()
	async function getAccount(){
		await wyzthWeb.wyz.getBalance(req.params.addr,(err,result) => {
		if (err) return res.json({status: false, "Error": err})
		res.json({status: true, WYZ_Balance:result})	
		})
	}
})

app.get('/getCurrentBlock', (req,res) => {
	getCurrentBlock()
	async function getCurrentBlock(){
		await wyzthWeb.wyz.getCurrentBlock((err,result) => {
		if (err) return res.json({status: false, "Error": err})
		console.log({getCurrentBlock: result})
		res.json({status: true, getCurrentBlock:result})	
		})
	}
})

app.get('/blockId/:id', (req,res) => {
	getBlock()
	async function getBlock(){
		await wyzthWeb.wyz.getBlock(req.params.id,(err,result) => {
		if (err) return res.json({status: false, "Error": err})
		res.json({status: true, getBlock:result})	
		})
	}
})

app.get('/blockHash/:hash', (req,res) => {
	getBlockByHash()
	async function getBlockByHash(){
		await wyzthWeb.wyz.getBlockByHash(req.params.hash,(err,result) => {
		if (err) return res.json({status: false, "Error": err})
		res.json({status: true, getBlockByHash:result})	
		})
	}
})

app.get('/transfer/:to/:amount/:frompk', (req,res) => {
	sendTransaction()
	async function sendTransaction(){
		await wyzthWeb.wyz.sendTransaction(req.params.to,req.params.amount,req.params.frompk,(err,result) => {
		if (err) return res.json({status: false, "Error": err})
		res.json({status: true, Transfer_details:result})	
		})
	}
})

app.get('/txinfo/:txid', (req,res) => {
	getTransaction()
	async function getTransaction(){
		await wyzthWeb.wyz.getTransaction(req.params.txid,(err,result) => {
		if (err) return res.json({status: false, "Error": err})
		res.json({status: true, Transaction_details:result})	
		})
	}
})

app.get('/tx/:txid', (req,res) => {
	getTransactionInfo()
	async function getTransactionInfo(){
		await wyzthWeb.wyz.getTransactionInfo(req.params.txid,(err,result) => {
		if (err) return res.json({status: false, "Error": err})
		res.json({status: true, Transaction_info_details:result})	
		})
	}
})

app.get('/txcount/:bid', (req,res) => {
	getBlockTransactionCount()
	async function getBlockTransactionCount(){
		await wyzthWeb.wyz.getBlockTransactionCount(req.params.bid,(err,result) => {
		if (err) return res.json({status: false, "Error": err})
		res.json({status: true, Transaction_count_details:result})	
		})
	}
})

app.get('/listTokens/:limit/:offset', (req,res) => {
	listTokens()
	async function listTokens(){
		wyzthWeb.wyz.listTokens().then(result => {
			res.json({status: true, "Token_details": result})
		});
	}
})

app.get('/createToken/:userpk', (req,res) => {
	createToken()
	async function createToken(){
		const wyz_options = {
			name : "wyzth",
			abbreviation : "wyz",
			description : "This is wyzth token",
			url : "www.wyzth.com",
			totalSupply : 100000,
			trxRatio : 1, 
			tokenRatio : 1, 
			saleStart : 1616617236000,
			saleEnd : 1617114876000,
			freeBandwidth : 0,
			freeBandwidthLimit : 0, 
			frozenAmount : 100000,
			frozenDuration : 3,
			precision : 6,
		}
		userpk = req.params.userpk
		useraddr = wyzthWeb.address.fromPrivateKey(userpk)
		const transaction = await wyzthWeb.transactionBuilder.createToken(
			wyz_options,
			useraddr
		)
		console.log({status: true, Transaction:transaction})
		
		//if(!transaction.result || !transaction.result.result)
		//return console.error("unknown error: " + txJson, null, 2)

		const signedTransaction = await wyzthWeb.wyz.sign(transaction, userpk)
		console.log("signedTransaction", signedTransaction)

		if(!signedTransaction.signature){
		return console.error("Transaction was not signed properly")		
		}
		
		const contract = await wyzthWeb.wyz.sendRawTransaction(signedTransaction)
		res.json({status: true, "BroadcastTransaction": contract})
		
		if(contract.code){
		console.log("broadcast", contract)
		console.log({status: false, "toUtf8":wyzthWeb.toUtf8(contract.message)})		
		}
	
	}
})

app.get('/freezeBalance/:amount/:dur/:resource/:userpk', (req,res) => {
	freezeBalance()
	async function freezeBalance(){
		amount = req.params.amount
		duration = req.params.dur
		resource = req.params.resource
		userpk = req.params.userpk
		useraddr = wyzthWeb.address.fromPrivateKey(userpk)
		receiveraddr = wyzthWeb.address.fromPrivateKey(userpk)
		const transaction = await wyzthWeb.transactionBuilder.freezeBalance(
			amount,
			duration,
			resource,
			useraddr,
			receiveraddr,
		)
		console.log({status: true, Transaction:transaction})
		
		//if(!transaction.result || !transaction.result.result)
		//return console.error("unknown error: " + txJson, null, 2)

		const signedTransaction = await wyzthWeb.wyz.sign(transaction, userpk)
		console.log("signedTransaction", signedTransaction)

		if(!signedTransaction.signature){
		return console.error("Transaction was not signed properly")		
		}
		
		const contract = await wyzthWeb.wyz.sendRawTransaction(signedTransaction)
		res.json({status: true, "BroadcastTransaction": contract})
		
		if(contract.code){
		console.log("broadcast", contract)
		console.log({status: false, "Freeze_details":wyzthWeb.toUtf8(contract.message)})		
		}
	
	}
})

app.get('/unfreezeBalance/:resource/:userpk', (req,res) => {
	unfreezeBalance()
	async function unfreezeBalance(){
		resource = req.params.resource
		userpk = req.params.userpk
		useraddr = wyzthWeb.address.fromPrivateKey(userpk)
		receiveraddr = wyzthWeb.address.fromPrivateKey(userpk)
		const transaction = await wyzthWeb.transactionBuilder.unfreezeBalance(
			resource,
			useraddr,
			receiveraddr,
		)
		console.log({status: true, Transaction:transaction})
		
		//if(!transaction.result || !transaction.result.result)
		//return console.error("unknown error: " + txJson, null, 2)

		const signedTransaction = await wyzthWeb.wyz.sign(transaction, userpk)
		console.log("signedTransaction", signedTransaction)

		if(!signedTransaction.signature){
		return console.error("Transaction was not signed properly")		
		}
		
		const contract = await wyzthWeb.wyz.sendRawTransaction(signedTransaction)
		res.json({status: true, "BroadcastTransaction": contract})
		
		if(contract.code){
		console.log("broadcast", contract)
		console.log({status: false, "Unfreeze_details":wyzthWeb.toUtf8(contract.message)})		
		}
	
	}
})

app.get('/listProposal', (req,res) => {
	listProposals()
	async function listProposals(){
		wyzthWeb.wyz.listProposals().then(result => {
			res.json({status: true, "Proposal_details": result})
		});
	}
})

app.get('/createProposal/:key/:value/:srpk', (req,res) => {
	createProposal()
	async function createProposal(){
		key = parseInt(req.params.key)
		value = parseInt(req.params.value)
		srpk = req.params.srpk
		proposal_params = [{"key":key,"value":value}]
		sraddr = wyzthWeb.address.fromPrivateKey(srpk)
		const transaction = await wyzthWeb.transactionBuilder.createProposal(
			proposal_params,
			sraddr
		)
		console.log({status: true, Transaction:transaction})
		
		//if(!transaction.result || !transaction.result.result)
		//return console.error("unknown error: " + txJson, null, 2)

		const signedTransaction = await wyzthWeb.wyz.sign(transaction, srpk)
		console.log("signedTransaction", signedTransaction)

		if(!signedTransaction.signature){
		return console.error("Transaction was not signed properly")		
		}
		
		const contract = await wyzthWeb.wyz.sendRawTransaction(signedTransaction)
		res.json({status: true, "BroadcastTransaction": contract})
		
		if(contract.code){
		console.log("broadcast", contract)
		console.log({status: false, "Create_Proposal_details":wyzthWeb.toUtf8(contract.message)})		
		}
	
	}
})

app.get('/voteProposal/:pid/:appr/:srpk', (req,res) => {
	voteProposal()
	async function voteProposal(){
		pid = req.params.pid
		appr = Boolean(req.params.appr)
		srpk = req.params.srpk
		sraddr = wyzthWeb.address.fromPrivateKey(srpk)
		const transaction = await wyzthWeb.transactionBuilder.voteProposal(
			pid,
			appr,
			sraddr
		)
		console.log({status: true, Transaction:transaction})

		//if(!transaction.result || !transaction.result.result)
		//return console.error("unknown error: " + txJson, null, 2)

		const signedTransaction = await wyzthWeb.wyz.sign(transaction, srpk)
		console.log("signedTransaction", signedTransaction)

		if(!signedTransaction.signature){
		return console.error("Transaction was not signed properly")		
		}
		
		const contract = await wyzthWeb.wyz.sendRawTransaction(signedTransaction)
		res.json({status: true, "BroadcastTransaction": contract})
		
		if(contract.code){
		console.log("broadcast", contract)
		console.log({status: false, "Vote_Proposal_details":wyzthWeb.toUtf8(contract.message)})		
		}
	
	}
})

app.get('/deleteProposal/:pid/:srpk', (req,res) => {
	deleteProposal()
	async function deleteProposal(){
		pid = req.params.pid
		srpk = req.params.srpk
		sraddr = wyzthWeb.address.fromPrivateKey(srpk)
		const transaction = await wyzthWeb.transactionBuilder.deleteProposal(
			pid,
			sraddr
		)
		console.log({status: true, Transaction:transaction})

		//if(!transaction.result || !transaction.result.result)
		//return console.error("unknown error: " + txJson, null, 2)

		const signedTransaction = await wyzthWeb.wyz.sign(transaction, srpk)
		console.log("signedTransaction", signedTransaction)

		if(!signedTransaction.signature){
		return console.error("Transaction was not signed properly")		
		}
		
		const contract = await wyzthWeb.wyz.sendRawTransaction(signedTransaction)
		res.json({status: true, "BroadcastTransaction": contract})
		
		if(contract.code){
		console.log("broadcast", contract)
		console.log({status: false, "DeleteProposal_details":wyzthWeb.toUtf8(contract.message)})		
		}
	
	}
})

app.get('/createSmartContract/:userpk', (req,res) => {
	createSmartContract()
	async function createSmartContract(){
		userpk = req.params.userpk
		useraddr = wyzthWeb.address.fromPrivateKey(userpk)
		const l_args = {
    			feeLimit: 1000000000,
    			callValue: 0,
    			tokenId:"",
    			tokenValue:0,
    			userFeePercentage: 10,
    			originEnergyLimit: 10,
    			abi:[{"constant":true,"inputs":[],"name":"getAge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_age","type":"uint256"}],"name":"setAge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
   			bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060c2806100396000396000f3fe6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b5060043610604a5760003560e01c8063967e6e6514604f578063d5dcf127146067575b600080fd5b60556083565b60408051918252519081900360200190f35b608160048036036020811015607b57600080fd5b50356089565b005b60005490565b60005556fea26474726f6e58204563f3ae9999d7ea1f338aa367b836807ad839a397c2ea537793c7a4adafc51964736f6c634300050a0031",
			parameter: "",
			name:"Foo",
		}
		const transaction = await wyzthWeb.transactionBuilder.createSmartContract(
			l_args,
			useraddr
		)
		console.log({status: true, Transaction:transaction})

		//if(!transaction.result || !transaction.result.result)
		//return console.error("unknown error: " + txJson, null, 2)

		const signedTransaction = await wyzthWeb.wyz.sign(transaction, userpk)
		console.log("signedTransaction", signedTransaction)

		if(!signedTransaction.signature){
		return console.error("Transaction was not signed properly")		
		}
		
		const contract = await wyzthWeb.wyz.sendRawTransaction(signedTransaction)
		res.json({status: true, "BroadcastTransaction": contract})
		
		if(contract.code){
		console.log("broadcast", contract)
		console.log({status: false, "CreateSmartContract_details":wyzthWeb.toUtf8(contract.message)})		
		}
	
	}
})
//Wi4VXweQ2XEjxKfBumNLXhKzcYZAyJ1Hoz

app.get('/getContract/:contractaddr', (req,res) => {
	getContract()
	async function getContract(){
		wyzthWeb.wyz.getContract(req.params.contractaddr).then(result => {
			res.json({status: true, "Contract_details": result})
		});
	}
})

app.get('/triggerContract/:userpk', (req,res) => {
	triggerSmartContract()
	async function triggerSmartContract(){
		userpk = req.params.userpk
		useraddr = wyzthWeb.address.fromPrivateKey(userpk)
		var options = {
        		feeLimit:100000000,
        		callValue:0,
        		tokenValue:0,
        		tokenId:0
    		}
		const contract_addr = "Wi4VXweQ2XEjxKfBumNLXhKzcYZAyJ1Hoz"
		const issuer_addr = useraddr
		const functionSelector = 'setAge(uint256)'
		const parameters = [{type:'uint256', value:'10'}]
		const callback = false

		const transaction = await wyzthWeb.transactionBuilder.createSmartContract(
			contract_addr,
			functionSelector,
			options,
			parameters,
			issuer_addr
		)
		console.log({status: true, Transaction:transaction})

		//if(!transaction.result || !transaction.result.result)
		//return console.error("unknown error: " + txJson, null, 2)

		const signedTransaction = await wyzthWeb.wyz.sign(transaction, userpk)
		console.log("signedTransaction", signedTransaction)

		if(!signedTransaction.signature){
		return console.error("Transaction was not signed properly")		
		}
		
		const contract = await wyzthWeb.wyz.sendRawTransaction(signedTransaction)
		res.json({status: true, "BroadcastTransaction": contract})
		
		if(contract.code){
		console.log("broadcast", contract)
		console.log({status: false, "TriggerContract":wyzthWeb.toUtf8(contract.message)})		
		}
	
	}
})

app.get('/listSR', (req,res) => {
	listSuperRepresentatives()
	async function listSuperRepresentatives(){
		wyzthWeb.wyz.listSuperRepresentatives().then(result => {
			res.json({status: true, "SR_details": result})
		});
	}
})

app.set('host', process.env.HOST || '192.168.43.25');
app.set('port', process.env.PORT || 4000)
app.listen(app.get('port'), function(){
	console.log('WYZTH API Listening on ' +app.get('host')+ ":"+app.get('port'))
})
