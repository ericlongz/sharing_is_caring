const { authenticate } = require('ldap-authentication')

async function auth() {
    // auth with admin
    let options = {
      ldapOpts: {
        url: 'ldap://ldap.forumsys.com',
        // tlsOptions: { rejectUnauthorized: false }
      },
      adminDn: 'cn=read-only-admin,dc=example,dc=com',
      adminPassword: 'password',
      userPassword: 'password',
      userSearchBase: 'dc=example,dc=com',
      usernameAttribute: 'uid',
      username: 'gauss',
      // starttls: false
    }
  
    let user = await authenticate(options)
    console.log(user)
  
    // auth with regular user
    options = {
      ldapOpts: {
        url: 'ldap://ldap.forumsys.com',
        // tlsOptions: { rejectUnauthorized: false }
      },
      userDn: 'uid=einstein,dc=example,dc=com',
      userPassword: 'password',
      userSearchBase: 'dc=example,dc=com',
      usernameAttribute: 'uid',
      username: 'einstein',
      // starttls: false
    }
  
    user = await authenticate(options)
    console.log(user)
  }
  
  auth()