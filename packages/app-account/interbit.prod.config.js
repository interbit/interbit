const path = require('path')
const chainAliases = require('./src/constants/chainAliases')

const PUB_KEY =
  'xsBRBVsO7kUBAAABBwgAqN2q5N2ek1+y3c5KbxID4Yy9XEskqeQlvGW2u2krDIcMJnjdPZUg0QBhzbFYTP91ycDig+rPNMvXdlcO+6DOd18QYG2Y/NABF0Fq\nDlSCL2hSviPsROxA4mIUzq8gJhna3Pu8l2cJz8Fzh8znFFgvlCmUl68nwyBD\nhAwr+PGaBiJHb7qThzXrOlhh8QCZ90fu+oB/RIqqJ11gfya9pqSOzm6B0klR\np3EPr7JhhffyhnAKG3L0ZCo2FSvifapLyCrfZYGhQTpg139CmO3y84bCMJh7\negxB7V/swWUiMWX/dNEZ9YQpo7jof51kukCV/4/8zkrv8AfAiIfoV963Urba\n3QARAQABzQtpbmZvQGJ0bC5jb8LAkgQQAQgARgUCWw7uRQYLCQcIAwIEFQgK\nAgMWAgECGQECGwMCHgciIQWBK60j+nW4p98x3xzEchKjqxYt4eYzEQkr5JSK\n/I9FdAMiAQIAADGkCACda1xeQiYmMapjNG97AwCvbrqwNMaRonhritTshUsT\nH2b0WlBbkSjd+dBavYGi2HAqYQpzQMcDA+03ZbVtb8xblF6oC73xgxOArTmH\nrBG+3+kMd7XxPlu7uSmHYvqK4i9l2gf3JPxUJxQpQiTCjFp7OqH+r9TxmwKZ\nJ4dOhLqaFkXqK2iK9RvqI85U0cvion1UsncKAFQHHNz02kJylVnGjikk/2uo\nNgFAO7ZjRD51YkL86ibMqIsNa1KUabbu1CsybBtTTRc0B+IojNr1tUQlbkT3\nXqznzu6WZnwQ3KLNj2urgid5QaP6scGkJQlA0dz/d4zCQmjTU3oqNuqaXuVn\nzsBRBVsO7kUBAAABBwgAo/1FlJrgdUETUMsT7M2kBPoY4MFFTOfSO3zu2hJ9\nycqT5SeuxegRlZNNmKrdc0sH0kFPczCiCtr2IzRdMJUOEsK81fDIFkKr/2fv\nds47TC2umWiRZDcoZgitLuS0lvo3oM5UYGN1R2wWp9VLUg8QhN7DGh2pJ4CH\nlc7j7CHdt0w4vpu5JCyaNFDvltOd1V8shCja30qn5Aa7lq1RoND5LCZxjW4o\nz8FjWBNPDU8mAGw3mcxrfbUlhLyktIQH3qHp+9yfPEzyjYhTbDulZPvy7QBv\nLcaglvtiL3dRQJ5iZaU2OZasbQT0S57a2THJTIXkyMJ1dZ7flHk8N0XM4Dtu\n4QARAQABwsB4BBgBCAAsBQJbDu5FAhsMIiEFgSutI/p1uKffMd8cxHISo6sW\nLeHmMxEJK+SUivyPRXQAANidB/9IYSyiL8ErCHp3wY5xGFkBzHGEbK5ahsnd\nt4DtR82p3j2Coakurf0GiO83aoq/LHOxJ1fs4XvsP6dJ+WFyrqOlXNuR9kf1\n++I7BbHtkMT+z2iMl+PlrPqZEyjbfz+9hfUPl0G8VpUOnwFPpcdFGzI1LCmW\n6vH4EhEX9jedZ6MgitP0r0w8XMO2ene5bKWaaACIzZAVvK1wFW1c1EgLZWVL\nK4r/Mx1TMfnkFaKAfy5JEzLcoqb/YP9QWuwb749VEKETEpqynakfveiBxbTq\nRJEcw3Oc8OuTP/i4U7qaGB3H7lJHmj+l3UiUNe8f51m0X5/0SGbP+GyZSgKT\n5FZBQGkS'
const WEB_AUTH_PUB_KEY =
  'xsBRBVsO7cwBAAABBwgAgwPnHpcAYGs0GSlskCrueNHkgCIcxKfIcMR0iDvHoxPqmyYiB4l7CDT9dWLeNko9KdrZ96mliRc3OLNXERlw8xUy6Z9nybyvDR/U\n4rwXRMAt+sYkw7F8JYujprnZmnLwTxm7iuB5j8ZyE8dmB6U+WATVuTEJr8zv\n+WHU+UapPd5yXGhtdI54R1pPFFI+9eEJvEqeB+DRFdxX0jvMtX716NZHdvUs\n7Zp9YsCR/QgQX5To5+w37y+jFt2HvO2xLpF+D8bQsWtIWLEmZrqYCN/OPzpi\nb85yulobXoISLLLmcy1//kUyOIig8Xo721tB4LVg3XSJ/KByHQpy84bWYLv9\nWwARAQABzQtpbmZvQGJ0bC5jb8LAkgQQAQgARgUCWw7tzAYLCQcIAwIEFQgK\nAgMWAgECGQECGwMCHgciIQWAdH0GvorSpH0z4zV1ZdRSCDmV4vY9O0MTZAMX\nOwnWGgMiAQIAAA/MB/9d406KqdgjHPWXu3+zIhzije8fMOyIPAhHjO06JRKG\nWqQGUxTglwAXeQE/MTXktijuI5NjkSzUiK+xZhbWM2A2EzEZgv9LSou9XZqT\nW+tm7Vrtro13SWNVm6TiXG4MiCdLNfGXE8q6RK/6R5O+6nfFamX2Jyq7uW1c\n/q89d8RMjNeaeiGhN3LEo2FegD/aHYXfS4u6kyrU2B64NlKDCSIn6QgCiUzf\nfdA3zgkw9a2ZRLSf+QUIrwjHQdq0+HLfAXVdfJYlbSn/E4YMzsaFaTXD06C0\nElaUUDXStS3wr9WSa4hr0631R5Ykk/LwbftDclsoHU7SuqOSvphlCVwnAvou\nzsBRBVsO7cwBAAABBwgAloIcqoJc8+xzN5h+XPjxrpqB5VhSJEOav8oiAOoO\nAgfF5ncoN+CG46sbq+awbxc6xcB222DBCXUsAhHolOb04CJe9QrC/brQ8z8L\neo236GyZfjgMeddw0KiWQ4bRD612PiqZ8CXhElviyPv+ynn5gOaHRRlVMexR\nYLw3IBcadJMqCDHILBzSRsGZGwoeFn07r7+K/horuW9a4enRzEYgAu0dWvLG\nYe51s1io+dbgpQvcQCf6izpaAOH2BMREYTMrqn6U3XaJ2hC/poIu6VxEmkJO\n7BiA0hyjE3fa3e0dUp0zVSPCPmtjs64KPhMFaKEk2Eg/93VWlK3E0CCYPU95\n/wARAQABwsB4BBgBCAAsBQJbDu3MAhsMIiEFgHR9Br6K0qR9M+M1dWXUUgg5\nleL2PTtDE2QDFzsJ1hoAAKhRB/sGrNVKCZhfhkm5S4LCZ3jT2fC2DM5v+b8l\nJ47hC8WP08uIc8H4ymoiTuhd/vfsdQldxtiEc9zyxf59Vm9ybNyG+g/Qf4UQ\ndblZPxzKca54tdzqFulrgAdWo/JbQgqF6gfyOccpINvMHBp87uobv11Kw2Pi\nwvzRFzprMUYRdYBRQjzjbnE53jgJUrBhmZs2rpPdGv+IsOWe/KwYNflXHFR5\nPWaQHAi30vYKZB1wN8WrclaIG58MkbTWsvoxJ2sQgGUjI0imBQ//y60noPxS\njwMZg7T8kb11qpx76V08M6oc+9MmznpKdpUi/fqEe2lVnRyAmPMDBcSXCsi/\nWqEmUp9L'

const config = {
  peers: [
    'ib-dev----master.herokuapp.com:443',
    'ib-dev-web-auth.herokuapp.com:443'
  ],
  adminValidators: [PUB_KEY, WEB_AUTH_PUB_KEY],
  staticChains: {
    [chainAliases.CONTROL]: {
      covenant: 'app-account-control',
      config: {
        validators: [PUB_KEY, WEB_AUTH_PUB_KEY],
        joins: {
          provide: [
            {
              alias: chainAliases.PUBLIC,
              path: ['privateChainHosting', 'shared'],
              joinName: 'HOSTING_SPONSOR'
            }
          ]
        }
      }
    },
    [chainAliases.PUBLIC]: {
      covenant: 'app-account-public',
      config: {
        validators: [PUB_KEY],
        joins: {
          consume: [
            {
              alias: chainAliases.GITHUB,
              path: ['identityProviders', 'oauth', 'gitHub'],
              joinName: 'OAUTH-CONFIG-GITHUB'
            },
            {
              alias: chainAliases.CONTROL,
              path: ['privateChainHosting'],
              joinName: 'HOSTING_SPONSOR'
            }
          ]
        }
      }
    },
    [chainAliases.GITHUB]: {
      covenant: 'app-account-github-kyc',
      config: {
        validators: [PUB_KEY, WEB_AUTH_PUB_KEY],
        joins: {
          provide: [
            {
              alias: chainAliases.PUBLIC,
              path: ['oAuth', 'shared'],
              joinName: 'OAUTH-CONFIG-GITHUB'
            }
          ]
        }
      }
    }
  },
  covenants: {
    'app-account-my-account': {
      location: path.join(__dirname, 'src/interbit/my-account')
    },
    'app-account-public': {
      location: path.join(__dirname, 'src/interbit/public')
    },
    'app-account-control': {
      location: path.join(__dirname, 'src/interbit/control')
    },
    'app-account-github-kyc': {
      location: path.join(__dirname, 'src/interbit/github-kyc')
    }
  },
  apps: {
    account: {
      peers: ['ib-dev----master.herokuapp.com'], // the peers the browser should connect to
      chains: [chainAliases.PUBLIC], // the chains that need to load in the browser
      appChain: chainAliases.PUBLIC, // The chain that the static page is loaded on
      indexLocation: path.join(__dirname, 'public/index.html'), // the index.html to update with the app info
      buildLocation: path.join(__dirname, 'build/') // the location of the finished build to update
    }
  }
}

module.exports = config
