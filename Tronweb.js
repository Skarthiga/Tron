<html>
<script src="./js/tronweb.js"></script>

<body>
    <h3>Token Details</h3>
    <button onclick="tname()">Token Name</button>
    <button onclick="decimals()">Token Decimals</button></br>
    <hr>
    <h3>Owner Details</h3>
    <button onclick="owner()">OwnerAddress</button>
    <button onclick="changeOwner()">changeOwner</button></br>
    <hr>
    <h3>Balance</h3>
    <button onclick="balances()">Balance</button></br>
    <hr>
    <h3>TransferLock</h3>
    <button onclick="transferLock()">Check TransferLock status</button>
    <button onclick="updateTransferlock()">Update Transferlock</button></br>
    <h3>MinterTransfer</h3>
    <button onclick="minterTransfer()">Minter Transfer</button>
    <button onclick="minterTransfer2()">Minter Transfer2</button>
    <hr>
    </br>
</body>
<script>

    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
    const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
    const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
    const privateKey = "b80cf85eb85c1407a4e82528520b51e354098ad20b1fc438ea7d3df5e469c691";

    const tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
        );
    console.log("tronWeb", tronWeb);

    let admin = 'TWAxNzayGXMFEt5q4Eumu1hzAAdQ9apJpa'; //Your account address
    
    //Cade token contract details
    const contractAddress = 'TQX9uGcVExwcdKTfh3H7ysax5BG3RYoGUU'
    let contract = tronWeb.contract().at(contractAddress);
    console.log("contract", contract);

    //Test token contract details
    const tokencontractAddress = 'TLbUCTVdykcfUT7dCo5BC1H3NTTadJkqd5'
    let contracttoken = tronWeb.contract().at(tokencontractAddress);
    console.log("contract token", contracttoken);
    
    //Tronlink Balance
    tronWeb.trx.getBalance('TWAxNzayGXMFEt5q4Eumu1hzAAdQ9apJpa', (err, balance) => {
        if (err)
            return console.error(err);
        console.log({TRXBalance : balance});
    });

    //name
    async function tname() {
        let instance = await tronWeb.contract().at('TSGxzoRNV9PZMikQHoqNghYhWW178uQmdG');
        let result = await instance["name"]().call();
        console.log("Name", result);
    }

    //decimals
    async function decimals() {
        let instance = await tronWeb.contract().at('TSGxzoRNV9PZMikQHoqNghYhWW178uQmdG');
        let res = await instance["decimals"]().call();
        console.log("decimals", res);
    }

   
    //balances
    async function balances(){
        let instance = await tronWeb.contract().at('TQX9uGcVExwcdKTfh3H7ysax5BG3RYoGUU');
        let balance_owner = await instance["balances"]('TWAxNzayGXMFEt5q4Eumu1hzAAdQ9apJpa').call();
        let balance_market = await instance["balances"]('TL7AZv82kP91hHf3ky6reaaVTVy4aJUFZA').call();
        let balance_team = await instance["balances"]('TUMFvnpSftpRypyweAV5NSWiSK69tytQcF').call();
        let balance_reserve = await instance["balances"]('TXZXpVTuskbjPDuzSKgagUZmFeheWVncBE').call();
        let balance_u1 = await instance["balances"]('TLw2rkYM7gsWqQcR8QMdtVb69EACPEw3DK').call();
        let balance_u2 = await instance["balances"]('TPV26PvbmPVavbGnSgq3pDUndcoYHrHUbU').call();
        let result_Contract = await instance["balances"]('TQX9uGcVExwcdKTfh3H7ysax5BG3RYoGUU').call();              
        console.log("balance_owner", balance_owner.toString(),"\n balance_market", balance_market.toString(),"\n balance_contract", result_Contract.toString(), "\n balance_team", balance_team.toString(), "\n balance_reserve", balance_reserve.toString(), "\n balu1", balance_u1.toString(), "\n balu2", balance_u2.toString());
    }

    //transferLock
    async function transferLock(){
        let instance = await tronWeb.contract().at('TQX9uGcVExwcdKTfh3H7ysax5BG3RYoGUU');
        let transferLock = await instance["transferLock"]().call();
        console.log("transferLock", transferLock);
    }

    //updateTransferlock
    async function updateTransferlock(){
        const privateKey_owner = "b80cf85eb85c1407a4e82528520b51e354098ad20b1fc438ea7d3df5e469c691";
        let instance = await tronWeb.contract().at('TQX9uGcVExwcdKTfh3H7ysax5BG3RYoGUU');
        let updateTransferlock = await instance["updateTransferlock"](
            false
            ).send({
                callValue : 0,
                shouldPollResponse : true,
                privateKey_owner
            });
        console.log("updateTransferlock", updateTransferlock);
    }

    //minterTransfer
    async function minterTransfer(){
        try{
        const privateKey_owner = "b80cf85eb85c1407a4e82528520b51e354098ad20b1fc438ea7d3df5e469c691";
        let instance = await tronWeb.contract().at('TQX9uGcVExwcdKTfh3H7ysax5BG3RYoGUU');
        let minterTransfer = await instance["minterTransfer"](
            'TPV26PvbmPVavbGnSgq3pDUndcoYHrHUbU', //to_address
            '2000000000000000000' //amount
            ).send({
                feeLimit : 1000000000,
                callValue : 5000000000,
                // shouldPollResponse : true,
                privateKey_owner
            });
        console.log("minterTransfer", minterTransfer);
        }catch(err){
            console.log("Revert", err);   
        }
    }

    //minterTransfer2
    async function minterTransfer2(){
        try{
        const privateKey_owner = "b80cf85eb85c1407a4e82528520b51e354098ad20b1fc438ea7d3df5e469c691";
        let instance = await tronWeb.contract().at('TQX9uGcVExwcdKTfh3H7ysax5BG3RYoGUU');
        let minterTransfer = await instance["minterTransfer2"](
            'TXZXpVTuskbjPDuzSKgagUZmFeheWVncBE', //to_address
            '1000000000000000000' //amount
            ).send({
                feeLimit : 1000000000,
                callValue : 5000000000,
                // shouldPollResponse : true,
                privateKey_owner
            });
        console.log("minterTransfer", minterTransfer);
        }catch(err){
            console.log("Revert", err);   
        }
    }
   
    
</script>
</html>

