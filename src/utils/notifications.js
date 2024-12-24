const vscode = require('vscode')

function showStartupNotification() {
  vscode.window.showInformationMessage(
    '🎉 VS POP is now watching your repositories!'
  )
}

function showCommitNotification(commit, message, repository) {
  const repoName = repository.split('/').pop() // Get the last part of the path
  vscode.window.showInformationMessage(
    `📢 New commit in ${repoName}: ${message}`,
    { detail: `Commit ID: ${commit}` }
  )
}

module.exports = {
  showStartupNotification,
  showCommitNotification
}
