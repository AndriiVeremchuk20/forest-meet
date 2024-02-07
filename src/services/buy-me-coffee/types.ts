export interface SupportData {
  current_page: number;
  data: SupportEntry[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SupportEntry {
  support_id: number;
  support_note: string | null;
  support_coffees: number;
  transaction_id: string;
  support_visibility: number;
  support_created_on: string;
  support_updated_on: string;
  transfer_id: string | null;
  supporter_name: string | null;
  support_coffee_price: string;
  support_email: string | null;
  is_refunded: boolean | null;
  support_currency: string;
  support_note_pinned: number;
  referer: string | null;
  country: string | null;
  payer_email: string;
  payment_platform: string;
  payer_name: string;
}
