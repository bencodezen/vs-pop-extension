const { handleCommitChange } = require('./commitHandler')

class RepositoryWatcher {
  constructor(repository) {
    this.repository = repository
    this.commits = []
  }

  startWatching() {
    console.log(
      '👀 Starting to watch repository:',
      this.repository.rootUri.fsPath
    )

    // Initial check
    handleCommitChange(this.repository)

    // Watch for changes
    this.commits.push(
      this.repository.state.onDidChange(() => {
        console.log('📝 Repository state changed')
        handleCommitChange(this.repository)
      })
    )
  }

  dispose() {
    console.log('🛑 Stopping repository watcher')
    this.commits.forEach(d => d.dispose())
  }
}

module.exports = RepositoryWatcher
