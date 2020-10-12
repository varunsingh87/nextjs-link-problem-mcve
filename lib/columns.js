
/**
 * @returns { Array } An array of objects containing the data about each newspaper column
 */
export async function getColumnsData() {
  const res = await fetch(`https://the-lower-moreland-spectator.vercel.app/api/columns`)
  const json = await res.json()
  return JSON.stringify(json);
}

/**
 * @returns { Object } An object that contains a props object which contains columns property
 */
export async function getLayoutStaticProps() {
  const allColumnsData = getColumnsData();
  return {
    props: {
      columns: allColumnsData,
    },
  };
}

