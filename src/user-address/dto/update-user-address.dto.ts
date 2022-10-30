export class UpdateUserAddressDto {
  readonly id: string;
  address_title?: string;
  line1?: string;
  line2?: string;
  city?: string;
  country?: string;
  postal_code?: number;
  phone_mobile?: string;
  phone_work?: string;
  email?: string;
}
