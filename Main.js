/**
 * Author : Martand Singh
 * Date : 27/July/2018
 * Scope : Basic Block Chain demo
 */

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

    //Calculate the hashcode for block
    calculateHash(){
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    //Calculating prepended zero difficulty
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

    //Create very first block, which is called genesys block
    createGenesisBlock(){
        return new Block(0, '2018-07-27', {data : 100}, '0')
    }

    //Get the latest or last block of the block chain
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    //create a new block
    addBlock(newBLock){
        newBLock.previoushash = this.getLatestBlock().hash;
        newBLock.hash = newBLock.calculateHash();
        //newBLock.mineBlock(this.difficulty)
        this.chain.push(newBLock);
    }

    //check the immutability of your block
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
 console.log('IsValid: '+ oBlock.isBlockValid()) //this will print true because block is valid
 oBlock.chain[1].data = {data :200} //Tempering Block : changing rhe block data
 console.log('IsValid: '+ oBlock.isBlockValid()) //this will print false because block has been tempered
 console.log(JSON.stringify(oBlock,null,4)) //printing our whole block