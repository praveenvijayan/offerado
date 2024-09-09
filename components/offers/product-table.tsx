import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  category: string;
  mrp: number;
  offerPrice: number;
  image: string;
}

interface ProductTableProps {
  products: Product[];
  selectedProducts: number[];
  onSelectProduct: (productId: number) => void;
}

export default function ProductTable({
  products,
  selectedProducts,
  onSelectProduct,
}: ProductTableProps) {
  return (
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
            <TableCell>
              <Checkbox
                checked={selectedProducts.includes(product.id)}
                onCheckedChange={() => onSelectProduct(product.id)}
              />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.mrp}</TableCell>
            <TableCell>{product.offerPrice}</TableCell>
            <TableCell>Discount</TableCell>
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
  );
}
