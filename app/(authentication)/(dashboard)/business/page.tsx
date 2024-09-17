import React from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Building2, PlusCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Dashboard",
  description: "Manage your business operations and analytics",
};

const BusinessPage: React.FC = () => {
  return (
    <>
      <div className="p-4">
        <h3 className="text-2xl font-semibold">Business</h3>
        <p>
          You can create multiple business units to manage the products and
          campaigns.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        <Link
          href={"/business/create"}
          className="flex space-2 gap-3 w-fit border-2 p-3 rounded-xl hover:bg-slate-800"
        >
          <PlusCircle /> Add new business
        </Link>
      </div>
      <div className="p-4">
        <h3 className="text-md font-semibold mb-4 flex gap-3">
          <Building2 className="w-6 h-6" /> Your Business
        </h3>
        <p>No Business found</p>
      </div>
    </>
  );
};

export default BusinessPage;
