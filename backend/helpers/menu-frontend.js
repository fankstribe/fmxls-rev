const getMenuFrontend = (role = "USER_ROLE") => {
  const menu = [
    {
      name: "Home",
      icon: "ri-home-line sidemenu-icon ri-xl",
      link: "/home",
    },
    {
      name: "Profilo",
      icon: "ri-user-settings-line sidemenu-icon ri-xl",
      link: "/profile",
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu.unshift({
      name: "Admin",
      icon: "ri-settings-2-line sidemenu-icon ri-xl",
      link: "/admin-home",
    });
  }

  return menu;
};

const getMenuAdminFrontend = (role = "ADMIN_ROLE") => {
  const adminMenu = [
    {
      name: "Home",
      icon: "ri-home-line sidemenu-icon ri-xl",
      link: "/admin-home",
    },
    {
      name: "Utenti",
      icon: "ri-user-line sidemenu-icon ri-xl",
      link: "/admin-users",
    },
    {
      name: "Squadre",
      icon: "ri-t-shirt-2-line sidemenu-icon ri-xl",
      link: "/admin-teams",
    },
    {
      name: "Manager",
      icon: "ri-user-2-line sidemenu-icon ri-xl",
      link: "/admin-managers",
    },
    {
      name: "Tornei",
      icon: "ri-trophy-line sidemenu-icon ri-xl",
      link: "/admin-tournaments",
    },
    {
      name: "Giocatori",
      icon: "ri-team-line sidemenu-icon ri-xl",
      link: "/admin-players",
    },
  ];

  return adminMenu;
};

module.exports = {
  getMenuFrontend,
  getMenuAdminFrontend,
};
