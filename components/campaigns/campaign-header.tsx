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
import React from "react";
import { Separator } from "@/components/ui/separator";
import useCampaignStore from "@/stores/create-campaign-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Edit2 } from "lucide-react";

const CampaignHeader = () => {
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
  return (
    <div>
      <h3 className="text-xl">{title || "Untitled campaign"}</h3>
      <div className="flex gap-2 items-center">
        <h4 className="text-sm">{description || "Campaign description"}</h4>
        <Separator orientation="vertical" className="h-4" />
        <h5 className="text-sm">
          {format(new Date(start || new Date()), "LLL dd, y")} -{" "}
          {format(new Date(expiry || new Date()), "LLL dd, y")}
        </h5>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size={"icon"}>
              <Edit className="h-4 w-4 stroke-green-500" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit campaign details</DialogTitle>
              <DialogDescription>
                Make changes to your campaign information here.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setCampaignType(data.campaignType);
                console.log(data);
              })}
            >
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
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </form>
            <DialogFooter>
              {/* <Button type="submit">Save changes</Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CampaignHeader;
