export interface CameraProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}