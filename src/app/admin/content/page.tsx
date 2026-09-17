import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminPageHeading } from "@/components/admin/AdminPageHeading";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager } from "@/components/admin/ContentManager";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/backend/auth";
import { getSiteContent } from "@/lib/backend/storage";

export default async function AdminContentPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const content = await getSiteContent();

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminPageHeading
          eyebrow="Website Content"
          title="Content Manager"
          description="Update homepage, programme, and contact content without editing code."
          actions={
            <Button asChild variant="outline" className="border-slate-200 bg-white text-sky-700 hover:bg-sky-50">
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
          }
        />
        <ContentManager initialContent={content} />
      </div>
    </AdminShell>
  );
}
