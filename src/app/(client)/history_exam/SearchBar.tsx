import React from "react";
import { Input, DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  dateRange: { start: string; end: string };
  onDateChange: (newRange: any) => void;
}

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  dateRange,
  onDateChange,
}: SearchBarProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex-grow mr-4">
        <Input
          className="w-full"
          placeholder="Tìm kiếm theo môn học, giảng viên, lớp..."
          size="lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <DateRangePicker
        isRequired
        className="max-w-xs"
        defaultValue={{
          start: parseDate(dateRange.start),
          end: parseDate(dateRange.end),
        }}
        onChange={onDateChange}
        label="Lọc ngày thi"
      />
    </div>
  );
};

export default SearchBar;
