export default function Loading() {
  return (
    <div
      className={`w-full flex justify-center items-center p-16 text-center xl:p-32 border-2 border-gray-200 text-xl font-medium text-gray-400 transition duration-500 bg-gray-100 animate-pulse hover:cursor-not-allowed`}
    >
      <p>
        <span className="text-2xl">
          <i className="fad fa-spinner-third fa-spin"></i>
        </span>
        &nbsp;&nbsp; กำลังโหลด...
      </p>
    </div>
  );
}
