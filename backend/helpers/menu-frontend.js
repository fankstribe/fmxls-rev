const getMenuFrontend = (role = 'USER_ROLE') => {
  const menu = [
    {
      'name': 'Home',
      'icon': 'home',
      'link': '/home'
    },
    {
      'name': 'Profilo',
      'icon': 'person',
      'link': '/profile'
    }
  ]

  if (role === 'ADMIN_ROLE') {
    menu.unshift({
      'name': 'Admin',
      'icon': 'settings',
      'link': '/admin-home'
    })
  }

  return menu
}

module.exports = {
  getMenuFrontend
}
