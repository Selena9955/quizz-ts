function Footer() {
  return (
    <footer className="bg-muted py-6 text-center">
      <p className="text-sm font-medium text-gray-500">
        © {new Date().getFullYear()} Quizz. All rights reserved.
      </p>
      <p className="mt-1 text-xs text-gray-400">
        本網站為面試用模擬作品，無實際商業用途
        <a
          href="https://github.com/Selena9955"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 inline-block hover:underline"
        >
          GitHub｜Selena9955
        </a>
      </p>
    </footer>
  );
}

export default Footer;
