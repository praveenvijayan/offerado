"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import LocationPicker from "@/components/global/location-picker";

type BusinessFormValues = {
  name: string;
  description?: string;
  logo: string;
  email: string;
  address: string;
  country: string;
  currency: string;
  location: string; // Assuming location is a string; adjust based on actual implementation
  isActive: boolean;
};

export default function BusinessCreateForm() {
  const { register, handleSubmit } = useForm<BusinessFormValues>();
  const [isActive, setIsActive] = useState(true);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const onSubmit = (data: BusinessFormValues) => {
    console.log(data);
    // Handle form submission, e.g., send to API
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Business Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex md:flex-row flex-col gap-8 p-6">
          <div className="max-w-2xl w-full flex flex-col gap-4">
            <div>
              <Label htmlFor="name">Business Name</Label>
              <Input
                id="name"
                placeholder="Enter business name"
                {...register("name")}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                {...register("description")}
              />
            </div>

            {/* Logo URL */}
            <div>
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                placeholder="Enter logo URL"
                {...register("logo")}
                required
                type="file"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter business email"
                {...register("email")}
                required
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter business address"
                {...register("address")}
              />
            </div>
          </div>
          <div className="max-w-2xl w-full flex flex-col gap-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                onValueChange={(value) => console.log(value)}
                {...register("country")}
                required
              >
                <SelectTrigger>
                  <Input
                    placeholder="Select country"
                    className="border-0 p-0"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Currency */}
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                onValueChange={(value) => console.log(value)}
                {...register("currency")}
                required
              >
                <SelectTrigger>
                  <Input
                    placeholder="Select currency"
                    className="border-0 p-0"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <LocationPicker setLocation={setLocation} />
              <p>
                Selected Location: Latitude {location.lat}, Longitude{" "}
                {location.lng}
              </p>
            </div>

            {/* Active Switch */}
            <div className="flex items-center space-x-2">
              <Label htmlFor="isActive">Is Active</Label>
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
                {...register("isActive")}
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="p-6 m-6 mt-0">
          Save Business
        </Button>
      </form>
    </>
  );
}
