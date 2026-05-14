export interface MapProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface CatProps {
  id: number;
  name: string;
  imageUrl: string;
  breed: string;
  color: string;
  latitude: number;
  longitude: number;
}
