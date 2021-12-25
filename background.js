init()

async function init() {
  chrome.tabs.onUpdated.addListener(async () => {
    const { blocked } = await chrome.storage.sync.get({ blocked: [] })
    const currentTab = await chrome.tabs.query({ active: true })
    if (blocked.find(b => currentTab.url && currentTab.url.includes(b))) {
      chrome.tabs.remove(currentTab.id)
    }
  })
}