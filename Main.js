const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previoushash = ''){
        this.index = index;
        this.timestamp = timestamp
        this.data = data
        this.previoushash = previoushash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash(){
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.toString().substring(0, difficulty) !== Array(difficulty + 1).join("0") ){
            this.nonce = this.nonce++
            this.hash = this.calculateHash();
        }
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block(0, '2018-07-27', 'Martand Singh', '0')
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBLock){
        newBLock.previoushash = this.getLatestBlock().hash;
        newBLock.hash = newBLock.calculateHash();
        //newBLock.mineBlock(this.difficulty)
        this.chain.push(newBLock);
    }

    isBlockValid(){
        for(let i = 1; i < this.chain.length; i++){
            var currentBlock = this.chain[i]
            var previousBlock = this.chain[i-1]
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previoushash !== previousBlock.hash){
                return false;
            }
            return true;
        }
    }
}

let oBlock = new BlockChain()
oBlock.addBlock(new Block(1, '2018-07-27', {data : 2}))
oBlock.addBlock(new Block(2, '2018-08-28', {data : 12}))
oBlock.addBlock(new Block(3, '2018-08-29', {data : 5}))
 console.log('IsValid: '+ oBlock.isBlockValid())
 oBlock.chain[1].data = {data :200}
 console.log('IsValid: '+ oBlock.isBlockValid())
 console.log(JSON.stringify(oBlock,null,4))