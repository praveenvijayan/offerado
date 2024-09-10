import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
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
        {/* Organization Card */}
        <Card className="">
          <CardHeader>
            <CardTitle>Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Link href="/organizations/create">
                <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center">
                  <Plus height={16} width={16} />

                  <span className="text-sm">Create an Organization</span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Offerado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Link href="/dashboard">
                <div className="border border-solid p-4 rounded-lg">
                  <div className="text-lg font-semibold">Offerado</div>
                  <div className="text-sm text-slate-400">offer-studio</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
