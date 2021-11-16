# Webpack Module Federation with SystemJS Import Map

A simple example showing how a host can dynamically introduce MFs with shared dependencies using Webpack Module Federation.

## Features

- [x] Paths of the MFs are dynamically resolved already in the `runtimeEntry.js`
- [x] Can dynamically expand the list of available MFs by updating the import map
- [x] MFs can dynamically share the dependencies - either introducing new ones or leveraging existing ones
- [x] ...

## Running

You can run the sample on -nix systems by just executing

```sh
./run.sh
```

Otherwise, run from each directory (i.e., "app", "mf1", mf2") the following commands:

```sh
npm install
npm run build
npm run serve
```

Then you can open http://localhost:8080 to see the demo.

**Note**: The relevant content is exclusively noticable on the console. Make sure to open your browser's debugging tools to see them!

## License

This sample is released using the MIT license. For more information see the [license file](./LICENSE).
