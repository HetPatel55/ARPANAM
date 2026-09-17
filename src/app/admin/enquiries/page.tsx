import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminPageHeading } from "@/components/admin/AdminPageHeading";
import { AdminShell } from "@/components/admin/AdminShell";
import { EnquiryManager } from "@/components/admin/EnquiryManager";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/backend/auth";
import { readCmsData } from "@/lib/backend/storage";

export default async function AdminEnquiriesPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const data = await readCmsData();

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminPageHeading
          eyebrow="Admissions"
          title="Submitted Enquiries"
          description="Review parent queries, update status, and keep internal follow-up notes organised."
          actions={
            <Button asChild variant="outline" className="border-slate-200 bg-white text-sky-700 hover:bg-sky-50">
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
          }
        />
        <EnquiryManager initialEnquiries={data.enquiries} />
      </div>
    </AdminShell>
  );
}
