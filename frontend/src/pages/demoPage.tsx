export default function StyledUI() {
  return (
    <div className="bg-[#f5efe5] min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-[#592800] text-3xl font-bold mb-6">Welcome to Our Store</h1>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="bg-[#592800] text-white px-6 py-2 rounded-lg shadow-md transition hover:bg-[#ecc78f] hover:text-[#592800]">
          Primary Button
        </button>
        <button className="bg-[#a9dadf] text-[#625656] px-6 py-2 rounded-lg shadow-md transition hover:bg-[#f7c1cb] hover:text-[#592800]">
          Secondary Button
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-[#a9dadf] text-[#592800] rounded-md w-full max-w-md text-center">
        This is an informational message styled with soft blue.
      </div>

      {/* Discount Badge */}
      <div className="mt-4 px-4 py-2 bg-[#f7c1cb] text-[#592800] font-semibold rounded-lg">
        Limited Offer: 20% Off!
      </div>
    </div>
  );
}