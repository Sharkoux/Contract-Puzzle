const { ethers } = require('ethers');

async function generateAddress() {
    let found = false;
    let nbrTest = 0
    while (!found) {
        const wallet = ethers.Wallet.createRandom();
        const address = wallet.address;
        
        // Convertir les adresses en BigNumber pour la comparaison
        const generatedAddressBN = ethers.BigNumber.from(address);
        const thresholdBN = ethers.BigNumber.from("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf");
        console.log(`Number Test: ${nbrTest}`)
        nbrTest += 1
        if (generatedAddressBN.lt(thresholdBN)) {
            console.log(`Found an address: ${address}`);
            console.log(`Paire:` + wallet.privateKey + `,` + wallet.address);
            found = true;
        }
    }
}

generateAddress();