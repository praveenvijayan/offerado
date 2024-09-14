import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Plus,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Dashboard() {
  return (
    <div className="grid w-full md:grid-cols-5">
      {/* <Card className="bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Offer Creation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <Link href="/organizations/create">
              <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center">
                <Plus height={16} width={16} />

                <span className="text-sm">Create an Offer</span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
