const { logCommit } = require('./logger')

// Track last commit per repository
const lastCommits = new Map()

async function handleCommitChange(repository) {
  try {
    const logs = await repository.log({ maxEntries: 1 })
    if (!logs || logs.length === 0) {
      console.log('📭 No commits found in repository')
      return
    }

    const latestCommit = logs[0]
    const repoPath = repository.rootUri.fsPath

    // Check if this is a new commit
    if (lastCommits.get(repoPath) !== latestCommit.hash) {
      console.log('🔍 New commit detected:', latestCommit.hash)
      lastCommits.set(repoPath, latestCommit.hash)

      logCommit({
        commit: latestCommit.hash,
        message: latestCommit.message,
        repository: repoPath
      })
    }
  } catch (error) {
    console.error('❌ Error handling commit change:', error)
  }
}

module.exports = {
  handleCommitChange
}
