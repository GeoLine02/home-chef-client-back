export interface IOrderProduct {
  id: number;
  quantity: number;
}

export interface IDeliveryPoint {
  address: string;
}

export interface IDeliveryOptions {
  points: IDeliveryPoint[];
}

export interface IOrder {
  orderProducts: IOrderProduct[];
  deliveryOptions: IDeliveryOptions;
}
