export default function Success() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-500">تم الدفع بنجاح! </h1>
      <p className="mt-4">تم تحديث رصيد نقاطك، يمكنك البدء بتوليد الفيديوهات الآن.</p>
      <a href="/dashboard" className="mt-8 px-6 py-3 bg-purple-600 rounded-xl">العودة للوحة التحكم</a>
    </div>
  )
}
