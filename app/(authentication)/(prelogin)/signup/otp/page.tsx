import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function OTP() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
      <Card className="p-6">
        <div className="mb-2 flex flex-col space-y-2 text-left">
          <h1 className="text-md font-semibold tracking-tight">
            Two-factor Authentication
          </h1>
          <p className="text-sm text-muted-foreground">
            Please enter the authentication code. <br /> We have sent the
            authentication code to your email.
          </p>
        </div>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          Haven&apos;t received it?{" "}
          <Link
            href="/resent-new-code"
            className="underline underline-offset-4 hover:text-primary"
          >
            Resend a new code.
          </Link>
          .
        </p>
      </Card>
    </div>
  );
}
