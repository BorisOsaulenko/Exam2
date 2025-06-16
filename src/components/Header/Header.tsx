import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "./QueryContext";

export default function Header() {
  const { query, setQuery } = useQuery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">To-do list</h1>
        <div className="flex items-center border-b-1 border-b-white">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
            className="px-4 py-2 rounded-md text-white outline-none"
          />
          <MagnifyingGlassIcon className="w-6 h-6 text-white" />
        </div>
      </div>
    </header>
  );
}
