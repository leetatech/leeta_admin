import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../state";
import { resetStatusUpdate, triggerOrderList, triggerOrderUpdate } from "../../../features/orders/order_slice";
import Loader from "../../components/Loader";
import OrderStats from "./orderStats";
import OrdersTable from "./ordersTable";
import OrderDetails from "./orderDetails";
import PaginationControls from "./paginationControls";
import { DEFAULT_ORDER_PER_PAGE } from "./types";
import { useIcons } from "../../../hooks/useIcons"
import SuccessModal from "../../components/successModal";
import {Order} from "./types";
import { formatDate } from "../../../utilities/helpers";

function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const orderState = useSelector((state: RootState) => state.order);
  const loading = orderState?.loading || false;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_ORDER_PER_PAGE);
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const allOrders = orderState?.orderData?.data?.data || [];
  const totalOrders = orderState?.orderData?.data?.metadata?.paging?.total|| 0;
  const { orderData } = useSelector((state: RootState) => state.order);
  const orders = (orderData?.data?.data || []) as Order[];

  // Calculate counts
  const todaysOrders = orders.filter(order => {
    const orderDate = new Date(formatDate(order.ts));
    const today = new Date();
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const pendingOrders = orders.filter(order => order.status === "PENDING").length;
  const cancelledOrders = orders.filter(order => order.status === "CANCELLED" || order.status === "REJECTED").length;
  const completedOrders = orders.filter(order => order.status === "SHIPPED").length;

  const [showSuccess, setShowSuccess] = React.useState(false);

  // Find selected order details
  const details = allOrders.find(
    (order: any) => Number(order.order_number) === expandedRow
  );

  const handleOrderStatus = (status: string, reason?: string) => {
    const payload = {
      order_id: details.id,
      order_status: status,
      reason: reason,
    };
    dispatch(triggerOrderUpdate(payload));
    dispatch(triggerOrderList({}));

    setExpandedRow(null);

    // Wait for modal to close visually before showing toast
    setTimeout(() => {
      setShowSuccess(true);
    }, 300); // 300ms delay is usually enough
  };

  const handleUpdateOrderStatusCompleted = () => {
    setShowSuccess(false)
    const payload = {};
    dispatch(triggerOrderList(payload));
  }

  const orderUpdateLoading = false; // Replace with redux state if needed

  const {  phone, mail, avatar } = useIcons()

  const icons = {
    phone: phone,
    mail: mail,
    avatar: avatar,
  };

  useEffect(() => {
    const payload = {
      paging: {
        index: currentPage,
        size: pageSize,
      },
    };
    dispatch(triggerOrderList(payload));

    return () => {
      dispatch(resetStatusUpdate());
    };
  }, [dispatch, pageSize, currentPage]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full">
      <div className="p-8 pb-1">
        <h1 className="text-3xl">Orders Management</h1>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="p-6 space-y-6">
          <OrderStats
            todaysOrders={todaysOrders}
            pendingOrders={pendingOrders}
            cancelledOrders={cancelledOrders}
            completedOrders={completedOrders}
          />
          <OrdersTable
            expandedRow={expandedRow}
            setExpandedRow={setExpandedRow}
          />
          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalOrders={totalOrders}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>

      {expandedRow && details && (
        <OrderDetails
          expandedRow={expandedRow}
          setExpandedRow={setExpandedRow}
          details={details}
          handleOrderStatus={handleOrderStatus}
          orderUpdateLoading={orderUpdateLoading}
          icons={icons}
        />
      )}

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => handleUpdateOrderStatusCompleted()}
        message={`Order has been updated successfully!`}
      />
    </div>
  );
}

export default Orders;