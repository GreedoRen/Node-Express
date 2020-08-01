
getUser(1)
    .then(user => getRepositories(user.githubname))
    .then(repo => getCommits(repo[0]))
    .then(commits => console.log(commits))
    .catch(e => console.log(e))

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from DB...')
            resolve({ id: id, githubname: 'asdasdasd' })
        }, 2000)
    })
}

function getRepositories(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling github API...')
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling api')
            resolve(['commit'])
        }, 2000)
    })
}