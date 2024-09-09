import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const CreateCampaignForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isActive, setIsActive] = useState(false);

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="grid grid-cols-2 gap-4 align-middle">
        <div className="col-span-2">
          <Label htmlFor="title">Campaign Name</Label>
          <Input
            id="title"
            placeholder="Enter offer title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500">
              {errors.title.message as string}
            </span>
          )}
        </div>
        <div className="col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter offer description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-red-500">
              {errors.description.message as string}
            </span>
          )}
        </div>
        <div className="col-span-2 flex flex-wrap w-full space-x-4">
          <div>
            <Label htmlFor="start">Start Date</Label>
            <Input type="date" id="start" {...register("start")} />
          </div>
          <div>
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input type="date" id="expiry" {...register("expiry")} />
          </div>
          <div className="pt-3 md:pt-8">
            <Checkbox
              id="isActive"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked === true)}
            />
            <Label htmlFor="isActive" className="ml-[.5rem]">
              Is Active
            </Label>
          </div>
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Next
      </Button>
    </form>
  );
};

export default CreateCampaignForm;
