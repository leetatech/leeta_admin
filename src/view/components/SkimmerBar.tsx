export default function SkimmerLoader() {
  return (
    <div className='w-full max-w-md h-6 bg-gray-300 rounded-lg relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-[shimmer_1.5s_infinite]'></div>
    </div>
  );
}
