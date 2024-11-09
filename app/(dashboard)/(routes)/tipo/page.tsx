import prismadb from "@/lib/prismadb";

import { TipoColumn } from "./components/columns";
import { TipoClient } from "./components/client";

const TipoPage = async () => {
  const tipo = await prismadb.tipo.findMany({
  });

  const formattedTipo: TipoColumn[] = tipo.map((item) => ({   
    tipid: item.tipid, 
    tipnombre: item.tipnombre, 
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TipoClient data={formattedTipo} />
      </div>
    </div>
  );
};

export default TipoPage;