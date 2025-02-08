import Link from "next/link";

function CreditTag() {
  return (
    <aside className="fixed top-4 end-4 z-10 flex items-center justify-center gap-4 rounded-lg bg-white/30 backdrop-filter backdrop-blur-lg px-5 py-3 text-white hover:scale-105 hover:">
      <Link
        href="https://github.com/0ddFl3xx/"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-center font-medium hover:opacity-75">
        Made by Thuli
      </Link>
    </aside>
  );
}

export default CreditTag;
