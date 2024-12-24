//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
;(function () {
  const vscode = acquireVsCodeApi()
  let commits = []

  // Get state
  function getState(key) {
    console.log('Getting state:', key)
    vscode.postMessage({
      command: 'getState',
      key
    })
  }

  // Listen for messages
  window.addEventListener('message', event => {
    const message = event.data
    if (message.command === 'setState') {
      console.log('Received state:', message)
      commits = message.value
      updateProgressList(commits)
    }
  })

  const elGetCommitBtn = document.getElementById('get-commits')
  elGetCommitBtn.addEventListener('click', () => {
    getState('commits')
  })

  console.log('🚀 Webview script loaded')
  getState('commits')

  /**
   * @param {Array<{ value: string }>} commits
   */
  function updateProgressList(commits) {
    const ul = document.querySelector('.vspop-list')
    ul.textContent = ''
    for (const commit of commits) {
      const li = document.createElement('li')
      li.className = 'commit-entry'

      const commitText = document.createElement('p')
      const shortCommitId = commit.commit.substring(0, 5)
      commitText.textContent = `${commit.message} (${shortCommitId})`
      li.appendChild(commitText)

      ul.appendChild(li)
    }
  }
})()
