function addCommit(context, commit) {
  const commits = context.globalState.get('commits') || []
  commits.push(commit)
  context.globalState.update('commits', commits)
  console.log('📝 Commit added:', context.globalState)
}

module.exports = {
  addCommit
}
