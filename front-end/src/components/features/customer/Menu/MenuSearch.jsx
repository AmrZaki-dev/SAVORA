import SearchBar from "../../../common/molecules/SearchBar";

export default function MenuSearch({ search, onSearchChange, onClear }) {
  return (
    <SearchBar
      value={search}
      onChange={onSearchChange}
      onClear={onClear}
      placeholder="Search for dishes..."
      theme="light"
      className="mx-auto mb-10 max-w-xl"
    />
  );
}
