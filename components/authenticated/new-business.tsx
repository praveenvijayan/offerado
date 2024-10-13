"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBusiness } from "@/services/business-services";
import { toast } from "sonner";
import useOrganizationStore from "@/stores/organization";

interface NewBusinessProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NewBusiness: React.FC<NewBusinessProps> = ({ open, setOpen }) => {
  const { organization } = useOrganizationStore();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  // Mutation to create a new business
  const mutation = useMutation({
    mutationFn: (data: any) => createBusiness(data),
    onSuccess: () => {
      toast.success("Business created successfully");
      queryClient.invalidateQueries({
        queryKey: ["organization", organization?.email],
      });
      setOpen(false);
    },
    onError: (error: any) => {
      setErrorMessage(error.message || "An error occurred");
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (formData: any) => {
    const data = {
      ...formData,
      organizationId: organization?.id,
      isDefault: organization?.businesses?.length === 0 ? true : false,
    };
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Create Your Business</DialogTitle>
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
              {...register("name", { required: "Business name is required" })}
              placeholder="Business Name"
              disabled={isSubmitting}
            />
            {errors.name?.message &&
              typeof errors.name.message === "string" && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
          </div>
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-2xl w-fit ml-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Business"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBusiness;
