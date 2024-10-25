"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import useCampaignStore from "@/stores/create-campaign-form";
import { Edit } from "lucide-react";

const DatePicker = ({ field }: any) => {
  let formattedDate;

  if (field.value?.from) {
    if (field.value?.to) {
      formattedDate = `${format(field.value.from, "LLL dd, y")} - ${format(
        field.value.to,
        "LLL dd, y"
      )}`;
    } else {
      formattedDate = format(field.value.from, "LLL dd, y");
    }
  } else {
    formattedDate = <span>Pick a date</span>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !field.value?.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={field.value?.from || undefined}
          selected={{
            from: field.value?.from || undefined,
            to: field.value?.to || undefined,
          }}
          onSelect={(range) => field.onChange(range)}
          numberOfMonths={2}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </PopoverContent>
    </Popover>
  );
};

// Main CampaignInlineForm component
const CampaignInlineForm = () => {
  const [open, setOpen] = useState(false);
  const {
    title,
    description,
    start,
    expiry,
    setTitle,
    setDescription,
    setStart,
    setExpiry,
  } = useCampaignStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title,
      description,
      dateRange: {
        from: start ? new Date(start) : null,
        to: expiry ? new Date(expiry) : null,
      },
    },
  });

  const onSubmit = (data: any) => {
    setTitle(data.title);
    setDescription(data.description);
    setStart(data.dateRange.from);
    setExpiry(data.dateRange.to);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Edit className="h-4 w-4 stroke-green-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            id="title"
            placeholder="Eg: Summer campaign"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}

          <Textarea
            id="description"
            placeholder="Campaign description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}

          <Controller
            control={control}
            name="dateRange"
            render={({ field }) => <DatePicker field={field} />}
          />

          <Button type="submit">Save changes</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CampaignInlineForm;
