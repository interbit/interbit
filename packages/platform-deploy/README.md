# BOOT PLATFORM

## Need a keypair?

`interbit keys --filename keys.json`

Don't forget to put these pubkeys in your config before you build and in your hypervisor when you deploy! (And in process.env.PUBLIC_KEY/PRIVATE_KEY on your servers)

## Need a manifest?

`interbit build --config interbit.config.js`

## Want to boot a node, hot shot?

`interbit deploy --key-pair keys.json`

See how I didn't forget my keys? That means we can BLOCK. :+1:
