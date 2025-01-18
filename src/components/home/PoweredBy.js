export default function PoweredBy({ company }) {
  return (
    <div className="w-full text-center py-8">
      <p className="text-neutral-400 text-sm">
        Powered by{" "}
        {company.isFigics ? (
          <a
            href="https://figics.com"
            target="_blank"
            className="underline hover:text-neutral-900"
          >
            figics.com
          </a>
        ) : (
          <a
            href="https://i1smartmarketing.com"
            target="_blank"
            className="underline hover:text-neutral-900"
          >
            i1SmartMarketing
          </a>
        )}
      </p>
    </div>
  );
}
