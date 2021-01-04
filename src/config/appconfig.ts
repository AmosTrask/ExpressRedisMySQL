import path from "path";

const config = {
  logs : {
    maxFiles: 5,
    maxSize: 5242880, // 5MB
    path: path.normalize(__dirname + "/../../logs"),
  },
  node_env: "development",
  supervision: {
    getEquipments: {
      DevenvGroup: "DEVENV",
      count: 500,
      offset: 0,
      search: "globe",
    },
  },
  urls: {
    cloudAccess: "https://cloudaccess.cloudrun.3ds.com",
    supppd: "https://eu2-supppd-realtime.3dexperience.3ds.com/supervision/api/v4",
    supppdAuth: "https://eu2-supppd-realtime.3dexperience.3ds.com/react",
    supprod: "https://eu2-supprd-realtime.3dexperience.3ds.com/supervision/api/v3",
    supprodAuth: "https://eu2-supprd-realtime.3dexperience.3ds.com/react",
    supstg: "https://eu2-supstg-realtime.3dx-staging.3ds.com/supervision/api/v4",
    supstgAuth: "https://eu2-supstg-realtime.3dx-staging.3ds.com/react",
  },
};

process.env.NODE_ENV = process.env.NODE_ENV || config.node_env;

export default config;
