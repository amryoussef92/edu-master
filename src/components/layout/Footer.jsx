export default function Footer() {
  return (
    <footer className="bg-white shadow-inner py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} EduMaster. All rights reserved.
          </p>
          <p className="text-gray-600 mt-2">
            Contact us at{" "}
            <a
              href="mailto:support@edumaster.com"
              className="text-purple-700 hover:underline"
            >
              support@edumaster.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}