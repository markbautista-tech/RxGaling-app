import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LoadingUI from "@/main/components/loadingUI";
import useClinicRegForm from "../hooks/useClinicRegForm";

const SuccessSubmitReq = () => {
  const { isSuccessDialog, setIsSuccessDialog } = useClinicRegForm();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (isSuccessDialog) {
      // Simulate loading duration (e.g., 2 seconds)
      const timer = setTimeout(() => setLoading(false), 2000);

      // Cleanup timer when component unmounts or dialog closes
      return () => clearTimeout(timer);
    } else {
      // Reset loading state when dialog closes
      setLoading(true);
    }
  }, [isSuccessDialog]);

  return (
    <AlertDialog open={isSuccessDialog} onOpenChange={setIsSuccessDialog}>
      <AlertDialogContent>
        {loading ? (
          <LoadingUI /> // Show loading UI first
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Success</AlertDialogTitle>
              <AlertDialogDescription>
                Your request was successfully submitted!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsSuccessDialog(false)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessSubmitReq;
