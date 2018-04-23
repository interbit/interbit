const generateDeploymentDetails = (chainManifest, covenants) => {
  console.log({ chainManifest, covenants })
  return {
    chains: Object.entries(chainManifest).reduce(
      (chains, [alias, chainData]) => ({
        ...chains,
        [alias]: chainData.chainId
      }),
      {}
    ),
    covenants
  }
}

module.exports = generateDeploymentDetails
