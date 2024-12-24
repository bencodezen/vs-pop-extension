# Getting Started

This VS Code extension is not published yet, so you'll need to run it locally to try it out.

## 🧰 Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- Familiarity with basic [Git](https://git-scm.com/) commands

## 📖 Local Setup Instructions

1. Clone repository
   - `git clone https://github.com/bencodezen/vs-pop-extension.git`
2. Open project in VS Code
3. Open `extension.js`
4. Run `Debug: Start Debugging` command
   - Press `F5`
   - Run command from command palette
   - Use top navigation `Run > Start Debugging`
5. If a dropdown opens up to select the debugger context, select the one for `VS Code Extensions`
6. This should open up a debugger workspace in a new window
7. You should see a VS POP panel
8. Add a folder that is an existing git project to the debugger workspace
9. Add commits to the project which should trigger notifications that work is being tracked
10. Click "Get Commits" in the VS POP panel to see work that's been accomplished
11. This data should persist as you close the workspace and/or add new projects
