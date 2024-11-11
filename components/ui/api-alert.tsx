"use client";

import { Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to clipboard.");
  };

  return (
    <Alert className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Server className="h-5 w-5" />
        <AlertTitle className="flex items-center gap-x-2 text-base sm:text-lg">
          {title}
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </AlertTitle>
      </div>
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full mt-2 sm:mt-0">
        <code className="relative rounded bg-muted px-2 py-1 font-mono text-sm font-semibold break-all sm:break-normal w-full sm:w-auto">
          {description}
        </code>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCopy(description)}
          className="w-full sm:w-auto"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
