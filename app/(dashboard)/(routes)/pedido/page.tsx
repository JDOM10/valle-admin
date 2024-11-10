// app/(dashboard)/(routes)/pedido/PedidoPage.tsx
import prismadb from "@/lib/prismadb";
import { PedidoColumn } from "./components/columns";
import { PedidoClient } from "./components/client";

const PedidoPage = async () => {
  const pedidos = await prismadb.pedido.findMany({
    include: {
      cliente: true,
      producto: {
        include: {
          producto: true, // Incluye los datos del producto dentro de cada relación `Pedido_Producto`
        },
      },
    },
  });

  const formattedPedidos: PedidoColumn[] = pedidos.map((pedido) => ({
    peid: pedido.peid,
    pedfecha: pedido.pedfecha.toISOString(),
    pedtotal: pedido.pedtotal,
    clinombre: pedido.cliente.clinombre,
    productos: pedido.producto.map((item) => ({
      prdid: item.producto.prdid,
      prdnombre: item.producto.prdnombre,
      cantidad: item.ppcantidad,
    })),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PedidoClient data={formattedPedidos} />
      </div>
    </div>
  );
};

export default PedidoPage;
