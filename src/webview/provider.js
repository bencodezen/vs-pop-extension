const vscode = require('vscode')

class PopViewProvider {
  constructor(_extensionUri) {
    this._extensionUri = _extensionUri
  }
  resolveWebviewView(webviewView) {
    this._view = webviewView
    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    }
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)
  }

  _getHtmlForWebview(webview) {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        'src',
        'webview',
        'assets',
        'main.js'
      )
    )
    // Do the same for the stylesheet.
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        'src',
        'webview',
        'assets',
        'reset.css'
      )
    )
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        'src',
        'webview',
        'assets',
        'vscode.css'
      )
    )
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        'src',
        'webview',
        'assets',
        'main.css'
      )
    )
    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce()
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">

      <!--
        Use a content security policy to only allow loading styles from our extension directory,
        and only allow scripts that have a specific nonce.
        (See the 'webview-sample' extension sample for img-src content security policy examples)
      -->
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <link href="${styleResetUri}" rel="stylesheet">
      <link href="${styleVSCodeUri}" rel="stylesheet">
      <link href="${styleMainUri}" rel="stylesheet">

      <title>VS POP</title>
    </head>
    <body>
      <p><b>What progress did you make today?</b></p>
      <ul class="vspop-list">
        <li>Added docs for main functionality (<code>f8ejc</code>)</li>
        <li>Add filter functionality (<code>894uq</code>)</li>
        <li>Refactor components (<code>i347a</code>)</li>
      </ul>

      <button class="vspop-button">Get Commits</button>

      <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`
  }
}

PopViewProvider.viewType = 'vsPop.popView'

function getNonce() {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

exports.PopViewProvider = PopViewProvider
