# `constants`

A handy set of constants in an object to keep references simple

  1. `ROOT_CHAIN_ALIAS`: *(String)* The friendly name for the root chain
  1. `joinTypes`: *(Object)* A set of constants to define join types consistently
    1. `PROVIDE`: *(String)* A friendly constant for the provider join type
    1. `CONSUME`: *(String)* A friendly constant for the consumer join type
    1. `SEND`: *(String)* A friendly constant for the send actions join type
    1. `RECEIVE`: *(String)* A friendly constant for the receive actions join type

#### Tips

 - The [Root Chain](../../chain-management/cascading-deployment.md) is an (unimplemented) feature that can handle deploying and updating your entire network from built manifests. Coming soon to a blockchain near you!