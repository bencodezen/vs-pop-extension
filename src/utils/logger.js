const { showCommitNotification } = require('./notifications')

function logCommit({ commit, message, repository }) {
  // Console logging with repository path
  console.log('🔔 New commit detected in repository:', repository)
  console.log(`📌 Commit ID: ${commit}`)
  console.log(`💬 Message: ${message}`)
  console.log('📝 ------------------------')

  // Show VS Code notification
  showCommitNotification(commit, message, repository)
}

module.exports = {
  logCommit
}
