const RegionSelector = ({ regions, onSelect }) => {
  return (
    <select onChange={(e) => {
      const selected = regions.find(region => region.id === parseInt(e.target.value));
      onSelect(selected);
    }}>
      <option value="">Select a region</option>
      {regions.map(region => (
        <option key={region.id} value={region.id}>{region.name}</option>
      ))}
    </select>
  );
};
export default RegionSelector;