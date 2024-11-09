import prismadb from "@/lib/prismadb";

import { ProductorForm } from "@/app/(dashboard)//(routes)/productor/[productorId]/components/productor-form";

const ProductorPageAdd = async ({
  params
}: {
  params: { productorId: string }
}) => {
  const productorId = Number(params.productorId);

  const productor = await prismadb.productor.findUnique({
    where: {
      proid: productorId,
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductorForm initialData={productor} />
      </div>
    </div>
  );
}

export default ProductorPageAdd;