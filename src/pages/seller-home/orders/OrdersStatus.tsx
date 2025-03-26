import { ordersStatus } from "./constants";

export default function OrdersStatus() {
  return (
    <section className="w-full grid grid-cols-2 lg:flex lg:flex-wrap gap-[10px] mt-4">
      {ordersStatus.map((item) => {
        return (
          <div
            key={item.title}
            className="flex items-center p-[10px] rounded bg-card lg:min-w-[175px]"
          >
            <div
              style={{
                backgroundColor: item.iconColor,
              }}
              className="p-3 rounded-full mr-4"
            >
              <div className="text-xl opacity-100">{item.icon}</div>
            </div>

            <div>
              <h4 className="text-sm font-normal opacity-70">{item.title}</h4>
              <span className="font-semibold">25</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
