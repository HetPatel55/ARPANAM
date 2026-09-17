export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-[#f8f7f2]">
      <div className="container py-8 lg:py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-24 rounded-lg border border-slate-200 bg-white" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-28 rounded-lg border border-slate-200 bg-white" />
            <div className="h-28 rounded-lg border border-slate-200 bg-white" />
            <div className="h-28 rounded-lg border border-slate-200 bg-white" />
          </div>
          <div className="h-64 rounded-lg border border-slate-200 bg-white" />
        </div>
      </div>
    </main>
  );
}
