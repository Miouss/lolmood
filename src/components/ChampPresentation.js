function ChampPresentation({ champName }) {
  const champImg = require(`../assets/loldata/img/champion/loading/${champName}_0.jpg`);

  return (
    <div id="champ-frame">
      <img src={champImg} alt="champImg" />
    </div>
  );
}

export default ChampPresentation;
