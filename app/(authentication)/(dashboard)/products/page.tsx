import ProductTable from "@/components/products/product-table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Products() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center gap-y-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-xl">Product List</span>
        </div>
        <div className="">
          <Link href="/product/create" className="flex hover:text-slate-500">
            <PlusCircle className="h-6 w-6 mr-[.5rem]" /> New Product
          </Link>
        </div>
      </div>
      {/* Offers Table */}
      <ProductTable />
    </div>
  );
}
