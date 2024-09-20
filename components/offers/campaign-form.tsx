import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useCampaignStore from "@/stores/create-campaign-form";
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
    isActive,
    setTitle,
    setDescription,
    setStart,
    setExpiry,
    setIsActive,
  } = useCampaignStore();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setStart(data.start);
        setExpiry(data.expiry);
        console.log(data);
      })}
    >
      <div className="grid grid-cols-2 gap-4 align-middle">
        <div className="col-span-2">
          {/* <Label htmlFor="title">Campaign Name</Label> */}
          <Input
            id="title"
            placeholder="Campaign name"
            {...register("title", { required: "Title is required" })}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <span className="text-red-500">
              {errors.title.message as string}
            </span>
          )}
        </div>
        <div className="col-span-2">
          {/* <Label htmlFor="description">Description</Label> */}
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
              {errors.description.message as string}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Label htmlFor="start">Start Date</Label>
            <Input
              type="date"
              id="start"
              {...register("start")}
              value={start as string}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              type="date"
              id="expiry"
              {...register("expiry")}
              value={expiry as string}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>
          {/* Uncomment if needed */}
          {/* <div className="pt-3 md:pt-8">
            <Checkbox
              id="isActive"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked === true)}
            />
            <Label htmlFor="isActive" className="ml-[.5rem]">
              Is Active
            </Label>
          </div> */}
        </div>
      </div>
      {/* Uncomment if needed */}
      <Button type="submit" className="mt-4">
        Continue
      </Button>
    </form>
  );
};

export default CreateCampaignForm;
