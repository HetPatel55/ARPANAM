"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="border-[#efc9bd] text-[#b44232] hover:border-[#e7aa9b] hover:bg-[#fff0ec]"
      onClick={logout}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
