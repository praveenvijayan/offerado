"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBusinessFormStore } from "@/stores/use-business-form-store";
import { createBusiness } from "@/services/business-services";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrganizationByEmail } from "@/services/organization-service";
import { toast } from "sonner";

const businessFormSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  logo: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional(),
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

interface NoBusinessProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NoBusiness: React.FC<NoBusinessProps> = ({ open, setOpen }) => {
  const { businessForm } = useBusinessFormStore();
  const { user } = useUser();

  // Fetch organization by email
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(businessFormSchema),
    defaultValues: businessForm,
  });

  // Mutation to create a business
  const mutation = useMutation({
    mutationFn: async (businessData: any) => {
      return await createBusiness(businessData);
    },
    onSuccess: () => {
      toast.success("Business created successfully!");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "An error occurred while creating the business."
      );
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data, isOrgLoading);
    if (isOrgLoading || isOrgError) {
      toast.error("Organization data is not ready or failed to load.");
      return;
    }

    const businessData = {
      ...data,
      organizationId: organization?.id,
      ownerId: user?.id,
    };

    mutation.mutate(businessData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Create your business</DialogTitle>
          <DialogDescription>
            Set up your business to manage your campaigns.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-4"
        >
          <div>
            <Input
              {...register("name")}
              placeholder="Business name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* Include other input fields as necessary */}
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-2xl w-fit ml-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create a Business"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoBusiness;
