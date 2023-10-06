export function getRuneData(runeJSON, idSearched) {
  let nameFound = null;
  let descFound = null;

  runeJSON.forEach(({ runes }) =>
    runes.forEach(({ id, name, longDesc }) => {
      if (id === idSearched) {
        nameFound = name;
        descFound = longDesc;
      }
    })
  );

  return [nameFound, descFound];
}
