// app/(dashboard)/(routes)/cliente/ClientePage.tsx
import prismadb from "@/lib/prismadb";
import { ClienteColumn } from "./components/columns";
import { ClienteClient } from "./components/client";

const ClientePage = async () => {
  // Obtiene todos los clientes de la base de datos
  const clientes = await prismadb.cliente.findMany();

  // Formatea los datos de los clientes para la tabla
  const formattedClientes: ClienteColumn[] = clientes.map((cliente) => ({
    clid: cliente.clid,
    clinombre: cliente.clinombre,
    clicorreo: cliente.clicorreo,
    clitelefono: cliente.clitelefono,
    clici: cliente.clici,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClienteClient data={formattedClientes} />
      </div>
    </div>
  );
};

export default ClientePage;
