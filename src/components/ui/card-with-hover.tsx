
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const HoverCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "transition-all duration-200 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1",
      className
    )}
    {...props}
  />
));
HoverCard.displayName = "HoverCard";

const HoverCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardHeader ref={ref} className={cn(className)} {...props} />
));
HoverCardHeader.displayName = "HoverCardHeader";

const HoverCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <CardTitle ref={ref} className={cn(className)} {...props} />
));
HoverCardTitle.displayName = "HoverCardTitle";

const HoverCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <CardDescription
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
HoverCardDescription.displayName = "HoverCardDescription";

const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn(className)} {...props} />
));
HoverCardContent.displayName = "HoverCardContent";

const HoverCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardFooter ref={ref} className={cn(className)} {...props} />
));
HoverCardFooter.displayName = "HoverCardFooter";

export {
  HoverCard,
  HoverCardHeader,
  HoverCardTitle,
  HoverCardDescription,
  HoverCardContent,
  HoverCardFooter,
};
