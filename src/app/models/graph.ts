export interface Graphs {
  graphs: Graph[];
}

export interface Graph {
  id: string;
  name: string;
  unit: string;
  type: string;
  color: string;
  //   timezone: string;
  //   purgeCacheURLs: null;
  //   selfSufficient: string;
  //   isSecret: boolean;
  //   publishOptionalData: boolean;
}
