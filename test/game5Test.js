const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');


describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

     const customWallet = new ethers.Wallet('0x6c027759e5af1d224d5494800506c3715bdc4f39d8a55c3d4c50b08e2c9e5918', ethers.provider );

    
    return { game, customWallet };
  }
  it('should be a winner', async function () {
    const { game, customWallet } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const signer = ethers.provider.getSigner(0);

    await signer.sendTransaction({
      to: customWallet.address,
      value: ethers.utils.parseEther("1.0"),
    })
    
    const tx = await game.connect(customWallet).win();
    
    console.log(`Transaction sent from address ${customWallet.address}...`)
    await tx.wait()
    // await game.win();
    console.log('Transaction completed')
    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
