// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const { getGitAPI, setupRepositoryWatchers } = require('./utils/git')
const { showStartupNotification } = require('./utils/notifications')
const { PopViewProvider } = require('./webview/provider')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('🚀 VS POP activating...')

  try {
    // Show startup notification
    showStartupNotification()

    // Initialize Git API
    const git = await getGitAPI()
    if (!git) {
      throw new Error('Git API not available')
    }

    // Watch for new repositories being added
    context.subscriptions.push(
      git.onDidOpenRepository(() => {
        console.log('📁 New repository detected')
        setupRepositoryWatchers(git, context)
      })
    )

    // Watch for workspace folder changes
    context.subscriptions.push(
      vscode.workspace.onDidChangeWorkspaceFolders(() => {
        console.log('📁 Workspace folders changed')
        setupRepositoryWatchers(git, context)
      })
    )

    // Initial setup for existing repositories
    await setupRepositoryWatchers(git, context)
    console.log('✅ VS POP activated successfully!')
  } catch (error) {
    console.error('⛔ Activation error:', error)
    vscode.window.showErrorMessage(
      `⛔ Failed to initialize VS POP: ${error.message}`
    )
  }

  const provider = new PopViewProvider(context)
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      PopViewProvider.viewType,
      provider
    )
  )

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    'vsPop.helloWorld',
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage('Hello World from vsPop!')
    }
  )

  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
function deactivate() {
  console.log('👋 VS POP deactivated')
}

module.exports = {
  activate,
  deactivate
}
