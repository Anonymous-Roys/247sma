import { Input } from '@/shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="w-full max-w-md mb-4">
      <Input
        type="text"
        placeholder="Search by customer or product..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

interface FilterOptionsProps {
  onFilter: (filters: any) => void;
}

export function FilterOptions({ onFilter }: FilterOptionsProps) {
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const handleFilter = () => {
    onFilter({
      status,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
  };

  const handleReset = () => {
    setStatus('');
    setStartDate(undefined);
    setEndDate(undefined);
    onFilter({});
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
          <SelectItem value="refunded">Refunded</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {startDate ? format(startDate, 'PPP') : <span>Start Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {/* <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
            initialFocus
          /> */}
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {endDate ? format(endDate, 'PPP') : <span>End Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {/* <Calendar
            mode="single"
            selected={endDate}
            onSelect={setEndDate}
            initialFocus
          /> */}
        </PopoverContent>
      </Popover>

      <Button className='bg-green-500' onClick={handleFilter}>Apply Filters</Button>
      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}