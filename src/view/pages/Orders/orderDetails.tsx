import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import Typography from "../../components/Typography/Typography";
import { TypographyVariant } from "../../components/types";
import Pill from "../../components/Pill";
import DeclineRequest from "../../components/declineRequest";
import AcceptOrder from "../../components/acceptOrder";
import { Spinner } from "../../components/Spinner";
import {Order} from "./types"
import { motion } from "framer-motion";

const slideInVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 20 }
  },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } }
};

interface OrderDetailsProps {
  expandedRow: number | null;
  setExpandedRow: (id: number | null) => void;
  details: Order;
  handleOrderStatus: (status: string, reason?: string) => void;
  orderUpdateLoading: boolean;
  icons: {
    phone: string;
    mail: string;
    avatar: string;
  };
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
                                                     setExpandedRow,
                                                     details,
                                                     handleOrderStatus,
                                                     orderUpdateLoading,
                                                     icons,
                                                   }) => {
  const [isDeclineModalOpen, setIsDeclineModalOpen] = React.useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = React.useState(false);

  if (!details) return null;

  const handleCloseDetails = () => setExpandedRow(null);

  const subtotal = details.orders?.reduce((sum, item) => sum + item.cost, 0) || 0;

  return (
    <motion.div
      className="fixed top-0 right-0 z-50 h-screen w-[90%] max-w-5xl bg-white shadow-lg rounded-l-md p-6 overflow-y-auto"
      variants={slideInVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex justify-between items-center pr-4 mb-4">
        <Typography variant={TypographyVariant.SUBTITLE} className="font-bold text-lg">
          Customer Details
        </Typography>
        <span className="flex gap-2 items-center">
          <Pill text={details.status} />
          <MdOutlineClose className="cursor-pointer text-xl" onClick={handleCloseDetails} />
        </span>
      </div>

      {/* Customer Info */}
      <div className="space-y-3 mb-6">
        <div className="flex gap-2 items-center">
          <img src={icons.avatar} alt="name" className="h-4 w-4" />
          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
            {details.delivery_details.name}
          </Typography>
        </div>
        <div className="flex gap-2 items-center">
          <img src={icons.phone} alt="phone" className="h-4 w-4" />
          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
            {details.delivery_details.phone}
          </Typography>
        </div>
        <div className="flex gap-2 items-center">
          <img src={icons.mail} alt="mail" className="h-4 w-4" />
          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
            {details.delivery_details.email}
          </Typography>
        </div>
        <div className="flex gap-2 items-center">
          <IoLocationOutline color="#1D2939" />
          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
            {details.delivery_details.address?.full_address}
          </Typography>
        </div>
      </div>

      {/* Ordered Items */}
      <p className="text-black text-[14px] font-bold mb-2">Ordered Items</p>
      <div className="p-2 space-y-4 bg-white rounded shadow-sm">
        {details.orders?.map((order, index) => (
          <div key={index} className="border-b border-[#EAECF0] pb-2">
            <div className="flex justify-between">
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                {order.weight}KG {order.product_category}
              </Typography>
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>{order.cost}</Typography>
            </div>
            <div className="flex justify-between mt-1">
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Gas Quantity</Typography>
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>{order.quantity}</Typography>
            </div>
          </div>
        ))}

        <div className="flex justify-between font-medium pt-2">
          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Subtotal</Typography>
          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
            {Number(subtotal).toLocaleString()}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Delivery Fee</Typography>
          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
            {Number(details.delivery_fee).toLocaleString()}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Service Fee</Typography>
          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
            {Number(details.service_fee).toLocaleString()}
          </Typography>
        </div>
        <div className="flex justify-between text-[14px] font-bold pt-2">
          <p>Total</p>
          <p className="text-[#3EAF3F] font-semibold">
            {Number(details.total).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {details.status === "PENDING" && (
        <div className="flex justify-center gap-10 mt-6">
          <button
            className="border border-[#EF0F30] bg-red-100 text-[#EF0F30] px-8 py-2 rounded"
            onClick={() => setIsDeclineModalOpen(true)}
          >
            {orderUpdateLoading ? <Spinner /> : "Decline"}
          </button>
          <button
            onClick={() => setIsAcceptModalOpen(true)}
            className="bg-[#3EAF3F] text-white px-8 py-2 rounded"
          >
            {orderUpdateLoading ? <Spinner /> : "Accept"}
          </button>
        </div>
      )}

      {details.status === "ACCEPTED" && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handleOrderStatus("PROCESSED")}
            className="bg-[#3EAF3F] text-white px-8 py-2 rounded"
          >
            {orderUpdateLoading ? <Spinner /> : "PROCESSED"}
          </button>
        </div>
      )}

      {details.status === "PROCESSED" && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handleOrderStatus("SHIPPED")}
            className="bg-[#3EAF3F] text-white px-8 py-2 rounded"
          >
            {orderUpdateLoading ? <Spinner /> : "SHIPPED"}
          </button>
        </div>
      )}

      {/* Modals */}
      <DeclineRequest
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onSubmit={(reason) => handleOrderStatus("REJECTED", reason)}
      />
      <AcceptOrder
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        onSubmit={() => handleOrderStatus("ACCEPTED")}
      />
    </motion.div>
  );
};

export default OrderDetails;
