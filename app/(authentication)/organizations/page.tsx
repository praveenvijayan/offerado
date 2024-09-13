import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Organizations() {
  return (
    <>
      <div className="p-4">
        <h3 className="text-mm font-semibold">
          Organizations are containers for your apps
        </h3>
        <p>
          Apps in a project share features like Real-time Database and Analytics
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        <Button className="flex space-2 gap-3 w-fit">
          <PlusCircle /> Add an organization
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4 flex gap-3">
          <Building2 /> Your Organizations
        </h3>
        <p>No organizations found</p>
      </div>
    </>
  );
}
