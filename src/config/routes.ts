const Routes = {
  home: "/",
  auth: "/auth",
  information: "/information",
  support: "/support",
  meetBase: "/meet",
  meetRoom: (id: string) => `/meet/room?id=${id}`,
  meetEnd: "/meet/end",
};

export default Routes;
