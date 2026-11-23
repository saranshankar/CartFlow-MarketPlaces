import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Headphones, Briefcase } from 'lucide-react';
import { getSearchSuggestions } from '../../utils/search';
import { formatCurrency } from '../../utils/currency';
import { Product } from '../../types';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  placeholder = 'Search electronics, backpacks, audio essentials...',
}) => {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const suggestions: Product[] = query.trim() ? getSearchSuggestions(query) : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsOpen(false);
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/explore?q=${encodeURIComponent(trimmed)}&dept=${encodeURIComponent(department)}`);
    } else {
      navigate('/explore');
    }
  };

  const handleSelectProduct = (product: Product) => {
    setQuery(product.name);
    setIsOpen(false);
    navigate(`/explore?q=${encodeURIComponent(product.name)}`);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    if (inputRef.current) inputRef.current.focus();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen && suggestions.length > 0) {
        setIsOpen(true);
      }
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        e.preventDefault();
        handleSelectProduct(suggestions[selectedIndex]);
      } else {
        handleSearchSubmit();
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form
        role="search"
        aria-label="Marketplace product search"
        onSubmit={handleSearchSubmit}
        className="relative flex items-center w-full bg-white rounded-full border border-slate-200 shadow-warm-sm hover:border-slate-300 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all"
      >
        {/* Category Filter Dropdown */}
        <div className="hidden sm:flex items-center pl-3.5 pr-1 py-1.5 border-r border-slate-200">
          <label htmlFor="search-department" className="sr-only">
            Select Department
          </label>
          <select
            id="search-department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-transparent cursor-pointer focus:outline-none pr-1"
          >
            <option value="all">All Departments</option>
            <option value="electronics">Electronics & Audio</option>
            <option value="accessories">Bags & Carry</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => {
              if (query.trim()) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search marketplace products"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="search-autocomplete-list"
            data-testid="search-input"
            className="w-full py-2.5 pl-3.5 pr-8 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent border-0 focus:outline-none focus:ring-0"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search input"
              data-testid="clear-search-button"
              className="absolute right-2 p-1 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Search Action Button */}
        <button
          type="submit"
          aria-label="Submit search"
          data-testid="search-button"
          className="flex items-center justify-center px-4 py-2.5 mr-1 rounded-full bg-meridian-900 hover:bg-meridian-950 text-white transition-all shadow-warm-sm active:scale-95"
        >
          <Search className="w-4 h-4 text-cyan-400" aria-hidden="true" />
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div
          id="search-autocomplete-list"
          role="listbox"
          data-testid="search-autocomplete"
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-fadeIn"
        >
          {suggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex justify-between items-center">
                <span>Matching Products</span>
                <span className="text-cyan-600 font-semibold">{suggestions.length} found</span>
              </div>
              <ul className="divide-y divide-slate-100">
                {suggestions.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      data-testid={`autocomplete-item-${item.id}`}
                      onClick={() => handleSelectProduct(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected ? 'bg-cyan-50/70 text-meridian-950' : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-meridian-900">
                          {item.id === 'prod-aero-headphones' ? (
                            <Headphones className="w-4 h-4 text-cyan-600" />
                          ) : (
                            <Briefcase className="w-4 h-4 text-cyan-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-bold text-meridian-950 block truncate font-display">
                            {item.name}
                          </span>
                          <span className="text-xs text-slate-400 block truncate">
                            {item.category} • In Stock
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-extrabold text-meridian-950 tabular-nums">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Press <strong>Enter</strong> to view all results</span>
                <span>Press <strong>Esc</strong> to dismiss</span>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 space-y-1">
              <p className="text-xs font-bold text-slate-700">No matching products found</p>
              <p className="text-[11px] text-slate-400">
                Try searching for &quot;headphones&quot;, &quot;backpack&quot;, or browse by department.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
