const vscode = require('vscode')

function showStartupNotification() {
  vscode.window.showInformationMessage(
    '🎉 VS POP is now watching your repositories!'
  )
}

module.exports = {
  showStartupNotification
}
