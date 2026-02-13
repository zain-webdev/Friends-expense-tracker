export default function ItemChips() {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button type="button" className="item-chip flex items-center gap-2">
        <span></span><span>Milk</span>
      </button>
      <button type="button" className="item-chip flex items-center gap-2">
        <span></span><span>Egg</span>
      </button>
      <button type="button" className="item-chip flex items-center gap-2">
        <span></span><span>Pizza</span>
      </button>
      <button type="button" className="item-chip flex items-center gap-2">
        <span></span><span>Bread</span>
      </button>
      <button type="button" className="item-chip flex items-center gap-2">
        <span></span><span>Sugar</span>
      </button>
    </div>
  );
}
