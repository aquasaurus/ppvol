export default [{
  name: `Dashboard`,
  route: `/`,
  key: `dash`,
  icon: `grid`,
}, {
  name: "Reports",
  route: [{
    name: "Open Reports",
    route: "/reports/open",
    key: "open_reports",
  },
  {
    name: "Closed Reports",
    route: "/reports/closed",
    key: "closed_reports",
  }],
  key: "reports",
  icon: `file`,
}, {
  name: `Settings`,
  route: `/`,
  key: `settings`,
  icon: `settings`,
}];
