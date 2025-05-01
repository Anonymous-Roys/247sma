export interface BtnCustomType {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; 
  className?: string; 
  loading?: boolean; 
  disabled?: boolean; 
  error?: boolean; 
}


// input props
export interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string; 
  error?: string; 
  className?: string; 
  disabled?: boolean;
}


// labelProps
export interface LabelPropType {
  children?: React.ReactNode;
  labelFor?: string; 
  className?: string; 
  required?: boolean; 
  error?: boolean; 
}


export interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children?: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
}


// table props
export interface TableProps {
  headers: string[]; 
  data: any[]; 
  className?: string; 
}

//card props
export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  actions?: React.ReactNode;
  className?: string;
}

//farmers orders props

export interface Order {
  id: string;
  customer: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  productCategory: string;
  productDescription: string;
  total: number;
  productImages: string[]; // Array of image paths or names
  orderDate: string; // Assuming ISO format or a parseable date string
  status: "pending" | "shipped" | "delivered"; // Limited to the defined statuses
}

