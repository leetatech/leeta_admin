import type React from "react"

interface PaginationSizeDropdownProps {
  pageSize: number
  onChange: (size: number) => void
}

const PaginationSizeDropdown: React.FC<PaginationSizeDropdownProps> = ({ pageSize, onChange }) => {
  return (
    <select
      className="px-2 py-1 border border-[#EAECF0] text-[12px] rounded"
      value={pageSize}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value={5}>5 per page</option>
      <option value={10}>10 per page</option>
      <option value={25}>25 per page</option>
      <option value={50}>50 per page</option>
      <option value={100}>100 per page</option>
      <option value={500}>500 per page</option>
    </select>
  )
  
}


export default PaginationSizeDropdown

