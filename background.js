init()

async function init() {
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const { blockList } = await chrome.storage.sync.get({ blockList: [] })
    if (blockList.find(b => tab.url.includes(b.website))) {
      chrome.tabs.remove(tab.id)
    }
  })
}