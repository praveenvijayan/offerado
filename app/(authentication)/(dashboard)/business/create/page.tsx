"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import LocationPicker from "@/components/global/location-picker";
import { useBusinessFormStore } from "@/stores/use-business-form-store";
import { createBusiness } from "@/services/business-services";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrganizationByEmail } from "@/services/organization-service";
import { toast } from "sonner";
import Message from "../../../../../components/feedback/message";

// Zod schema for validation
const businessFormSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  logo: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine((value) => !value || value.includes("@"), {
      message: "Invalid email format",
    }),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || /^\+?[1-9]\d{1,14}$/.test(value), {
      message: "Invalid phone number format",
    }),
  address: z.string().optional(),
  country: z.string().optional(),
  currency: z.string().optional(),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  isActive: z.boolean().optional(),
});

export default function BusinessCreateForm() {
  const { businessForm, setBusinessForm } = useBusinessFormStore();
  const { isSignedIn, isLoaded, user } = useUser();
  // Use React Query to fetch the organization based on user's email
  const {
    data: organization,
    isLoading: isOrgLoading,
    isError: isOrgError,
  } = useQuery({
    queryKey: ["organization"],
    queryFn: () =>
      getOrganizationByEmail(user?.primaryEmailAddress?.emailAddress ?? ""),
    enabled: !!user?.primaryEmailAddress?.emailAddress,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(businessFormSchema),
    defaultValues: businessForm,
  });

  const mutation = useMutation({
    mutationFn: async (businessData: any) => {
      return await createBusiness(businessData);
    },
    onSuccess: () => {
      console.log("Business created successfully!");
      // Optionally refetch queries or perform any additional actions
      toast.success("Business created successfully!");
    },
    onError: (error) => {
      console.error("Error creating business:", error);
      toast.error(
        error?.message || "An error occurred while creating the business."
      );
    },
  });

  const onSubmit = (data: any) => {
    // If the organization query is still loading or errored out, don't submit
    if (isOrgLoading || isOrgError) {
      console.error(isOrgError, "Organization data is not ready");
      return;
    }
    console.log("Org ID data:", organization);
    const businessData = {
      name: data.name,
      organizationId: organization?.id,
      ownerId: user?.id,
      ...data,
    };

    // Trigger the mutation to create the business
    mutation.mutate(businessData);
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
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
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
              />
              {errors.logo && (
                <p className="text-red-500 text-sm">{errors.logo.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter business email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                placeholder="Enter business phone"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter business address"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>

          <div className="max-w-2xl w-full flex flex-col gap-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                onValueChange={(value) => {
                  setBusinessForm({ country: value });
                }}
                value={businessForm.country || "India"} // Default value is "India"
              >
                <SelectTrigger>
                  <Input
                    placeholder="Select country"
                    className="border-0 p-0"
                    {...register("country")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Currency */}
            <div className="relative z-20">
              <Label htmlFor="currency">Currency</Label>
              <Select
                onValueChange={(value) => setBusinessForm({ currency: value })}
                value={businessForm.currency || "INR"}
              >
                <SelectTrigger>
                  <Input
                    placeholder="Select currency"
                    className="border-0 p-0"
                    {...register("currency")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="relative z-10">
              <Label htmlFor="location" className="py-2">
                Location
              </Label>
              {/* <LocationPicker
                setLocation={(loc) => setBusinessForm({ location: loc })}
              /> */}
              <p className="text-sm py-2">
                Selected Location: Latitude {businessForm.location?.lat || ""},
                Longitude {businessForm.location?.lng || ""}
              </p>
            </div>

            {/* Active Switch */}
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={businessForm.isActive}
                onCheckedChange={(checked) =>
                  setBusinessForm({ isActive: checked })
                }
              />
              <Label htmlFor="isActive">Accept terms and conditions</Label>
            </div>
          </div>
        </div>

        {/* Disable the button while loading */}
        <Button
          type="submit"
          className="p-6 m-6 mt-0"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Save Business"}
        </Button>
      </form>
    </>
  );
}
