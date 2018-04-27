# Final configured state of the Interbit Platform
We will be running all of our infrastructure on blockchains ASAP.
This will result in multiple breaches occuring during Phase 1.

Damage is speed, but we cannot lose control of our main sites.

Hence, the face of our company will be static sites, and hosted entirely separately from the places of turmoil

## Common to all sites:
- Cloudflare does caching for all sites except doc
- Heroku pipelines manage staging review, the promotion to prod
- Amazon infrastructure does not host our main sites
- We gradually cut these sites over to running on our own AWS servers

## [https://interbit.io](https://interbit.io)
- cloudflare does the caching
- static website with no blockchain
- built using CRA

## [https://test-interbit.io](https://test-interbit.io)
- redirect to [https://interbit.io](https://interbit.io)

## docs
- [https://docs.test-interbit.io](https://docs.test-interbit.io)
- [https://docs.interbit.io](https://docs.interbit.io)
- all documentation for the interbit platform

## store
- [https://store.test-interbit.io](https://store.test-interbit.io)
- [https://store.interbit.io](https://store.interbit.io)
- All apps available for demo 

## hosting
- [https://hosting.test-interbit.io](https://hosting.test-interbit.io)
- [https://hosting.interbit.io](https://hosting.interbit.io)
- Where user code is hosted by us

## examples
- (todo)
