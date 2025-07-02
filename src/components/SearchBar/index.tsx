import Button from '../Button';
import './styles.scss';
import { SearchBarProps } from './types';

const SearchBar = ({ searchTerm, onSearch, onAddNew }: SearchBarProps) => {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search tasks..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value || '')}
      />
      <Button onClick={onAddNew}>Add New</Button>
    </div>
  );
};

export default SearchBar;
