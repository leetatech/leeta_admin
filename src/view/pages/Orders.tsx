import React, { useState } from 'react';
import Typography from '../components/Typography/Typography';
import { TypographyVariant } from '../components/types';
import { useIcons } from '../../hooks/useIcons';
import AcceptOrder from '../components/accepttOrder';
import DeclineRequest from '../components/declineRequest';

interface RowData {
  id: number;
  customer: string;
  date: string;
  details: string;
}

const data: RowData[] = [
  { id: 1, customer: 'John Doe', date: '2024-12-20', details: 'Order #123' },
  { id: 2, customer: 'Jane Smith', date: '2024-12-19', details: 'Order #456' },
  { id: 3, customer: 'Smith Johnson', date: '2024-12-18', details: 'Order #789' },
  { id: 4, customer: 'John Doe', date: '2024-12-20', details: 'Order #123' },
  { id: 5, customer: 'Doe Smith', date: '2024-12-19', details: 'Order #456' },
  { id: 6, customer: 'Alice Johnson', date: '2024-12-18', details: 'Order #789' },
  { id: 7, customer: 'Alice Joel', date: '2024-12-18', details: 'Order #789' },
  { id: 8, customer: 'Jane Joel', date: '2024-12-18', details: 'Order #789' },
];

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issModalOpen, setIssModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const { arrows, filter, phone, mail, avatar, side } = useIcons();
  const [activeTab, setActiveTab] = useState('New');

  // Tab data
  const tabs = [
    { name: 'New', count: 18 },
    { name: 'Pending', count: 3 },
    { name: 'Completed', count: 8 },
    { name: 'Cancelled', count: 7 },
  ];

  const handleHeaderCheckboxChange = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowCheckboxChange = (id: number, checked: boolean) => {
    setSelectedRows((prev) => (checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)));
  };

  const handleDetailsClick = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
    if (!selectedRows.includes(id)) {
      setSelectedRows((prev) => [...prev, id]);
    }
  };

  const handleCloseDetails = () => setExpandedRow(null);

  const handleDecline = () => {
    // Handle decline logic here
    setIsModalOpen(false);
  };

  return (
    <div className='p-4'>
      <Typography variant={TypographyVariant.TITLE}>Order Details</Typography>
      <div className='border-b-[0.2px] border-[#EAECF0] mt-4'>
        <div className='flex space-x-4'>
          {tabs.map((tab) => (
            <div
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`cursor-pointer py-2 px-4 text-sm font-medium ${activeTab === tab.name ? 'border-b-2 border-[#141388] text-[#141388]' : 'text-gray-500'}`}
            >
              {tab.name} ({tab.count})
            </div>
          ))}
        </div>
      </div>
      <div className='mt-4 mb-4'>
        <div className='flex justify-end gap-2'>
          <button className='flex items-center gap-2 px-2 py-1 border border-[#EAECF0] text-[12px] rounded'>
            <img src={arrows} alt='Icon' className='w-4 h-4' />
            <span className='text-gray-800'>Sort by</span>
          </button>
          <button className='flex items-center gap-2 px-2 py-1 border border-[#EAECF0] text-[12px] rounded'>
            <img src={filter} alt='Icon' className='w-4 h-4' />
            <span className='text-gray-800'>Filter</span>
          </button>
        </div>
      </div>
      <div className='flex'>
        {/* Truncated Table */}
        <div className={`transition-all duration-300 ${expandedRow ? 'w-[30%]' : 'w-full'}`}>
          <table className='w-full border-collapse'>
            <thead className='bg-white'>
              <tr>
                <th className='border-b border-[#EAECF0] p-2 text-left w-12'>
                  <input type='checkbox' checked={selectedRows.length === data.length} onChange={(e) => handleHeaderCheckboxChange(e.target.checked)} />
                </th>
                <th className='border-b border-[#EAECF0] p-2 text-left'>Customer</th>
                {!expandedRow && (
                  <>
                    <th className='border-b border-[#EAECF0] p-2 text-left'>Date</th>
                    <th className='border-b border-[#EAECF0] p-2 text-left'>Details</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <React.Fragment key={row.id}>
                  <tr className={`${expandedRow === row.id ? 'bg-[#EAECF0]' : 'hover:bg-[#EAECF0] transition'}`}>
                    <td className='border-b border-[#EAECF0] p-2'>
                      <input type='checkbox' checked={selectedRows.includes(row.id)} onChange={(e) => handleRowCheckboxChange(row.id, e.target.checked)} />
                    </td>
                    <td className='border-b border-[#EAECF0] p-2'>
                      {row.customer} {!expandedRow && 'placed a new order for “Gas Cylinders”'}
                    </td>
                    {!expandedRow && (
                      <>
                        <td className='border-b border-[#EAECF0] p-2'>{row.date}</td>
                        <td className='border-b border-[#EAECF0] p-2'>
                          <button className='flex gap-4 items-center' onClick={() => handleDetailsClick(row.id)}>
                            View Order Details <img src={side} alt='arrow' />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {/* Detailed Content Div */}
        {expandedRow && (
          <div className='w-[70%] h-[70vh] bg-gray-100 p-6 border border-[#EAECF0] transition-transform duration-300 ease-in-out' style={{ overflowY: 'auto' }}>
            <Typography variant={TypographyVariant.SUBTITLE} className='font-bold text-lg'>
              Customer Details
            </Typography>
            <div className='flex gap-2 items-center mt-2'>
              <img src={avatar} alt='name' className='h-4 w-4' />
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>{data.find((row) => row.id === expandedRow)?.customer}</Typography>
            </div>
            <div className='flex gap-2 items-center mt-2'>
              <img src={phone} alt='phone' className='h-4 w-4' />
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>08100456789</Typography>
            </div>
            <div className='flex gap-2 items-center mt-2'>
              <img src={mail} alt='mail' className='h-4 w-4' />
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                {data
                  .find((row) => row.id === expandedRow)
                  ?.customer.split(' ')
                  .join('')}
                @gmail.com
              </Typography>
            </div>
            <div className='flex gap-2 items-center mt-2 mb-8'>
              <img src={mail} alt='address' className='h-4 w-4' />
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>23 bolanle Street, Ifako, Lagos</Typography>
            </div>

            <p className='text-black text-[14px] font-bold'>Ordered Items</p>
            <div className='p-2'>
              <div className='flex p-1 justify-between border-b border-[#EAECF0]'>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>3KG LPG</Typography>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>19,000.00</Typography>
              </div>
              <div className='flex p-1 justify-between border-b border-[#EAECF0]'>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Gas Cylinder</Typography>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>9,800.00</Typography>
              </div>
              <div className='flex p-1 mb-8 justify-between border-b border-[#EAECF0]'>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Gas Burner</Typography>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>4,200.00</Typography>
              </div>
              <div className='flex p-1 justify-between'>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Subtotal</Typography>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>34.000.00</Typography>
              </div>
              <div className='flex p-1 justify-between'>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Delivery Fee</Typography>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>560.00</Typography>
              </div>
              <div className='flex p-1 justify-between'>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>VAT</Typography>
                <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>560.00</Typography>
              </div>
              <div className='flex p-1 justify-between'>
                <p className='font-bold text-14px'>Total</p>
                <p className='text-[#3EAF3F] leading-[26px] font-medium'>34,560.00</p>
              </div>
            </div>
            <div className='flex justify-center gap-40 mt-2 mb-2'>
              <button 
                className='border border-[#EF0F30] bg-red-100 text-[#EF0F30] px-14 py-2'
                onClick={() => setIsModalOpen(true)}
              >
                Decline
              </button>
              <button
              onClick={() => setIssModalOpen(true)}
               className='bg-[#3EAF3F] text-white px-14 py-2'>Accept</button>
            </div>
            <DeclineRequest 
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onDecline={handleDecline}
            />
            <AcceptOrder 
              isOpen={issModalOpen}
              onClose={() => setIssModalOpen(false)}
            />
            <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' onClick={handleCloseDetails}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
