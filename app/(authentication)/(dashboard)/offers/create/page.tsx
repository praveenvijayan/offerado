"use client";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  CopyIcon,
  Dessert,
  Home,
  LineChart,
  Menu,
  MonitorDot,
  Package,
  Plus,
  Search,
  Share,
  ShoppingCart,
  TabletSmartphone,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export default function CreateOffer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isActive, setIsActive] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]); // List of selected product IDs

  const handleProductSelection = (productId: number) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleInputChange = (id: {}, field: any, value: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: "template1",
      name: "Template 1",
      image: "https://via.placeholder.com/64x64?text=Template+1",
    },
    {
      id: "template2",
      name: "Template 2",
      image: "https://via.placeholder.com/64x64?text=Template+2",
    },
    {
      id: "template3",
      name: "Template 3",
      image: "https://via.placeholder.com/64x64?text=Template+3",
    },
  ];
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product A",
      category: "Electronics",
      mrp: 100,
      offerPrice: 80,
      image:
        "http://offerado.in/api/media/file/pngtree-fresh-orange-png-png-image_10159570.png",
    },
    {
      id: 2,
      name: "Product B",
      category: "Clothing",
      mrp: 50,
      offerPrice: 40,
      image:
        "http://offerado.in/api/media/file/pngtree-fruit-fresh-tomato-png-image_9959799.png",
    },
    {
      id: 3,
      name: "Product C",
      category: "Books",
      mrp: 20,
      offerPrice: 15,
      image:
        "http://offerado.in/api/media/file/pngtree-raw-sea-bass-fresh-seabass-fish-isolated-on-white-background-with-png-image_9225167.png",
    },
  ]);

  const [iframeSize, setIframeSize] = useState({
    width: "100%",
    height: "1024px",
  });

  const handleResize = (size: "desktop" | "mobile") => {
    if (size === "desktop") {
      setIframeSize({ width: "100%", height: "1024px" }); // Desktop size
    } else if (size === "mobile") {
      setIframeSize({ width: "375px", height: "667px" }); // Mobile size (common smartphone size)
    }
  };

  const [offer, setOffer] = useState({
    title: "Summer Sale Offer",
    description:
      "Enjoy up to 50% off on selected items during our summer sale.",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    isActive: true,
    selectedProducts: 5,
    selectedTemplate: "Template 2",
    image: "/share-image.jpg",
    link: "offerado.in/43534523523",
  });

  return (
    <div className="flex flex-col">
      {/* Offer Summary Card */}
      <Card className="w-full p-6 shadow-lg rounded-lg border mb-[1rem]">
        <CardHeader>
          <CardTitle className="text-xl font-bold ">{offer.title}</CardTitle>
          <CardDescription className="">{offer.description}</CardDescription>
          <div>
            <Badge
              variant={
                offer.isActive ? ("success" as any) : ("destructive" as any)
              }
              className="ml-auto"
            >
              {offer.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Section */}
          <div className="grid grid-cols-5 gap-4">
            <div className=" p-4 rounded-md">
              <p className="text-sm font-semibold ">Start Date</p>
              <p className="text-lg ">{offer.startDate}</p>
            </div>
            <div className=" p-4 rounded-md">
              <p className="text-sm font-semibold ">End Date</p>
              <p className="text-lg ">{offer.endDate}</p>
            </div>
            <div className="p-4 rounded-md">
              <p className="text-sm font-semibold ">Selected Products</p>
              <p className="text-lg ">{offer.selectedProducts} products</p>
            </div>
            <div className="p-4 rounded-md">
              <p className="text-sm font-semibold ">Selected Template</p>
              <p className="text-lg ">{offer.selectedTemplate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Tabs Component */}
      <Tabs defaultValue="createOffer" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="createOffer">1. Create Campaign</TabsTrigger>
          <TabsTrigger value="components">2. Components</TabsTrigger>
          <TabsTrigger value="selectTemplate">3. Select Template</TabsTrigger>
          <TabsTrigger value="shareOffers">4. Share Campaign</TabsTrigger>
        </TabsList>

        {/* Tab Content for Create Offer */}
        <TabsContent value="createOffer">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Add a New Campaign</CardTitle>
              <CardDescription>
                Fill out the form to create an campaign.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div className="grid grid-cols-2 gap-4 align-middle">
                  {/* Offer Title */}
                  <div className="col-span-2">
                    <Label htmlFor="title">Campaign Name</Label>
                    <Input
                      id="title"
                      placeholder="Enter offer title"
                      {...register("title", {
                        required: "Title is required",
                      })}
                    />
                    {errors.title && (
                      <span className="text-red-500">
                        {errors.title.message as any}
                      </span>
                    )}
                  </div>

                  {/* Offer Description */}
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
                        {errors.description.message as any}
                      </span>
                    )}
                  </div>

                  {/* Offer Dates */}
                  <div className="col-span-2 flex flex-wrap w-full space-x-4">
                    <div>
                      <Label htmlFor="start">Start Date</Label>
                      <Input type="date" id="start" {...register("start")} />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input type="date" id="expiry" {...register("expiry")} />
                    </div>
                    {/* Campaign Type */}
                    {/* <div className="col-span-1">
                      <Label htmlFor="offerType">Campaign Type</Label>
                      <Select {...register("offerType")}>
                        <SelectTrigger>
                          <span>Select Campaign type</span>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bogo">Quizzes</SelectItem>
                          <SelectItem value="bundle">Polls</SelectItem>
                          <SelectItem value="bundle">Contest</SelectItem>
                          <SelectItem value="bundle">Offers</SelectItem>
                          <SelectItem value="bundle">Feedbacks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                    {/* Is Offer Active */}
                    <div className="pt-3 md:pt-8">
                      <Checkbox
                        id="isActive"
                        checked={isActive}
                        onCheckedChange={(checked) =>
                          setIsActive(checked === true)
                        }
                      />
                      <Label htmlFor="isActive" className="ml-[.5rem]">
                        Is Active
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="mt-4">
                  Next
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Components */}
        <TabsContent value="components">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            {/* Poll Card */}
            <Card className="">
              <CardHeader>
                <CardTitle>Poll</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Link href="/organizations/create">
                    <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center">
                      <Plus height={16} width={16} />

                      <span className="text-sm">Add a Poll</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Link href="/organizations/create">
                    <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center">
                      <Plus height={16} width={16} />

                      <span className="text-sm">Add a Quiz</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Link href="#">
                        <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center">
                          <Plus height={16} width={16} />
                          <span className="text-sm">Add an Offer</span>
                        </div>
                      </Link>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Products</SheetTitle>
                        <SheetDescription>
                          Select products to Add a campaign
                        </SheetDescription>
                      </SheetHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Select</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>MRP</TableHead>
                            <TableHead>Offer Price</TableHead>
                            <TableHead>Offer Type</TableHead>
                            <TableHead>Image</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow
                              key={product.id}
                              className={
                                selectedProducts.includes(product.id)
                                  ? "bg-green-900 hover:bg-green-900"
                                  : ""
                              }
                            >
                              {/* Select Product */}
                              <TableCell>
                                <Checkbox
                                  checked={selectedProducts.includes(
                                    product.id
                                  )}
                                  onCheckedChange={() =>
                                    handleProductSelection(product.id)
                                  }
                                />
                              </TableCell>

                              {/* Product Name */}
                              <TableCell>{product.name}</TableCell>

                              {/* Category */}
                              <TableCell>{product.category}</TableCell>

                              {/* MRP */}
                              <TableCell>{product.mrp}</TableCell>

                              {/* Offer Price */}
                              <TableCell>{product.offerPrice}</TableCell>

                              <TableCell>Discount</TableCell>

                              {/* Image */}
                              <TableCell>
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={64}
                                  height={64}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit" className="mt-[1rem]">
                            Save changes
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>Contest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Link href="/organizations/create">
                    <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center">
                      <Plus height={16} width={16} />

                      <span className="text-sm">Add a Contest</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Link href="/organizations/create">
                    <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center">
                      <Plus height={16} width={16} />

                      <span className="text-sm">Add a Feedback</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Content for Select Template */}
        <TabsContent value="selectTemplate">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Select Template</CardTitle>
              <CardDescription>
                Choose a template for this offer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer ${
                      selectedTemplate === template.id
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={template.image}
                        alt={`${template.name} preview`}
                        width={64}
                        height={64}
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Submit Button */}
              <Button type="submit" className="mt-4">
                Next
              </Button>
              <div className="p-[1rem]">
                <div className="flex justify-center align-middle p-[1rem] gap-x-4">
                  <MonitorDot
                    className="cursor-pointer"
                    onClick={() => handleResize("desktop")}
                  />
                  <TabletSmartphone
                    className="cursor-pointer"
                    onClick={() => handleResize("mobile")}
                  />
                </div>

                <iframe
                  src="https://www.offerado.in/66d35228e5762fda53f84d9b"
                  className="w-full ml-auto mr-auto rounded-md"
                  style={{
                    width: iframeSize.width,
                    height: iframeSize.height,
                  }}
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Tab Content for Share */}
        <TabsContent value="shareOffers">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Share Campaign</CardTitle>
              <CardDescription>
                Select where you&apos;d like to share your offer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Twitter Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      Twitter <Share />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={offer.image}
                      alt="Offer Image"
                      className="w-full h-32 object-cover rounded-md mb-[1rem]"
                      width={120}
                      height={100}
                    />
                    <p>{offer.title}</p>
                    <p>{offer.description}</p>
                  </CardContent>
                </Card>

                {/* Facebook Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      Facebook <Share />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={offer.image}
                      alt="Offer Image"
                      className="w-full h-32 object-cover rounded-md mb-[1rem]"
                      width={120}
                      height={100}
                    />
                    <p>{offer.title}</p>
                    <p>{offer.description}</p>
                  </CardContent>
                </Card>

                {/* Slack Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      WhatsApp
                      <Share />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={offer.image}
                      alt="Offer Image"
                      className="w-full h-32 object-cover rounded-md mb-[1rem]"
                      width={120}
                      height={100}
                    />
                    <p>{offer.title}</p>
                    <p>{offer.description}</p>
                  </CardContent>
                </Card>

                {/* LinkedIn Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      LinkedIn <Share />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={offer.image}
                      alt="Offer Image"
                      className="w-full h-32 object-cover rounded-md mb-[1rem]"
                      width={120}
                      height={100}
                    />
                    <p>{offer.title}</p>
                    <p>{offer.description}</p>
                  </CardContent>
                </Card>

                {/* Instagram Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      Instagram <Share />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Carousel>
                      <CarouselContent>
                        <CarouselItem>
                          {" "}
                          <Image
                            src={offer.image}
                            alt="Offer Image"
                            className="w-full h-32 object-cover rounded-md mb-[1rem]"
                            width={120}
                            height={100}
                          />
                        </CarouselItem>
                        <CarouselItem>
                          {" "}
                          <Image
                            src={offer.image}
                            alt="Offer Image"
                            className="w-full h-32 object-cover rounded-md mb-[1rem]"
                            width={120}
                            height={100}
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <Image
                            src={offer.image}
                            alt="Offer Image"
                            className="w-full h-32 object-cover rounded-md mb-[1rem]"
                            width={120}
                            height={100}
                          />
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </CardContent>
                </Card>

                {/* Raw Tags Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      Raw Tags <CopyIcon />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre>
                      {`
<script>
  test
</script>
`}
                    </pre>
                  </CardContent>
                </Card>
              </div>
              {/* <div className="py-[1rem]">
                <Button className="share-button p-[1rem]">Share Offer</Button>
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
