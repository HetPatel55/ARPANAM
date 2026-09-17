import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminPageHeading } from "@/components/admin/AdminPageHeading";
import { AdminShell } from "@/components/admin/AdminShell";
import { ReviewManager } from "@/components/admin/ReviewManager";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/backend/auth";
import { readCmsData } from "@/lib/backend/storage";

export default async function AdminReviewsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const data = await readCmsData();

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminPageHeading
          eyebrow="Parent Voices"
          title="Review Manager"
          description="Add, edit, hide, or remove parent reviews shown on the public website."
          actions={
            <Button asChild variant="outline" className="border-slate-200 bg-white text-sky-700 hover:bg-sky-50">
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
          }
        />
        <ReviewManager initialReviews={data.parentReviews ?? []} />
      </div>
    </AdminShell>
  );
}
