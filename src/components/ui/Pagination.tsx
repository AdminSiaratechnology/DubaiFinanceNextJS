'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
}

export function Pagination({ page, total, limit }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between mt-6 flex-wrap gap-3 bg-white p-4 rounded-2xl">
      <p className="text-sm text-black">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition"
        >
          Prev
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
              p === page
                ? 'bg-foreground text-white border-foreground'
                : 'border-border hover:bg-muted'
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}