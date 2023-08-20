import init, { FlorestaChain } from 'example_libfloresta';
// import { printLine } from './modules/print';

// console.log('Content script works!');
// console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine' function from the Print Module");

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

let florestaChain = null;

async function sync(h) {
  const res = await fetch('https://api.dlsouza.lol/block/$'.replace('$', h), {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  const block = await res.json();

  if (florestaChain === null) {
    console.log('florestaChain is null');
    return;
  }

  if (block.data === undefined) {
    console.log('block.data is undefined');
    return;
  }

  florestaChain.accept_block(JSON.stringify(block.data));
  console.log(block.data);

  const { tip, height, difficulty, network, ibd } = florestaChain;

  // save to chrome.storage
  chrome.storage.local.set({
    tip,
    height,
    difficulty,
    network,
    ibd,
    header: block.data.block.header,
  });
}

const start = async () => {
  await init();
  florestaChain = new FlorestaChain();
  for (let i = 1; i < 90; i++) {
    console.log('sync', i);
    await sync(i);
    // sleep for 100 ms
    await new Promise((r) => setTimeout(r, 100));
  }
  florestaChain.toggle_ibd();
};

start();
