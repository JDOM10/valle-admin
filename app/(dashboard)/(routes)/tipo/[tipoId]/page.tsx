import prismadb from "@/lib/prismadb";

import { TipoForm } from "@/app/(dashboard)//(routes)/tipo/[tipoId]/components/tipo-form";

const TipoPageAdd = async ({
  params
}: {
  params: { tipoId: string }
}) => {
  const tipoId = Number(params.tipoId);

  const tipo = await prismadb.tipo.findUnique({
    where: {
      tipid: tipoId,
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TipoForm initialData={tipo} />
      </div>
    </div>
  );
}

export default TipoPageAdd;