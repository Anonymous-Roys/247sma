
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useEffect, useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

interface FilterOptionsProps {
  onFilter: (filter: {
    status: string;
    startDate: string;
    endDate: string;
    category: string;
  }) => void;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

//search
export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()=>{
    onSearch(searchTerm);  
    console.log(searchTerm)
  }, [searchTerm]);


  return (
    <div className="flex mb-2 space-x-2">
      <Input
        type="text"
        placeholder="Search orders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
      />
      <Button className=" bg-80-hover hover:bg-green-800">Search</Button>
    </div>
  );
};


export const FilterOptions: React.FC<FilterOptionsProps> = ({ onFilter }) => {
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(()=>{ 
    onFilter({ status, startDate, endDate, category });
  }, [status, startDate, endDate, category])
 

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center space-x-2">
        <select
          id="status"
          className="px-4 py-1 text-sm border rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-80-hover"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="start-date" className='text-sm'>Start Date:</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="py-1 text-sm border rounded-md bg-slate-100 focus:ring-80-hover focus:ring-2 focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-1">
        <label htmlFor="end-date" className='w-full text-sm'>End Date:</label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="py-1 text-sm border rounded-md bg-slate-100 focus:ring-80-hover focus:ring-2 focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-1">
        <select
          id="category"
          className="px-4 py-1 text-sm border rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-80-hover"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="produce">Produce</option>
          <option value="livestock">Livestock</option>
          <option value="dairy">Dairy</option>
        </select>
      </div>
    </div>
  );
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4">
      <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
              page === currentPage
                ? 'z-10 bg-blue-50 border-blue-500 text-green-600'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Next</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

