const vscode = require('vscode')
const RepositoryWatcher = require('./repositoryWatcher')

let watchers = new Map()

async function getGitAPI() {
  try {
    const gitExtension = vscode.extensions.getExtension('vscode.git')

    if (!gitExtension) {
      throw new Error('Git extension not found')
    }

    const gitApi = await gitExtension.activate()

    return gitApi.getAPI(1)
  } catch (error) {
    console.error('🔴 Git API error:', error)
    vscode.window.showErrorMessage(`❌ Git extension error: ${error.message}`)
    return null
  }
}

function setupRepositoryWatchers(git) {
  if (!git) return

  // Clean up old watchers
  watchers.forEach(watcher => watcher.dispose())
  watchers.clear()

  // Setup new watchers for each repository
  git.repositories.forEach(repo => {
    console.log('👀 Setting up watcher for repository:', repo.rootUri.fsPath)
    const watcher = new RepositoryWatcher(repo)
    watcher.startWatching()
    watchers.set(repo.rootUri.fsPath, watcher)
  })
}

module.exports = {
  getGitAPI,
  setupRepositoryWatchers
}
