// TODO: rename blocked to blockList
// TODO: add animations / transitions (ex.: remove, add)
run()

async function run() {
  await setupStorage()
  await displayList()
  bindBlockToButton()

  await printBlockList()
}

async function setupStorage() {
  await chrome.storage.sync.set({ blockList: await getBlockList() || [] })
}

async function displayList() {
  const blockList = await getBlockList()
  blockList.forEach(appendToList) 
}


async function getBlockList() {
  const storage = await chrome.storage.sync.get()
  return storage.blockList
}

function appendToList(blocked) {
  const ul = document.querySelector('#list')
  const li = document.createElement('li')
  const span = document.createElement('span')
  const button = document.createElement('button')
  button.innerHTML = 'X'

  li.setAttribute('id', blocked.id);
  li.appendChild(span)
  li.appendChild(button)
  button.addEventListener('click', () => unblock(blocked.id))
  span.innerHTML = `${blocked.website}`

  ul.appendChild(li);
}

async function unblock(id) {
  let blockList = await getBlockList()
  blockList = blockList.filter(b => b.id !== id)
  await chrome.storage.sync.set({ blockList })
  removeSiteFromUI(id)
}

function removeSiteFromUI(id) {
  const li = document.getElementById(id)
  li.remove()
}

function bindBlockToButton() {
  const button = document.querySelector("#add")
  button.addEventListener('click', block)
}

async function block() {
  const input = document.querySelector('#website')
  const blockList = await getBlockList()
  const id = blockList.length + 1
  const blocked = { website: input.value, id }
  await chrome.storage.sync.set({ blockList: [...blockList, blocked] })
  appendToList(blocked)
  input.value = ''
  await printBlockList()
}

// TODO
function isValidUrl() {
}

function sanitizeUrl() {
}

async function printBlockList() {
  const blockList = await getBlockList()
  console.log(blockList)
}