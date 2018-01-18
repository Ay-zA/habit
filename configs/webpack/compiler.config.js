export const compilerOpts = {
  stats: {
    colors: true,
    assets: false,
    hash: false,
    version: false,
    timings: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: false,
    warnings: true,
    publicPath: false,
    chunkModules: false
  }
};

export const hotOpts = { log: () => { } };
