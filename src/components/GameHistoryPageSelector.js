import PageSelectorSVG from "../assets/page-selector.svg";

function PageSelector({
  handleSwitchPage,
  pageIndex,
  previousPageIndex,
  bgColor,
}) {
  return (
    <img
      className="page-selector"
      onClick={() => handleSwitchPage(pageIndex, previousPageIndex)}
      style={{ backgroundColor: bgColor }}
      src={PageSelectorSVG}
      alt="page-selector-button"
    />
  );
}

export default PageSelector;
