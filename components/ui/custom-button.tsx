import { forwardRef } from "react"
import { Button as ShadcnButton, type ButtonProps } from "@/components/ui/button"

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  // Add the transition and hover scale effect to all buttons
  const enhancedClassName = `transition-transform hover:scale-105 ${className || ""}`

  return <ShadcnButton className={enhancedClassName} ref={ref} {...props} />
})

CustomButton.displayName = "CustomButton"

export { CustomButton }
