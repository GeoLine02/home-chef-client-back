export interface IOrderProduct {
  id: number;
  quantity: number;
}

export interface IDeliveryPoint {
  address: string;
}

export interface IDeliveryOptions {
  matter?: string;
  points: IDeliveryPoint[];
}

export interface IOrder {
  orderProducts: IOrderProduct[];
  deliveryOptions: IDeliveryOptions;
}
