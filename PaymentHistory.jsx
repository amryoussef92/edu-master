import React, { useEffect, useState } from "react";
import { paymentAPI } from "../../api/student";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await paymentAPI.getHistory();
        setPayments(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
        setError("فشل في تحميل سجل المدفوعات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📄 سجل المدفوعات</h2>
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">جاري التحميل...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && payments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">لا توجد مدفوعات حتى الآن</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="py-3 px-4 text-right">#</th>
                <th className="py-3 px-4 text-right">الدرس</th>
                <th className="py-3 px-4 text-right">المبلغ</th>
                <th className="py-3 px-4 text-right">الحالة</th>
                <th className="py-3 px-4 text-right">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id || index} className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="py-3 px-4 text-center">{index + 1}</td>
                  <td className="py-3 px-4 text-right font-medium">{payment.lessonTitle || payment.lesson?.title || 'غير محدد'}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-bold text-green-600">${payment.amount || 0}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {payment.status === 'completed' ? 'مكتمل' :
                       payment.status === 'pending' ? 'قيد الانتظار' :
                       payment.status === 'failed' ? 'فشل' :
                       payment.status || 'غير محدد'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-600">
                    {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('ar-SA') : 'غير محدد'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory; 