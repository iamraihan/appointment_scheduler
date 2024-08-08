export type ButtonTypes = "btn_primary" | "btn_secondary" | "btn_danger";

export interface IAppButtonProps {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  btnType?: ButtonTypes;
  title?: string;
  disabled?: boolean;
  loader?: string | boolean;
  loaderText?: string;
  callBack?: () => void;
  customClass?: string;
  options?: {
    iconClasses?: string;
  };
}
