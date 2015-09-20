export default function awaitableVersionOf(nodeFunction, context) {
  return (...args) => new Promise((resolve, reject) => {
    nodeFunction.call(
      context,
      ...args,
      (error, ...cbArgs) => error ? reject(error) : resolve(...cbArgs)
    );
  });
}
