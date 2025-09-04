import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search, Download } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  exportable?: boolean;
  onExport?: () => void;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  exportable = false,
  onExport,
  className = '',
  emptyMessage = 'No data available'
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    
    // Apply search filter
    if (searchTerm) {
      sortableData = sortableData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [data, sortConfig, searchTerm]);

  const getSortIcon = (columnKey: keyof T) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 text-text-secondary/50" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-primary" />
    ) : (
      <ChevronDown className="w-4 h-4 text-primary" />
    );
  };

  return (
    <div className={`bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card overflow-hidden ${className}`}>
      {/* Header with search and export */}
      {(searchable || exportable) && (
        <div className="p-lg border-b border-surface/30">
          <div className="flex items-center justify-between gap-md">
            {searchable && (
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-sm bg-background border border-surface/50 rounded-input text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary"
                />
              </div>
            )}
            {exportable && (
              <button
                onClick={onExport}
                className="flex items-center px-md py-sm bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-button text-primary transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Export</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface/30">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-lg py-md text-left text-sm font-medium text-text-secondary ${
                    column.sortable ? 'cursor-pointer hover:text-text-primary' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.label}</span>
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-lg py-xl text-center text-text-secondary"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-surface/30 hover:bg-surface/20 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-lg py-md text-sm text-text-primary">
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] || '-')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with row count */}
      {sortedData.length > 0 && (
        <div className="px-lg py-md border-t border-surface/30 text-xs text-text-secondary">
          Showing {sortedData.length} of {data.length} entries
          {searchTerm && ` (filtered)`}
        </div>
      )}
    </div>
  );
}
