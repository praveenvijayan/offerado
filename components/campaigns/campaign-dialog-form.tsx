"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import useCampaignStore from "@/stores/create-campaign-form";

const CampaignDialogForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    title,
    description,
    start,
    expiry,
    campaignType,
    setTitle,
    setDescription,
    setStart,
    setExpiry,
    setCampaignType,
  } = useCampaignStore();

  const onSubmit = (data: any) => {
    setTitle(data.title);
    setDescription(data.description);
    setCampaignType(data.campaignType);
    setOpen(false); // Close the dialog after saving
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit campaign details</DialogTitle>
          <DialogDescription>
            Make changes to your campaign information here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <Input
              id="title"
              placeholder="Eg: Summer campaign"
              {...register("title", { required: "Title is required" })}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <span className="text-red-500">
                {String(errors.title.message)}
              </span>
            )}
            <Textarea
              id="description"
              placeholder="Campaign description"
              {...register("description", {
                required: "Description is required",
              })}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <span className="text-red-500">
                {String(errors.description.message)}
              </span>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !start && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {start ? (
                    expiry ? (
                      <>
                        {format(new Date(start), "LLL dd, y")} -{" "}
                        {format(new Date(expiry), "LLL dd, y")}
                      </>
                    ) : (
                      format(new Date(start), "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={start ? new Date(start) : undefined}
                  selected={{
                    from: start ? new Date(start) : undefined,
                    to: expiry ? new Date(expiry) : undefined,
                  }}
                  onSelect={(range) => {
                    if (range) {
                      setStart(range.from ? range.from : "");
                      setExpiry(range.to ? range.to : "");
                    }
                  }}
                  numberOfMonths={2}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDialogForm;
