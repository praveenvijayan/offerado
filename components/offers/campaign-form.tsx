"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import useTabsStore from "@/stores/campaign-tabs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import useCampaignStore from "@/stores/create-campaign-form";
import { ArrowLeft } from "lucide-react";

const CreateCampaignForm = () => {
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
  const { moveToNextTab } = useTabsStore();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setCampaignType(data.campaignType);
        moveToNextTab();
        console.log(data);
      })}
    >
      <div className="grid grid-cols-2 gap-2 align-middle px-4">
        <h3 className="mb-2">Create a new campaign</h3>
        <div className="col-span-2">
          <Label htmlFor="title">Campaign Name</Label>
          <Input
            id="title"
            placeholder="Eg: Summer campaign"
            {...register("title", { required: "Title is required" })}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <span className="text-red-500">{String(errors.title.message)}</span>
          )}
        </div>
        <div className="col-span-2">
          <Label htmlFor="description">Campaign description</Label>
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
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <div className={cn("grid gap-2")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
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
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button type="submit" className="mt-4 w-fit bg-green-500 rounded-2xl">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default CreateCampaignForm;
