import { Button } from "antd";
import "./Buttons.css";

// Add Button
export const AddButton = ({
  className,
  onClick,
  label,
  disabled,
  style,
  extraComponent,
  onMouseEnter,
  onMouseLeave,
}) => (
  <button
    className={`addButton ascButton ripple ${className}`}
    style={style}
    disabled={disabled}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {extraComponent || label || "Add"}
  </button>
);

// Cancel Button
export const CancelButton = ({
  className,
  onClick,
  label,
  disabled,
  style,
  extraComponent,
  onMouseEnter,
  onMouseLeave,
}) => (
  <button
    className={`cancelButton ascButton ripple ${className}`}
    style={style}
    disabled={disabled}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {extraComponent || label || "Cancel"}
  </button>
);

// Delete Button
export const DeleteButton = ({
  className,
  onClick,
  label,
  disabled,
  style,
  extraComponent,
  onMouseEnter,
  onMouseLeave,
}) => (
  <button
    className={`deleteButton ascButton ripple ${className}`}
    disabled={disabled}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {extraComponent || label || "Delete"}
  </button>
);

// Submit Button
export const SubmitButton = ({
  className,
  onClick,
  label,
  disabled,
  style,
  extraComponent,
  onMouseEnter,
  onMouseLeave,
}) => (
  <button
    className={`submitButton addButton ascButton ripple ${className}`}
    disabled={disabled}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {/* {label || "Submit"} */}
    {extraComponent && extraComponent}
  </button>
);

export const UpdateANTButton = ({
  className,
  onClick,
  label,
  disabled,
  style,
  extraComponent,
  onMouseEnter,
  onMouseLeave,
  isLoading,
  icon,
  iconPlacement,
}) => (
  <Button
    className={`submitButton addButton ascButton ripple ${className}`}
    disabled={disabled}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    icon={icon}
    loading={isLoading}
    iconPlacement={iconPlacement || "start"}
  >
    {/* {label || "Submit"} */}
    {extraComponent && extraComponent}
  </Button>
);
