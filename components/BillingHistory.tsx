"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Receipt, CheckCircle, Clock } from "lucide-react";

export default function BillingHistory() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await supabase
        .from('billing_history')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden">
      <table className="w-full text-right text-sm">
        <thead className="bg-white/5 text-gray-400 font-bold">
          <tr>
            <th className="p-5">التاريخ</th>
            <th className="p-5">النقاط</th>
            <th className="p-5">المبلغ</th>
            <th className="p-5">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan={4} className="p-10 text-center text-gray-600">لا يوجد عمليات شراء سابقة</td></tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="border-t border-white/5 hover:bg-white/[0.01]">
                <td className="p-5 text-gray-400">{new Date(order.created_at).toLocaleDateString('ar-EG')}</td>
                <td className="p-5 font-mono">+{order.credits_added} BP</td>
                <td className="p-5 text-green-400">${order.amount_paid}</td>
                <td className="p-5">
                  <span className="flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full w-fit">
                    <CheckCircle size={12} /> مكتملة
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
